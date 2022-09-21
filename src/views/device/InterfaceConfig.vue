<template>
  <a-card>
    <section class="button-container">
      <a-button type="primary">添加</a-button>
      <a-button>启用</a-button>
      <a-button>停用</a-button>
    </section>
    <section>
      <a-tabs default-active-key="activeKey" @change="handleTabClick">
        <a-tab-pane key="2" class="tab-title" tab="串口" force-render>
          <a-table
            :row-selection="{ onChange: onSelectChange }"
            :data-source="dataSource"
            :columns="columns"
            rowKey="CComPort"
          >
            <span slot="flags" slot-scope="flags">
              <a-tag
                :color="flags === '0' ? 'green' : 'red'"
              >
                {{ flags === '0' ? '启用' : '停用' }}
              </a-tag>
            </span>
            <span slot="debug" slot-scope="debug">
              <a-tag
                :color="debug === '1' ? 'green' : 'red'"
              >
                {{ debug === '0' ? '停用' : '启用' }}
              </a-tag>
            </span>
            <span slot="edit" slot-scope="record">
              <a-button type="primary" icon="form" @click="handleEdit(record)"></a-button>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="3" class="tab-title" tab="模拟量">
          <a-table
            :row-selection="{ onChange: onSelectChange }"
            :data-source="simulationDataSource"
            :columns="simulationColumns"
            rowKey="ANSID"
          >
            <span slot="ANType" slot-scope="ANType">
              <a-tag
                :color="ANType === '1' ? 'green' : 'red'"
              >
                {{ ANType === '1' ? '电压' : '电流' }}
              </a-tag>
            </span>
            <span slot="edit" slot-scope="record">
              <a-button type="primary" icon="form" @click="handleEdit(record)"></a-button>
            </span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </section>
  </a-card>
</template>

<script>

import { getInterface } from '@/api/history'

export default {
  name: 'Analysis',
  data () {
    return {
      loading: true,
      activeKey: '2',
      selectedRowKeys: [],
      dataSource: [],
      columns: [
        {
          title: '串口号',
          dataIndex: 'CComPort',
          key: 'CComPort',
          align: 'center'
        },
        {
          title: '波特率',
          dataIndex: 'CBaurate',
          key: 'CBaurate',
          align: 'center'
        },
        {
          title: '奇偶校验',
          dataIndex: 'CParity',
          key: 'CParity',
          align: 'center'
        },
        {
          title: '数据位',
          dataIndex: 'CDatabit',
          key: 'CDatabit',
          align: 'center'
        },
        {
          title: '停止位',
          dataIndex: 'CStop',
          key: 'CStop',
          align: 'center'
        },
        {
          title: '串口使能',
          dataIndex: 'CCloseFlag',
          key: 'CCloseFlag',
          scopedSlots: { customRender: 'flags' },
          align: 'center'
        },
        {
          title: '是否调试',
          dataIndex: 'IsDebug',
          key: 'IsDebug',
          scopedSlots: { customRender: 'debug' },
          align: 'center'
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center'
        }
      ],
      simulationColumns: [
        {
          title: '序号',
          dataIndex: 'ANSID',
          key: 'ANSID',
          align: 'center'
        },
        {
          title: '通道号',
          dataIndex: 'CCChannel',
          key: 'CCChannel',
          align: 'center'
        },
        {
          title: '采集类型',
          dataIndex: 'ANType',
          key: 'ANType',
          scopedSlots: { customRender: 'ANType' },
          align: 'center'
        },
        {
          title: '数据下限',
          dataIndex: 'DataMin',
          key: 'DataMin',
          align: 'center'
        },
        {
          title: '数据上限制',
          dataIndex: 'DataMax',
          key: 'DataMax',
          align: 'center'
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center'
        }
      ],
      simulationDataSource: []
    }
  },
  computed: {},
  created () {
    this.loadInterface()
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
      getInterface().then(res => {
        this.loading = false
        console.log('data', res)
        this.dataSource = res.com
        this.simulationDataSource = res.analog
      })
    },
    handleEdit (record) {
      console.log('record', record)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
