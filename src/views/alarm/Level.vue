<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row >
        <a-col :md="8" :sm="24">
          <div class="button-container">
            <a-button type="primary" @click="query">添加</a-button>
            <a-button>删除</a-button>
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
        @change="handleChange"
        rowKey="ALID"
      >
        <span slot="color" slot-scope="color">
          <a-tag
            :color="'#' + color"
          >
            {{ color }}
          </a-tag>
        </span>
      </a-table>
    </section>
  </a-card>
</template>

<script>

import { queryHistoryRecord } from '@/api/history'
import { loadAlarmLevel } from '@/api/alarm'

export default {
  name: 'Analysis',
  data () {
    return {
      loading: true,
      selectedRowKeys: [],
      dataSource: [],
      columns: [
        {
          title: '级别编号',
          dataIndex: 'ALID',
          key: 'ALID',
          align: 'center'
        },
        {
          title: '报警级别',
          dataIndex: 'ALName',
          key: 'ALName',
          align: 'center'
        },
        {
          title: '报警颜色',
          key: 'CColorCode',
          dataIndex: 'CColorCode',
          scopedSlots: { customRender: 'color' },
          align: 'center'
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center'
        }
      ]
    }
  },
  computed: {},
  created () {
    this.getLevel()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    getLevel () {
      this.loading = true
      loadAlarmLevel().then(res => {
        this.loading = false
        this.dataSource = res
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
