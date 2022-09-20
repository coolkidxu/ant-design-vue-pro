<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row :gutter="40">
        <a-col :lg="6" :md="8" :sm="24">
          <a-form-item label="设备类">
            <a-select v-model="queryParam.DID" placeholder="请选择">
              <a-select-option v-for="(item, index) in condition.device" :value="item.DID" :key="index">{{ item.DName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="6" :md="8" :sm="24">
          <a-form-item label="监控项">
            <a-select v-model="queryParam.CID" placeholder="请选择">
              <a-select-option v-for="(item, index) in condition.controls" :value="item.CID" :key="index">{{ item.CName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="开始时间" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-date-picker
              v-model="queryParam.CRTimeBegin"
              :disabled-date="disabledStartDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              dateFormat="YYYY-MM-DD HH:mm:ss"
              valueFormat="YYYY-MM-DD HH:mm:ss"
              placeholder="开始时间"
              @openChange="handleStartOpenChange"
            />
            <a-date-picker
              v-model="queryParam.CRTimeEnd"
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
            <a-button type="primary" @click="loadControlRecord">查询</a-button>
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

import { loadControlRecord, loadSelectCondition } from '@/api/system'

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
          title: '设备',
          dataIndex: 'DName',
          key: 'DName',
          align: 'center'
        },
        {
          title: '控制名称',
          dataIndex: 'CName',
          key: 'CName',
          align: 'center'
        },
        {
          title: '控制结果',
          dataIndex: 'DRResult',
          key: 'DRResult',
          align: 'center'
        },
        {
          title: '联动名称',
          dataIndex: 'CGName',
          key: 'CGName',
          align: 'center'
        },
        {
          title: '控制用户',
          dataIndex: 'CRUser',
          key: 'CRUser',
          align: 'center'
        },
        {
          title: '时间',
          dataIndex: 'CRTime',
          key: 'CRTime',
          align: 'center'
        },
        {
          title: '控制值',
          dataIndex: 'CRValue',
          key: 'CRValue',
          align: 'center'
        },
        {
          title: '备注',
          dataIndex: 'CRNote',
          key: 'CRNote',
          align: 'center'
        }
      ],
      condition: {}
    }
  },
  computed: {},
  created () {
    this.loadControlRecord()
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
    loadControlRecord () {
      this.loading = true
      const requestObj = {
        ...this.queryParam,
        Page: this.pagination.current,
        pageCount: this.pagination.pageSize
      }
      loadControlRecord(requestObj).then(res => {
        this.loading = false
        this.dataSource = res.rows
        this.pagination.total = Number(res.total)
      })
    },
    loadSelectCondition () {
      loadSelectCondition().then(res => {
        this.condition = res
        console.log('data', res)
      })
    },
    disabledStartDate (startValue) {
      const endValue = this.queryParam.CRTimeEnd
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.queryParam.CRTimeBegin
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
      this.loadControlRecord()
    }
  }
}
</script>

<style lang='less' scoped>
.button-container {
  display: flex;
  justify-content: flex-start;
  gap: 1em;
  margin-bottom: 1em;
}

.full-width {
  width: 100% !important;
}
</style>
