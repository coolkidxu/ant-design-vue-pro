<template>
  <a-card>
    <a-tabs @change="clickTab" v-model="activeKey">
      <a-tab-pane key="1" tab="网络配置">
        <a-row :gutter="[12,20]">
          <a-col :span="12">
            <a-card title="网口1" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="IP地址">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="子网掩码">
                  <a-input v-model="form.mask" />
                </a-form-item>
                <a-form-item label="网关">
                  <a-input v-model="form.gateway" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="网口2" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="IP地址">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="子网掩码">
                  <a-input v-model="form.mask" />
                </a-form-item>
                <a-form-item label="网关">
                  <a-input v-model="form.gateway" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="12">
            <a-card title="DNS" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="DNS配置">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="WebSocket" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="WebSocket端口">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="时间配置" force-render>
        <a-row :gutter="12" class="card-flex">
          <a-col :span="12">
            <a-card title="系统时间" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="系统时间">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="时钟同步" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="同步时间">
                  <a-input v-model="form.ip" addon-after="分钟" />
                </a-form-item>
                <a-form-item label="同步IP地址">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="3" tab="平台对接">
        <a-row :gutter="[12, 20]" class="card-flex">
          <a-col :span="12">
            <a-card title="对接协议" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="通讯协议选择">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="SNMP配置" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="上传IP1">
                  <a-input v-model="form.ip"/>
                </a-form-item>
                <a-form-item label="上传IP2">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="端口配置">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="[12, 20]" class="card-flex">
          <a-col :span="12">
            <a-card title="门禁控制" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="DNS配置">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="门禁用户名">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="门禁密码">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="门禁数据库名">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="门禁IP地址">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="门禁端口号">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
                    <a-button>门禁同步</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="导出OID" :bordered="true">
              <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
                <a-form-item label="导出模拟量">
                  <a-input v-model="form.ip"/>
                </a-form-item>
                <a-form-item label="导出状态量">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="导出报警量">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item label="导出控制量">
                  <a-input v-model="form.ip" />
                </a-form-item>
                <a-form-item
                  :wrapper-col="{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }">
                  <div class="button-group">
                    <a-button>编辑</a-button>
                    <a-button>取消</a-button>
                    <a-button>保存</a-button>
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
      activeKey: '3',
      condition: {},
      form: {},
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
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
  gap: 0.5em
}
</style>
