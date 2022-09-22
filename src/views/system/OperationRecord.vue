<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row :gutter="40">
        <a-col :lg="6" :md="8" :sm="24">
          <a-form-item label="用户名">
            <a-select v-model="queryParam.UName" placeholder="请选择" allowClear>
              <a-select-option v-for="(item, index) in condition" :value="item.UName" :key="index">{{ item.UName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="14" :md="12" :sm="24">
          <a-form-item label="开始时间" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-date-picker
              v-model="queryParam.OperTimeBegin"
              :disabled-date="disabledStartDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              dateFormat="YYYY-MM-DD HH:mm:ss"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              placeholder="开始时间"
              @openChange="handleStartOpenChange"
            />
            <a-date-picker
              v-model="queryParam.OperTimeEnd"
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
            <a-button type="primary" @click="loadOperationRecord">查询</a-button>
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
      </a-table>
    </section>
  </a-card>
</template>

<script>

import { loadOperationRecord, loadOperationSelectCondition } from '@/api/system'

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
        total: 0,
        showTotal: function (total) {
          return `共 ${total} 条`
        }
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
          title: '操作名称',
          dataIndex: 'OperNote',
          key: 'OperNote',
          align: 'center'
        },
        {
          title: '时间',
          dataIndex: 'OperTime',
          key: 'OperTime',
          align: 'center'
        },
        {
          title: 'IP地址',
          dataIndex: 'OperIP',
          key: 'OperIP',
          align: 'center'
        },
        {
          title: '操作用户',
          dataIndex: 'OperUser',
          key: 'OperUser',
          align: 'center'
        }
      ],
      condition: {}
    }
  },
  computed: {},
  created () {
    this.loadOperationRecord()
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
    loadOperationRecord () {
      this.loading = true
      const requestObj = {
        ...this.queryParam,
        Page: this.pagination.current,
        pageCount: this.pagination.pageSize
      }
      loadOperationRecord(requestObj).then(res => {
        this.loading = false
        this.dataSource = res.rows
        this.pagination.total = Number(res.total)
      })
    },
    loadSelectCondition () {
      loadOperationSelectCondition().then(res => {
        this.condition = res
        console.log('data', res)
      })
    },
    disabledStartDate (startValue) {
      const endValue = this.queryParam.OperTimeEnd
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.queryParam.OperTimeBegin
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
      this.loadOperationRecord()
    }
  }
}
</script>

<style lang='less' scoped>
</style>
