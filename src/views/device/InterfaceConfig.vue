<template>
  <div>
    <a-card>
      <section class="button-container" v-if="activeKey !== '3'">
        <a-button type="primary" @click="addComServer">添加</a-button>
        <a-button @click="editComState(0)">启用</a-button>
        <a-button @click="editComState(1)">停用</a-button>
      </section>
      <section>
        <a-tabs default-active-key="activeKey" @change="handleTabClick">
          <a-tab-pane key="1" class="tab-title" tab="本机串口" force-render>
            <a-table
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onComSelectChange }"
              :data-source="dataSource"
              :columns="columns"
              rowKey="CComPort"
            >
              <span slot="parity" slot-scope="parity">
                {{ convertCParity(parity) }}
              </span>
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
                <a-button type="primary" icon="form" @click="editInterface(record)"></a-button>
              </span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" class="tab-title" tab="服务器串口" force-render>
            <a-table
              :row-selection="{ selectedRowKeys: selectedComServerRowKeys, onChange: onComServerSelectChange }"
              :data-source="dataComServer"
              :columns="comServerColumns"
              rowKey="CSComPort"
            >
              <span slot="parity" slot-scope="parity">
                {{ convertCParity(parity) }}
              </span>
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
              <span slot="edit" slot-scope="record" class="button-group">
                <a-button type="primary" icon="form" @click="editComServer(record)"></a-button>
                <a-popconfirm
                  title="确定删除?"
                  @confirm="() => deleteComServer(record)"
                >
                  <a-button type="danger" icon="delete"></a-button>
                </a-popconfirm>
              </span>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="3" class="tab-title" tab="模拟量">
            <a-table
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
                <a-button type="primary" icon="form" @click="editSimulation(record)"></a-button>
              </span>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </section>
    </a-card>
    <AddOrEditInterface ref="interfaceForm" @refresh="loadInterface"></AddOrEditInterface>
    <AddOrEditComServer ref="comServerForm" @refresh="loadInterface"></AddOrEditComServer>
    <AddOrEditSimulation ref="simulationForm" @refresh="loadInterface"></AddOrEditSimulation>
  </div>
</template>

<script>

import { deleteComServer, editComState, getInterface } from '@/api/device'
import AddOrEditInterface from '@/views/device/AddOrEditInterface'
import AddOrEditComServer from '@/views/device/AddOrEditComServer'
import AddOrEditSimulation from '@/views/device/AddOrEditSimulation'
import { mapState } from 'vuex'

export default {
  name: 'InterfaceConfig',
  components: {
    AddOrEditInterface,
    AddOrEditComServer,
    AddOrEditSimulation
  },
  data () {
    return {
      loading: true,
      activeKey: '1',
      selectedRowKeys: [],
      selectedComServerRowKeys: [],
      dataSource: [],
      dataComServer: [],
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
          scopedSlots: { customRender: 'parity' },
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
      comServerColumns: [
        {
          title: '串口号',
          dataIndex: 'CSComPort',
          key: 'CSComPort',
          align: 'center'
        },
        {
          title: '波特率',
          dataIndex: 'CSBaurate',
          key: 'CSBaurate',
          align: 'center'
        },
        {
          title: '奇偶校验',
          dataIndex: 'CSParity',
          key: 'CSParity',
          scopedSlots: { customRender: 'parity' },
          align: 'center'
        },
        {
          title: '数据位',
          dataIndex: 'CSDatabit',
          key: 'CSDatabit',
          align: 'center'
        },
        {
          title: '停止位',
          dataIndex: 'CSStop',
          key: 'CSStop',
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
          title: '数据上限',
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
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  },
  created () {
    this.loadInterface()
  },
  methods: {
    handleTabClick (key) {
      this.activeKey = key
      console.log(this.selectedRowKeys)
      console.log('server', this.selectedComServerRowKeys)
    },
    onComSelectChange (selectedRowKeys) {
      console.log(selectedRowKeys.toString())
      this.selectedRowKeys = selectedRowKeys
    },
    onComServerSelectChange (selectedRowKeys) {
      console.log(selectedRowKeys.toString())
      this.selectedComServerRowKeys = selectedRowKeys
    },
    loadInterface () {
      getInterface().then(res => {
        this.loading = false
        const { com, comserver, analog } = res
        this.dataSource = com
        this.dataComServer = comserver
        this.simulationDataSource = analog
      })
    },
    editInterface (record) {
      this.$refs.interfaceForm.handleEditInterface(record)
    },
    editComServer (record) {
      this.$refs.comServerForm.handleEditComServer(record)
    },
    editSimulation (record) {
      this.$refs.simulationForm.handleEditSimulation(record)
    },
    addComServer () {
      this.$refs.comServerForm.handleAdd(this.dataSource.length + this.dataComServer.length)
    },
    editComState (state) {
      const requestObj = {
        CCloseFlag: state,
        CComPort: this.activeKey === '1' ? this.selectedRowKeys.toString() : this.selectedComServerRowKeys.toString(),
        username: this.username
      }
      editComState(requestObj).then(res => {
        if (res.result === '0') {
          this.$message.success('修改成功')
          this.selectedRowKeys = []
          this.selectedComServerRowKeys = []
          this.loadInterface()
        }
      })
    },
    async deleteComServer (record) {
      const { CSComPort } = record
      const { result } = await deleteComServer({
        CSComPort, username: this.username
      })
      if (result === '0') {
        this.$message.success('删除成功')
        this.loadInterface()
      } else {
        this.$message.error('删除失败')
      }
    },
    convertCParity (CParity) {
      switch (CParity) {
        case 'E':
          return 'E偶校验'
        case 'N':
          return 'N无校验'
        case 'O':
          return 'O奇校验'
        case 'M':
          return 'M始终为1'
        case 'S':
          return 'S始终为0'
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
