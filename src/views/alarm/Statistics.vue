<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row :gutter="10">
        <a-col :md="4" :sm="24">
          <a-form-item label="设备类">
            <a-select v-model="queryParam.DCID" placeholder="请选择" allowClear>
              <a-select-option v-for="(item, index) in condition.classes" :value="item.DCID" :key="index">{{ item.DCName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <a-form-item label="设备">
            <a-select v-model="queryParam.DID" placeholder="请选择" allowClear>
              <a-select-option v-for="(item, index) in condition.device" :value="item.DID" :key="index">{{ item.DName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="4" :sm="24">
          <a-form-item label="监控项">
            <a-select v-model="queryParam.VID" placeholder="请选择" allowClear>
              <a-select-option v-for="(item, index) in condition.vars" :value="item.VID" :key="index">{{ item.VName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="开始时间" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-date-picker
              v-model="queryParam.VRTimeBegin"
              :disabled-date="disabledStartDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              dateFormat="YYYY-MM-DD HH:mm:ss"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              placeholder="开始时间"
              @openChange="handleStartOpenChange"
            />
            <a-date-picker
              v-model="queryParam.VRTimeEnd"
              :disabled-date="disabledEndDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              dateFormat="YYYY-MM-DD HH:mm:ss"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              placeholder="结束时间"
              :open="endOpen"
              @openChange="handleEndOpenChange"
            />
          </a-form-item>
        </a-col>
      </a-row>
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
      <a-table
        :row-selection="{ onChange: onSelectChange }"
        :data-source="dataSource"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        @change="handleChange"
        rowKey="ID"
      >
        <span slot="ANType" slot-scope="ANType">
          <a-tag
            :color="ANType === '1' ? 'green' : 'red'"
          >
            {{ ANType === '1' ? '电压' : '电流' }}
          </a-tag>
        </span>
      </a-table>
    </section>
  </a-card>
</template>

<script>

import { getSelectCondition, queryHistoryRecord } from '@/api/history'

export default {
  name: 'Analysis',
  data () {
    return {
      loading: true,
      endOpen: false,
      activeKey: '2',
      selectedRowKeys: [],
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      queryParam: {},
      columns: [
        {
          title: '序号',
          dataIndex: 'ID',
          key: 'ID',
          align: 'center'
        },
        {
          title: '设备类',
          dataIndex: 'DCName',
          key: 'DCName',
          align: 'center'
        },
        {
          title: '设备类',
          dataIndex: 'DName',
          key: 'DName',
          align: 'center'
        },
        {
          title: '监控项',
          dataIndex: 'VName',
          key: 'VName',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'VRState',
          key: 'VRState',
          align: 'center'
        },
        {
          title: '记录值',
          dataIndex: 'VRValue',
          key: 'VRValue',
          align: 'center'
        },
        {
          title: '记录时间',
          dataIndex: 'VRTime',
          key: 'VRTime',
          scopedSlots: { customRender: 'flags' },
          align: 'center'
        },
        {
          title: '备注',
          dataIndex: 'VRNote',
          key: 'VRNote',
          scopedSlots: { customRender: 'debug' },
          align: 'center'
        }
      ],
      condition: {}
    }
  },
  computed: {},
  created () {
    this.loadInterface()
    this.loadSelectCondition()
  },
  methods: {
    handleTabClick (key) {
      this.activeKey = key
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    loadInterface () {
      this.loading = true
      const requestObj = {
        ...this.queryParam,
        Page: this.pagination.current,
        pageCount: this.pagination.pageSize
      }
      queryHistoryRecord(requestObj).then(res => {
        this.loading = false
        this.dataSource = res.rows
        this.pagination.total = Number(res.total)
        this.simulationDataSource = res.analog
      })
    },
    loadSelectCondition () {
      getSelectCondition().then(res => {
        this.condition = res
        console.log('data', res)
      })
    },
    disabledStartDate (startValue) {
      const endValue = this.queryParam.VRTimeEnd
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.queryParam.VRTimeBegin
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open
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
        console.log('data', res)
        this.dataSource = res.rows
      })
      console.log('queryParam', this.queryParam)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
