<template>
  <div>
    <a-card>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-row >
          <a-col :md="8" :sm="24">
            <div class="button-container" v-if="activeKey==='1'">
              <a-button type="primary" @click="addProcess">添加</a-button>
              <a-button @click="loadAllProcess">刷新</a-button>
            </div>
            <div class="button-container" v-if="activeKey==='2'">
              <a-button type="primary" @click="addAlarmGroup">添加</a-button>
              <a-button @click="loadAlarmGroup">刷新</a-button>
            </div>
            <div class="button-container" v-if="activeKey==='3'">
              <a-button type="primary" @click="query">编辑</a-button>
              <a-button>保存</a-button>
              <a-button >取消</a-button>
              <a-button>邮箱测试</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <section>
        <a-tabs v-model="activeKey" @change="handleTabClick">
          <a-tab-pane key="1" class="tab-title" tab="报警流程" force-render>
            <a-table
              :row-selection="{ selectedRowKeys:selectedRowKeys, onChange: onSelectChange }"
              :data-source="dataSource"
              :columns="columns"
              rowKey="APID"
            >
              <template slot="DName" slot-scope="text, record">
                <p>1. &nbsp{{ record.APNCTime + "秒内，蜂鸣器" }} {{ record.APBuzzer === "0" ? "不报警，" :"报警，" }} {{ parseInt(record.APRelay) > 0 ? record.APRelayName + "报警，" : "无声光报警，" }}
                  {{ (record.APRelay > 0 && record.APRelayTime > 1) ? "并在"+record.APRelayTime+"秒后自动关闭，" : '' }}
                  超时未确认，通知{{ record.APNCGName+",报警确认后，"+(record.APCKey === "0" ? "不通知" : "通知" + record.APCGName) }}；
                </p>
                <p>2. &nbsp{{ record.APNRecTime + "分钟后报警未解除，"+(record.APNRecKey === "0" ? "不通知" :"通知" + record.APNRecGName) }};</p>
                <p>3. &nbsp报警解除后，{{ (record.APRecKey == "0" ? "不通知" :"通知"+ record.APRecGName) }} 。</p>
              </template >
              <span slot="action" slot-scope="record" class="button-group">
                <a-button type="primary" icon="form" @click="editProcess(record)"></a-button>
                <a-popconfirm
                  title="确定删除?"
                  @confirm="() => deleteProcess(record)"
                >
                  <a-button type="danger" icon="delete" v-if="record.APID !== '1'"></a-button>
                </a-popconfirm>
              </span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" class="tab-title" tab="报警组">
            <a-table
              :row-selection="{ onChange: onSelectChange }"
              :data-source="groupDataSource"
              :columns="groupColumns"
            >
              <template slot="groupState" slot-scope="text">
                <a-tag :color="text === '1' ? 'green': 'red'">
                  {{ text === '1' ? '启用': '禁用' }}
                </a-tag>
              </template>
              <template slot="AGType" slot-scope="AGType">
                {{ getAGType(AGType) }}
              </template>
              <span slot="edit" slot-scope="record" class="button-group">
                <a-button type="primary" icon="form" @click="editAlarmGroup(record)"></a-button>
                <a-popconfirm
                  title="确定删除?"
                  @confirm="() => deleteAlarmGroup(record)"
                >
                  <a-button type="danger" icon="delete" v-if="record.AGID !== '1'"></a-button>
                </a-popconfirm>
              </span>
              <span slot="APUser" slot-scope="record">
                <div v-for="(user, index) in getNotificationUser(record)" :key="index">
                  {{ alarmType[user[0].ASKeyWord] }}: {{ getUserFullName(user) }}
                </div>
              </span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="3" class="tab-title" tab="参数设置">
            <!--            <section>
              <a-form layout="horizontal" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
                <a-row>
                  <h3>
                    电话报警
                    <a-tooltip placement="rightTop">
                      <template slot="title">
                        注意:外置短信电话模块不支持拨号二次转机
                      </template>
                      <a-icon type="info-circle" class="form-tooltip"/>
                    </a-tooltip>
                  </h3>
                  <a-col :span="12">
                    <a-form-item label="本机号码">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="手机号前缀">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <h3>邮件报警</h3>
                  <a-col :span="12">
                    <a-form-item label="smtp地址">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="端口">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="邮箱">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="账号">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="密码">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="用户名称">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <h3>云短信报警</h3>
                  <a-col :span="12">
                    <a-form-item label="用户名">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="密码">
                      <a-input v-model="phoneNum" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </section>-->
          </a-tab-pane>
        </a-tabs>
      </section>
    </a-card>
    <AddOrEditAlarmProcess ref="alarmProcessForm" @refresh="loadAllProcess" :groups="groupDataSource"></AddOrEditAlarmProcess>
    <AddOrEditAlarmGroup ref="alarmGroupForm" @refresh="loadAlarmGroup"></AddOrEditAlarmGroup>
  </div>
</template>

<script>

import { queryHistoryRecord } from '@/api/history'
import { DeleteAlarmProcess, loadAlarmGroup, loadAllProcess } from '@/api/alarm'
import AddOrEditAlarmProcess from '@/views/alarm/AddOrEditAlarmProcess'
import AddOrEditAlarmGroup from '@/views/alarm/AddOrEditAlarmGroup'
import { mapState } from 'vuex'
import { filter, groupBy, map } from 'lodash'

export default {
  name: 'AlarmProcess',
  components: {
    AddOrEditAlarmProcess,
    AddOrEditAlarmGroup
  },
  data () {
    return {
      loading: true,
      endOpen: false,
      activeKey: '2',
      selectedRowKeys: [],
      dataSource: [],
      groupDataSource: [],
      userDataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      queryParam: {},
      columns: [
        {
          title: '报警流程序号',
          dataIndex: 'APID',
          key: 'APID',
          align: 'center'
        },
        {
          title: '报警流程名称',
          dataIndex: 'APName',
          key: 'APName',
          align: 'center'
        },
        {
          title: '具体流程',
          scopedSlots: { customRender: 'DName' },
          key: 'DName',
          align: 'center'
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ],
      agType: [
        {
          label: '短信报警',
          value: 'AGShortMsg'
        },
        {
          label: '邮件报警',
          value: 'AGEmail'
        },
        {
          label: '语音报警',
          value: 'AGVoice'
        },
        {
          label: '电话报警',
          value: 'AGTelphone'
        },
        {
          label: '云短信报警',
          value: 'AGCMsg'
        }
      ],
      alarmType: {
        ShortMsg: '短信',
        TelPhone: '电话(座机)',
        TelMobile: '电话(手机)',
        CloudMsg: '云短信',
        Email: '邮件'
      },
      groupColumns: [
        {
          title: '报警组号',
          dataIndex: 'AGID',
          key: 'AGID',
          align: 'center'
        },
        {
          title: '报警组名称',
          dataIndex: 'AGName',
          key: 'AGName',
          align: 'center'
        },
        {
          title: '报警方式',
          scopedSlots: { customRender: 'AGType' },
          align: 'center'
        },
        {
          title: '通知人',
          key: 'APUser',
          scopedSlots: { customRender: 'APUser' },
          align: 'center'
        },
        {
          title: '报警组状态',
          key: 'AGIsAlarm',
          dataIndex: 'AGIsAlarm',
          scopedSlots: { customRender: 'groupState' },
          align: 'center'
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center'
        }
      ],
      condition: {}
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  },
  created () {
    this.loadAllProcess()
    this.loadAlarmGroup()
  },
  methods: {
    handleTabClick (key) {
      this.activeKey = key
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    loadAllProcess () {
      this.loading = true
      loadAllProcess().then(res => {
        this.loading = false
        this.dataSource = res
      })
    },
    loadAlarmGroup () {
      this.loading = true
      loadAlarmGroup().then(res => {
        this.loading = false
        this.groupDataSource = res.alarmgroup
        this.userDataSource = res.user
      })
    },
    getNotificationUser (record) {
      const userList = filter(this.userDataSource, (item) => {
        return item.AGID === record.AGID
      })
      return groupBy(userList, 'ASKeyWord')
    },
    getUserFullName (userList) {
      return map(userList, 'UFullName').join(', ')
    },
    handleChange (pagination) {
      const { current, pageSize } = pagination
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.query()
    },
    query () {
      this.loading = true
      const requestObj = {
        ...this.queryParam,
        Page: this.pagination.current,
        pageCount: this.pagination.pageSize
      }
      queryHistoryRecord(requestObj).then(res => {
        this.loading = false
        this.dataSource = res.rows
      })
    },
    addProcess () {
      this.$refs.alarmProcessForm.handleAdd()
    },
    editProcess (record) {
      this.$refs.alarmProcessForm.handleEdit(record)
    },
    addAlarmGroup () {
      this.$refs.alarmGroupForm.handleAdd()
    },
    editAlarmGroup (record) {
      this.$refs.alarmGroupForm.handleEdit(record)
    },
    async deleteProcess ({ APID }) {
      if (APID !== '1') {
        const requestObj = {
          APIDs: APID,
          username: this.username
        }
        const { result } = await DeleteAlarmProcess(requestObj)
        if (result === '0') {
          this.$message.success('删除成功')
          this.loadAllProcess()
        } else {
          this.$message.error('删除失败')
        }
      }
    },
    getAGType (item) {
      const usedType = filter(this.agType, ({ label, value }) => {
        if (item[value] === '1') {
          return label
        }
      })
      return map(usedType, 'label').join(', ')
    }
  }
}
</script>

<style lang='less' scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.form-tooltip {
  margin-left: 0.5em;
  color: @primary-color
}
</style>
