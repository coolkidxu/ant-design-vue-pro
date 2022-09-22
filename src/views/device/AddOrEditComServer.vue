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
      <a-form-item label="串口号">
        <a-input v-model="form.CSComPort" disabled />
      </a-form-item>
      <a-form-item label="IP地址">
        <a-input v-model="form.CSIP" />
      </a-form-item>
      <a-form-item label="端口号">
        <a-input v-model="form.CSPort" />
      </a-form-item>
      <a-form-item label="波特率">
        <a-select v-model="form.CSBaurate" placeholder="请选择">
          <a-select-option v-for="(item, index) in baudRateList" :value="item" :key="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="校验位">
        <a-select v-model="form.CSParity" placeholder="请选择">
          <a-select-option v-for="(item, index) in parityList" :value="item.value" :key="index">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数据位">
        <a-select v-model="form.CSDatabit" placeholder="请选择">
          <a-select-option v-for="(item, index) in dataBitList" :value="item" :key="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="停止位">
        <a-select v-model="form.CSStop" placeholder="请选择">
          <a-select-option v-for="(item, index) in stopBitList" :value="item" :key="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="串口使能">
        <a-select v-model="form.CCloseFlag" placeholder="请选择">
          <a-select-option v-for="(item, index) in serialPortList" :value="item.value" :key="index">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import { FormState } from '@/utils/constant'
import { addComServer, editComServer } from '@/api/device'
import { mapState } from 'vuex'

export default {
  name: 'AddOrEditComServer',
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
      baudRateList: [
        115200,
        57600,
        38400,
        19200,
        9600,
        4800,
        2400,
        1200
      ],
      dataBitList: [ 8, 7, 6, 5 ],
      parityList: [
        {
          value: 'E',
          name: 'E 偶校验'
        },
        {
          value: 'O',
          name: 'O 奇校验'
        },
        {
          value: 'N',
          name: 'N 无校验'
        },
        {
          value: 'M',
          name: 'M 始终为1'
        },
        {
          value: 'S',
          name: 'S 始终为0'
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
      return this.formState === FormState.CREATE ? '新增串口' : '编辑串口配置'
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
    handleEditComServer (record) {
      this.showModal(FormState.EDIT)
      this.form = record
    },
    async handleOk () {
      this.loading = true
      const requestObj = {
        ...this.form,
        username: this.username
      }
      const res = this.formState === FormState.EDIT ? await editComServer(requestObj) : await addComServer(requestObj)
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
