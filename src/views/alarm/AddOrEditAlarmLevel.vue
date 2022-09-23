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
      <a-form-item label="级别编号">
        <a-input v-model="form.ALID" disabled />
      </a-form-item>
      <a-form-item label="报警级别">
        <a-input v-model="form.ALName" class="full-width"/>
      </a-form-item>
      <a-form-item label="报警颜色">
        <a-input type="color" v-model="form.CColorCode" class="full-width"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import { FormState } from '@/utils/constant'
import { mapState } from 'vuex'
import { AddAlarmLevel, EditAlarmLevel } from '@/api/alarm'

export default {
  name: 'AddOrEditAlarmLevel',
  data () {
    return {
      loading: false,
      visible: false,
      formState: '',
      form: {
        CColorCode: '#000000'
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    }
  },
  computed: {
    title: function () {
      return this.formState === FormState.CREATE ? '新增报警级别' : '编辑报警级别'
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
      this.form.ALID = dataLength + 1
    },
    handleEdit (record) {
      this.showModal(FormState.EDIT)
      this.form = record
    },
    async handleOk () {
      this.loading = true
      const color = this.form.CColorCode.split('#')[1]
      const requestObj = {
        ...this.form,
        CColorCode: color.toUpperCase(),
        username: this.username
      }
      const res = this.formState === FormState.EDIT ? await EditAlarmLevel(requestObj) : await AddAlarmLevel(requestObj)
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
