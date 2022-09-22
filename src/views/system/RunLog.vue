<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row >
        <a-col :md="8" :sm="24">
          <div class="button-container">
            <a-button type="primary" @click="batchDownloadLog">批量下载</a-button>
            <a-button @click="batchDeleteLog">批量删除</a-button>
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
        rowKey="LogName"
      >
        <span slot="action" slot-scope="record" class="button-group">
          <a-button type="primary" icon="download" @click="downloadLog(record)"></a-button>
          <a-popconfirm
            title="确定删除?"
            @confirm="() => deleteLog(record)"
          >
            <a-button type="danger" icon="delete"></a-button>
          </a-popconfirm>
        </span>
      </a-table>
    </section>
  </a-card>
</template>

<script>

import { deleteLog, loadRunLog } from '@/api/system'
import { map } from 'lodash'
const baseURL = process.env.VUE_APP_API_BASE_URL
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
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      condition: {}
    }
  },
  computed: {},
  created () {
    this.loadRunLog()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    loadRunLog () {
      this.loading = true
      loadRunLog().then(res => {
        this.loading = false
        this.dataSource = res
      })
    },
    downloadLog (record) {
      window.open(baseURL + '/cgi-bin/SystemLog.cgi?downLog&username=admin&filename=' + record.LogName, '_blank')
    },
    deleteLog (file) {
      const requestObj = {
        username: this.username,
        btSelectItem: file.LogName
      }
      deleteLog(requestObj).then(res => {
        if (res.result === '0') {
          this.$message.success('删除成功')
          this.loadRunLog()
        }
      })
    },
    batchDownloadLog () {
      const requestObj = {
        username: this.username,
        btSelectItem: this.selectedRowKeys.join(',')
      }
      window.open(baseURL + '/cgi-bin/SystemLog.cgi?downLog&username=admin&filename=' + requestObj.btSelectItem, '_blank')
      this.selectedRowKeys = []
    },
    batchDeleteLog () {
      const formData = new FormData()
      formData.append('username', this.username)
      map(this.selectedRowKeys, (item) => {
        formData.append('btSelectItem', item)
      })
      deleteLog(formData).then(res => {
        if (res.result === '0') {
          this.$message.success('删除成功')
          this.loadRunLog()
          this.selectedRowKeys = []
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
