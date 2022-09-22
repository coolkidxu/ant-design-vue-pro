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
        <a-input v-model="form.CComPort" disabled />
      </a-form-item>
      <a-form-item label="波特率">
        <a-select v-model="form.CBaurate" placeholder="请选择">
          <a-select-option v-for="(item, index) in baudRateList" :value="item" :key="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="校验位">
        <a-select v-model="form.CParity" placeholder="请选择">
          <a-select-option v-for="(item, index) in parityList" :value="item.value" :key="index">{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数据位">
        <a-select v-model="form.CDatabit" placeholder="请选择">
          <a-select-option v-for="(item, index) in dataBitList" :value="item" :key="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="停止位">
        <a-select v-model="form.CStop" placeholder="请选择">
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
import { editInterface } from '@/api/device'
import { mapState } from 'vuex'

export default {
  name: 'AddOrEditInterface',
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
    isEditState: function () {
      return this.formState === FormState.EDIT
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
    handleEditInterface (record) {
      this.showModal(FormState.EDIT)
      this.form = record
    },
    handleOk () {
      this.loading = true
      const requestObj = {
        ...this.form,
        username: this.username
      }
      editInterface(requestObj).then(res => {
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
      })
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
