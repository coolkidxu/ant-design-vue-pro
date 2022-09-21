<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row >
        <a-col :md="8" :sm="24">
          <div class="button-container">
            <a-button type="primary">添加</a-button>
            <a-button>删除</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <section>
      <a-tabs v-model="activeKey" @change="handleTabClick">
        <a-tab-pane key="1" class="tab-title" tab="撤防">
          <a-table
            :row-selection="{ onChange: onSelectChange }"
            :data-source="disArmDataSource"
            :columns="disArmColumns"
            :loading="loading"
            :pagination="pagination"
            @change="handleChange"
            rowKey="ID"
          >
            <span slot="period" slot-scope="record">
              {{ getWeekNameByWeekDay(record) }}
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" class="tab-title" tab="布防">
          <a-table
            :row-selection="{ onChange: onSelectChange }"
            :data-source="dataSource"
            :columns="columns"
            :loading="loading"
            :pagination="pagination"
            @change="handleChange"
            rowKey="ID"
          >
            <span slot="startTime" slot-scope="record">
              {{ record.HSDate }}&nbsp;&nbsp;{{ record.HSTime }}
            </span>
            <span slot="endTime" slot-scope="record">
              {{ record.HEDate }}&nbsp;&nbsp;{{ record.HETime }}
            </span>
            <span slot="edit">
              <a-button type="info" icon="form"></a-button>
            </span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </section>
  </a-card>
</template>

<script>

import { loadAlarmArmGroup, loadDisAlarmArmGroup } from '@/api/alarm'
import { find } from 'lodash'

export default {
  name: 'Analysis',
  data () {
    return {
      loading: true,
      endOpen: false,
      activeKey: '2',
      selectedRowKeys: [],
      dataSource: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'HGID',
          key: 'HGID',
          align: 'center'
        },
        {
          title: '布防组名称',
          dataIndex: 'HGName',
          key: 'HGName',
          align: 'center'
        },
        {
          title: '开始时间',
          key: 'HSTime',
          scopedSlots: { customRender: 'startTime' },
          align: 'center'
        },
        {
          title: '结束时间',
          key: 'HETime',
          scopedSlots: { customRender: 'endTime' },
          align: 'center'
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center'
        }
      ],
      disArmDataSource: [],
      disArmColumns: [
        {
          title: '序号',
          dataIndex: 'WGID',
          key: 'WGID',
          align: 'center'
        },
        {
          title: '撤防组名称',
          dataIndex: 'WGName',
          key: 'WGName',
          align: 'center'
        },
        {
          title: '设备',
          key: 'device',
          scopedSlots: { customRender: 'device' },
          align: 'center'
        },
        {
          title: '时间段',
          key: 'period',
          scopedSlots: { customRender: 'period' },
          align: 'center'
        },
        {
          title: '编辑',
          key: 'edit',
          align: 'center'
        }
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      deviceList: [],
      week: []
    }
  },
  computed: {},
  created () {
    this.loadArmGroupList()
    this.loadDisArmGroupList()
  },
  methods: {
    handleTabClick (key) {
      this.activeKey = key
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    loadArmGroupList () {
      this.loading = true
      loadAlarmArmGroup().then(res => {
        this.loading = false
        this.dataSource = res
      })
    },
    loadDisArmGroupList () {
      this.loading = true
      loadDisAlarmArmGroup().then(res => {
        console.log('disArm', res)
        const { group, week, devicevar } = res
        this.loading = false
        this.disArmDataSource = group
        this.deviceList = devicevar
        this.week = week
      })
    },
    handleChange (pagination) {
      const { current, pageSize } = pagination
      this.pagination.current = current
      this.pagination.pageSize = pageSize
    },
    getWeekNameByWeekDay (record) {
      const { WGID } = record
      const { WSTime, WETime, WDay } = find(this.week, item => {
        if (item.WGID === WGID) {
          return item
        }
      })
      let weekName = ''
      switch (WDay) {
        case '1' :
          weekName = '星期一'
          break
        case '2':
          weekName = '星期二'
          break
        case '3':
          weekName = '星期三'
          break
        case '4':
          weekName = '星期四'
          break
        case '5':
          weekName = '星期五'
          break
        case '6':
          weekName = '星期六'
          break
        case '7':
          weekName = '星期日'
      }
      return weekName + ' ' + WSTime + ' - ' + WETime
    }
  }
}
</script>

<style lang='less' scoped>
</style>
