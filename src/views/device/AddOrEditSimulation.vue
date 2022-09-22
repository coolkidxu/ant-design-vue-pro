<template>
  <a-modal v-model="visible" :title="title" on-ok="handleOk">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        保存
      </a-button>
    </template>
    <a-form v-bind="formItemLayout" :form="form">
      <a-form-item label="通道号">
        <a-input v-model="form.ANSID" disabled />
      </a-form-item>
      <a-form-item label="采集类型">
        <a-select v-model="form.ANType" placeholder="请选择">
          <a-select-option v-for="(item, index) in collectionType" :value="item.value" :key="index">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数据下限">
        <a-input-number v-model="form.DataMin" class="full-width"/>
      </a-form-item>
      <a-form-item label="数据上限">
        <a-input-number v-model="form.DataMax" class="full-width"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import { FormState } from '@/utils/constant'
import { editSimulation } from '@/api/device'
import { mapState } from 'vuex'

export default {
  name: 'AddOrEditSimulation',
  data () {
    return {
      loading: false,
      visible: false,
      formState: '',
      form: {},
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      collectionType: [
        {
          value: '1',
          name: '电压'
        },
        {
          value: '2',
          name: '电流'
        }
      ],
      stopBitList: [1, 2],
      serialPortList: [
        {
          value: '0',
          name: '启用'
        },
        {
          value: '1',
          name: '停用'
        }
      ]
    }
  },
  computed: {
    title: function () {
      return this.formState === FormState.CREATE ? '新增模拟量配置' : '编辑模拟量配置'
    },
    ...mapState({
      username: state => state.user.username
    })
  },
  created () {
  },
  methods: {
    showModal (formState) {
      this.formState = formState
      this.visible = true
    },
    handleAdd (dataLength) {
      this.showModal(FormState.CREATE)
      this.form.CSComPort = dataLength + 1
    },
    handleEditSimulation (record) {
      this.showModal(FormState.EDIT)
      this.form = record
    },
    async handleOk () {
      this.loading = true
      const requestObj = {
        ...this.form,
        username: this.username
      }
      const res = await editSimulation(requestObj)
      const { result } = res
      if (result === '0') {
        this.$message.success('保存成功')
      } else {
        this.$message.error('保存失败')
      }
      this.loading = false
      this.visible = false
      this.form = {}
      this.$emit('refresh')
    },
    handleCancel (e) {
      this.visible = false
      this.form = {}
    }
  }
}
</script>

<style lang='less' scoped>

</style>
