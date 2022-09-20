<template>
  <a-card>
    <a-tabs @change="clickTab" v-model="activeKey">
      <a-tab-pane key="1" tab="数据备份">
        <a-row :gutter="[12,20]">
          <a-col :span="12">
            <a-card title="一键导出" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item>
                  <div class="button-group">
                    <a-button type="primary">备份</a-button>
                    <a-button>恢复</a-button>
                    <a-button type="danger">重启</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="场景图" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item>
                  <div class="button-group">
                    <a-button type="primary">导出场景图</a-button>
                    <a-button>恢复场景图</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="12">
            <a-card title="本地数据库" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item>
                  <div class="button-group">
                    <a-button type="primary">备份到本地</a-button>
                    <a-button>恢复本地备份</a-button>
                    <a-button>数据库清理</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="导出与恢复" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item>
                  <div class="button-group">
                    <a-button type="primary">导出数据库</a-button>
                    <a-button>恢复</a-button>
                    <a-button>导出可执行文件</a-button>
                    <a-button type="danger">重启设备</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="系统升级">
        <a-row :gutter="12" class="card-flex">
          <a-col :span="12">
            <a-card title="Web程序升级" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item>
                  <div class="button-group">
                    <a-button type="primary">升级</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="系统核心程序升级" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item>
                  <div class="button-group">
                    <a-button type="primary">升级</a-button>
                    <a-button type="danger">重启</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>

import { loadRunLog } from '@/api/system'

export default {
  name: 'Analysis',
  data () {
    return {
      loading: true,
      activeKey: '1',
      condition: {},
      form: {},
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 0 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 }
        }
      },
      config: {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }]
      },
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }]
      }
    }
  },
  computed: {},
  created () {
    this.loadRunLog()
  },
  methods: {
    clickTab (key) {
      this.activeKey = key
      console.log(key)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    loadRunLog () {
      this.loading = true
      loadRunLog().then(res => {
        this.loading = false
        this.dataSource = res
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return
        }
        // Should format date value before submit.
        const values = {
          ...fieldsValue
        }
        console.log('Received values of form: ', values)
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
.card-flex {
  display: flex;
  justify-content: space-around;
  align-items: stretch !important;
  .ant-card {
    height: 100%;
  }
}
.full-width {
  width: 100% !important;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 2em
}
</style>
