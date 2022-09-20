<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row >
        <a-col :md="8" :sm="24">
          <div class="button-container">
            <a-button type="primary" @click="loadDebugLog">批量下载</a-button>
            <a-button>批量删除</a-button>
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

import { loadDebugLog } from '@/api/system'

export default {
  name: 'Analysis',
  data () {
    return {
      loading: true,
      selectedRowKeys: [],
      dataSource: [],
      columns: [
        {
          title: '日志名称',
          dataIndex: 'LogName',
          key: 'LogName',
          align: 'center'
        },
        {
          title: '日志大小',
          dataIndex: 'LogSize',
          key: 'LogSize',
          align: 'center'
        }
      ],
      condition: {}
    }
  },
  computed: {},
  created () {
    this.loadDebugLog()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    loadDebugLog () {
      this.loading = true
      loadDebugLog().then(res => {
        this.loading = false
        this.dataSource = res
      })
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
