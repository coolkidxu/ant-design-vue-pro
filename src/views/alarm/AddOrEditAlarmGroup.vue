<template>
  <a-modal v-model="visible" :title="title" on-ok="handleOk" :width="800" :destroyOnClose="true">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        保存
      </a-button>
    </template>
    <a-form v-bind="formItemLayout" :form="form">
      <a-form-item label="报警组名称">
        <a-input v-model="form.AGName" />
      </a-form-item>
      <a-form-item label="语音报警">
        <a-checkbox v-model="form.AGVoice" @change="changeCheckbox"></a-checkbox>
      </a-form-item>
      <a-form-item label="电话(手机)报警">
        <a-checkbox-group
          v-model="telPhoneUserIDs"
          :options="getOptions(userList.AGTellUser, 'phone')"
        />
      </a-form-item>
      <a-form-item label="电话(座机)报警">
        <a-checkbox-group
          v-model="mobileUserIDs"
          :options="getOptions(userList.AGTellUser, 'mobile')"
        />
      </a-form-item>
      <a-form-item label="邮件报警">
        <a-checkbox-group
          v-model="emailUserIDs"
          :options="getOptions(userList.AGEmailUser)"
        />
      </a-form-item>
      <a-form-item label="短信报警">
        <a-checkbox-group
          v-model="msgUserIDs"
          :options="getOptions(userList.AGMsgUser)"
        />
      </a-form-item>
      <a-form-item label="云短信报警">
        <a-checkbox-group
          v-model="cloudMsgUserIDs"
          :options="getOptions(userList.AGMsgUser)"
        />
      </a-form-item>
      <a-form-item label="启用">
        <a-checkbox v-model="form.AGIsAlarm" @change="changeCheckbox"></a-checkbox>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import { FormState } from '@/utils/constant'
import { mapState } from 'vuex'
import { AddAlarmGroup, EditAlarmGroup, loadAlarmUser } from '@/api/alarm'

export default {
  name: 'AddOrEditAlarmGroup',
  data () {
    return {
      loading: false,
      visible: false,
      formState: '',
      form: {},
      userList: {},
      msgUserIDs: [],
      mobileUserIDs: [],
      emailUserIDs: [],
      cloudMsgUserIDs: [],
      telPhoneUserIDs: [],
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
      notificationList: [
        {
          value: 0,
          label: '不通知'
        },
        {
          value: 1,
          label: '通知'
        }
      ]
    }
  },
  props: [],
  computed: {
    title: function () {
      return this.formState === FormState.CREATE ? '新增报警组' : '编辑报警组'
    },
    ...mapState({
      username: state => state.user.username
    })
  },
  created () {
    this.loadUserList()
  },
  methods: {
    reset () {
      this.form = {}
    },
    async loadUserList () {
      this.userList = await loadAlarmUser()
    },
    getOptions (list, type) {
      if (!list || list.length < 1) {
        return []
      }
      const options = []
      if (type === 'phone') {
        list.forEach(item => {
          if (item.UTelphone) {
            options.push({
              label: item.UFullName,
              value: item.UID
            })
          }
        })
      } else if (type === 'mobile') {
        list.forEach(item => {
          if (item.UMobile) {
            options.push({
              label: item.UFullName,
              value: item.UID
            })
          }
        })
      } else {
        list.forEach(item => {
          options.push({
            label: item.UFullName,
            value: item.UID
          })
        })
      }
      return options
    },
    changeCheckbox (e) {
    },
    showModal (formState) {
      this.formState = formState
      this.visible = true
    },
    handleAdd () {
      this.showModal(FormState.CREATE)
    },
    handleEdit (record) {
      this.showModal(FormState.EDIT)
      this.form = {
        AGVoice: record.AGVoice === '1',
        AGIsAlarm: record.AGIsAlarm === '1'
      }
      console.log('record', record)
    },
    async handleOk () {
      this.loading = true
      const formData = new FormData()
      const { AGVoice, AGIsAlarm, AGName } = this.form
      formData.append('AGVoice', AGVoice ? 1 : 0)
      formData.append('AGIsAlarm', AGIsAlarm ? 1 : 0)
      formData.append('AGName', AGName)
      formData.append('username', this.username)
      formData.append('AGShortMsg', this.msgUserIDs.length > 0 ? 1 : 0)
      formData.append('AGCMsg', this.cloudMsgUserIDs.length > 0 ? 1 : 0)
      formData.append('AGEmail', this.emailUserIDs.length > 0 ? 1 : 0)
      formData.append('AGTelphone', (this.mobileUserIDs.length + this.telPhoneUserIDs.length) > 0 ? 1 : 0)
      for (let i = 0; i < this.telPhoneUserIDs.length; i++) {
        formData.append('User_AGTelPhone', this.telPhoneUserIDs[i])
      }
      for (let i = 0; i < this.mobileUserIDs.length; i++) {
        formData.append('User_AGTelMobile', this.mobileUserIDs[i])
      }
      for (let i = 0; i < this.emailUserIDs.length; i++) {
        formData.append('User_AGEmail', this.emailUserIDs[i])
      }
      for (let i = 0; i < this.msgUserIDs.length; i++) {
        formData.append('User_AGMsg', this.msgUserIDs[i])
      }
      for (let i = 0; i < this.cloudMsgUserIDs.length; i++) {
        formData.append('User_AGCMsg', this.cloudMsgUserIDs[i])
      }
      const res = this.formState === FormState.EDIT ? await EditAlarmGroup(formData) : await AddAlarmGroup(formData)
      const { result } = res
      if (result === '0') {
        this.$message.success('保存成功')
      } else {
        this.$message.error('保存失败')
      }
      this.loading = false
      this.visible = false
      this.reset()
      this.$emit('refresh')
    },
    handleCancel (e) {
      this.visible = false
      this.reset()
    }
  }
}
</script>

<style lang='less' scoped>
.auto-fill {
  display: flex;
  justify-content: space-between;
  gap: 0.5em;

  .ant-select, .item-checkbox {
    flex-grow: 1;
    width: 6em;
  }

  span {
    flex-grow: 1;
    min-width: 4em;
  }
}

.split-container {
  display: flex;
  justify-content: space-between;
  gap: 2em;

  .ant-select {
    flex-grow: 2;
  }

  span {
    flex-grow: 1;
    min-width: 4em;
  }
}
</style>
