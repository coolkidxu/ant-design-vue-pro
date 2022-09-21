<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row >
        <a-col :md="8" :sm="24">
          <div class="button-container">
            <a-button type="primary" @click="loadAllConsumer">添加</a-button>
            <a-button type="primary" @click="loadAllConsumer">导入</a-button>
            <a-button>导出</a-button>
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
        rowKey="ID"
      >
      </a-table>
    </section>
  </a-card>
</template>

<script>

import { loadAllConsumer } from '@/api/accessControl'

export default {
  name: 'Analysis',
  data () {
    return {
      loading: true,
      selectedRowKeys: [],
      dataSource: [],
      columns: [
        {
          title: '姓名',
          dataIndex: 'ConsumerName',
          key: 'ConsumerName',
          align: 'center'
        },
        {
          title: '卡号',
          dataIndex: 'CardID',
          key: 'CardID',
          align: 'center'
        },
        {
          title: '密码',
          dataIndex: 'ConsumerPW',
          key: 'ConsumerPW',
          align: 'center'
        },
        {
          title: '部门',
          dataIndex: 'GroupName',
          key: 'GroupName',
          align: 'center'
        },
        {
          title: '工号',
          dataIndex: 'ConsumerNumber',
          key: 'ConsumerNumber',
          align: 'center'
        },
        {
          title: '操作',
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
    this.loadAllConsumer()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    loadAllConsumer () {
      this.loading = true
      loadAllConsumer({
        limit: 5,
        offset: 0
      }).then(res => {
        this.loading = false
        this.dataSource = res
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
