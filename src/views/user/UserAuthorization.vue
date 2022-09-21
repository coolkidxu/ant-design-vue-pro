<template>
  <a-card>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-row >
        <a-col :md="8" :sm="24">
          <div class="button-container">
            <a-button type="primary" @click="loadUserAuthorization">添加</a-button>
            <a-button>密码重置</a-button>
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

import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { loadUserAuthorization } from '@/api/userManagement'

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
          title: '用户编号',
          dataIndex: 'UID',
          key: 'UID',
          align: 'center'
        },
        {
          title: '用户名',
          dataIndex: 'RName',
          key: 'RName',
          align: 'center'
        },
        {
          title: '角色名称',
          dataIndex: 'UName',
          key: 'UName',
          align: 'center'
        },
        {
          title: '姓名',
          dataIndex: 'UFullName',
          key: 'UFullName',
          align: 'center'
        },
        {
          title: '座机号',
          key: 'UTelphone',
          dataIndex: 'UTelphone',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'UMobile',
          dataIndex: 'UMobile',
          align: 'center'
        },
        {
          title: '邮箱',
          key: 'UEmail',
          dataIndex: 'UEmail',
          align: 'center'
        },
        {
          title: 'APP是否通知',
          key: 'AlarmFlage',
          dataIndex: 'AlarmFlage',
          align: 'center'
        },
        {
          title: '备注',
          key: 'UNote',
          dataIndex: 'UNote',
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
    this.loadUserAuthorization()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    loadUserAuthorization () {
      const uid = storage.get(ACCESS_TOKEN)
      this.loading = true
      const requestObj = {
        UID: uid
      }
      loadUserAuthorization(requestObj).then(res => {
        this.loading = false
        console.log('userDefinition', res)
        this.dataSource = res
      })
    },
    handleChange (pagination) {
      const { current, pageSize } = pagination
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.loadUserAuthorization()
    }
  }
}
</script>

<style lang='less' scoped>
</style>
