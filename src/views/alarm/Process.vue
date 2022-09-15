<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row >
        <a-col :md="8" :sm="24">
          <div class="button-container">
            <a-button type="primary" @click="query">查询</a-button>
            <a-button>导出</a-button>
            <a-button >清除查询记录</a-button>
            <a-button >清空</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <section>
      <a-tabs default-active-key="activeKey" @change="handleTabClick">
        <a-tab-pane key="1" class="tab-title" tab="报警流程" force-render>
          <a-table
            :row-selection="{ onChange: onSelectChange }"
            :data-source="dataSource"
            :columns="columns"
          >
            <template slot="DName" slot-scope="text, record">
              <p>1. &nbsp{{ record.APNCTime + "秒内，蜂鸣器" }} {{ record.APBuzzer === "0" ? "不报警，" :"报警，" }} {{ parseInt(record.APRelay) > 0 ? record.APRelayName + "报警，" : "无声光报警，" }}
                {{ (record.APRelay > 0 && record.APRelayTime > 1) ? "并在"+record.APRelayTime+"秒后自动关闭，" : '' }}
                超时未确认，通知{{ record.APNCGName+",报警确认后，"+(record.APCKey === "0" ? "不通知" : "通知" + record.APCGName) }}；
              </p>
              <p>2. &nbsp{{ record.APNRecTime + "分钟后报警未解除，"+(record.APNRecKey === "0" ? "不通知" :"通知" + record.APNRecGName) }};</p>
              <p>3. &nbsp报警解除后，{{ (record.APRecKey == "0" ? "不通知" :"通知"+ record.APRecGName) }} 。</p>
            </template >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" class="tab-title" tab="报警组">
          <a-table
            :row-selection="{ onChange: onSelectChange }"
            :data-source="groupDataSource"
            :columns="groupColumns"
          >
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="3" class="tab-title" tab="参数设置">
        </a-tab-pane>
      </a-tabs>
    </section>
  </a-card>
</template>

<script>

import { queryHistoryRecord } from '@/api/history'
import { loadAlarmGroup, loadAllProcess } from '@/api/alarm'

export default {
  name: 'Analysis',
  data () {
    return {
      loading: true,
      endOpen: false,
      activeKey: '2',
      selectedRowKeys: [],
      dataSource: [],
      groupDataSource: [],
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
          dataIndex: 'edit',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center'
        }
      ],
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
          dataIndex: 'APID',
          key: 'APID',
          align: 'center'
        },
        {
          title: '通知人',
          dataIndex: 'APUser',
          key: 'APUser',
          align: 'center'
        },
        {
          title: '报警组状态',
          key: 'AGIsAlarm',
          scopedSlots: { customRender: 'edit' },
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
  computed: {},
  created () {
    this.loadAllProcess()
    this.loadAlarmGroup()
  },
  methods: {
    handleTabClick (key) {
      this.activeKey = key
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
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
        console.log(res.alarmgroup)
      })
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
        page: this.pagination.current,
        pageCount: this.pagination.pageSize
      }
      queryHistoryRecord(requestObj).then(res => {
        this.loading = false
        console.log('data', res)
        this.dataSource = res.rows
      })
      console.log('queryParam', this.queryParam)
    }
  }
}
</script>

<style lang='less' scoped>
.button-container {
  display: flex;
  justify-content: start;
  gap: 1em;
  margin-bottom: 1em;
}

.full-width {
  width: 100% !important;
}
</style>
