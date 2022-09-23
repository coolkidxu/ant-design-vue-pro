<template>
  <div>
    <a-card>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-row >
          <a-col :md="8" :sm="24">
            <div class="button-container">
              <a-button type="primary" @click="addAlarmLevel">添加</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <section>
        <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, getCheckboxProps: record => ({
            props: {
              disabled: ['1','2','3'].indexOf(record.ALID) > -1 , // Column configuration not to be checked
            }
          }) }"
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
          <span slot="action" slot-scope="record" class="button-group">
            <a-button type="primary" icon="form" @click="editLevel(record)"></a-button>
            <a-popconfirm
              title="确定删除?"
              @confirm="() => deleteAlarmLevel(record)"
            >
              <a-button type="danger" icon="delete" v-if="record.ALID > 3"></a-button>
            </a-popconfirm>
          </span>
        </a-table>
      </section>
    </a-card>
    <AddOrEditAlarmLevel ref="levelForm" @refresh="refresh"></AddOrEditAlarmLevel>
  </div>
</template>

<script>

import { DeleteAlarmLevel, loadAlarmLevel } from '@/api/alarm'
import AddOrEditAlarmLevel from '@/views/alarm/AddOrEditAlarmLevel'
import { mapState } from 'vuex'

export default {
  name: 'AlarmLevel',
  components: {
    AddOrEditAlarmLevel
  },
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
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  },
  created () {
    this.getLevel()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
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
    addAlarmLevel () {
      this.$refs.levelForm.handleAdd(this.dataSource.length)
    },
    editLevel (record) {
      this.$refs.levelForm.handleEdit(record)
    },
    deleteAlarmLevel (record) {
      const requestObj = {
        ALID: record.ALID,
        username: this.username
      }
      const { result } = DeleteAlarmLevel(requestObj)
      if (result === '0') {
        this.getLevel()
      }
    },
    refresh () {
      this.getLevel()
    }
  }
}
</script>

<style lang='less' scoped>
</style>
