<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row >
        <a-col :md="8" :sm="24">
          <div class="button-container">
            <a-button type="primary" @click="loadRoleDefinitionList">添加</a-button>
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

import { getAlarmCondition } from '@/api/alarm'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { loadUserDefinition } from '@/api/userManagement'

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
          title: '角色编号',
          dataIndex: 'RID',
          key: 'RID',
          align: 'center'
        },
        {
          title: '角色名称',
          dataIndex: 'RName',
          key: 'RName',
          align: 'center'
        },
        {
          title: '角色等级',
          dataIndex: 'RGrade',
          key: 'RGrade',
          align: 'center'
        },
        {
          title: '备注',
          dataIndex: 'RNote',
          key: 'RNote',
          align: 'center'
        },
        {
          title: '编辑',
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
    this.loadRoleDefinitionList()
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
    loadRoleDefinitionList () {
      const uid = storage.get(ACCESS_TOKEN)
      this.loading = true
      const requestObj = {
       UID: uid
      }
      loadUserDefinition(requestObj).then(res => {
        this.loading = false
        console.log('userDefinition', res)
        this.dataSource = res
      })
    },
    loadSelectCondition () {
      getAlarmCondition().then(res => {
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
      this.loadAlarmRecord()
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
