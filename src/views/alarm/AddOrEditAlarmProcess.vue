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
      <a-form-item label="报警流程名称">
        <a-input v-model="form.APName" />
      </a-form-item>
      <a-form-item label="报警流程">
        <div class="auto-fill">
          <span>
            <a-input-number v-model="form.APNCTime"/> 秒内，等待用户确认。
          </span>
          <div class="item-checkbox">
            <a-checkbox v-model="form.APBuzzer" @change="changeCheckbox">蜂鸣器</a-checkbox>
          </div>
          <a-select v-model="form.APRelay">
            <a-select-option :value="0">无声光报警</a-select-option>
          </a-select>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 16, offset: 6}">
        <div class="auto-fill">
          <span>
            <a-input-number v-model="form.APNRecTime"/> 分钟后，报警未解除。
          </span>
          <a-select v-model="form.APNRecKey">
            <a-select-option v-for="item in notificationList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
          <a-select v-model="form.APNRecGID">
            <a-select-option v-for="group in groups" :key="group.AGID" :value="group.AGID">{{ group.AGName }}</a-select-option>
          </a-select>
        </div>
      </a-form-item>
      <a-form-item label="用户超时未确认">
        <div class="split-container">
          <a-select v-bind="{ value: 1 }" disabled>
            <a-select-option v-for="item in notificationList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
          <a-select v-model="form.APNCGID">
            <a-select-option v-for="group in groups" :key="group.AGID" :value="group.AGID">{{ group.AGName }}</a-select-option>
          </a-select>
        </div>
      </a-form-item>
      <a-form-item label="用户确认">
        <div class="split-container">
          <a-select v-model="form.APCKey">
            <a-select-option v-for="item in notificationList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
          <a-select v-model="form.APCGID">
            <a-select-option v-for="group in groups" :key="group.AGID" :value="group.AGID">{{ group.AGName }}</a-select-option>
          </a-select>
        </div>
      </a-form-item>

      <a-form-item label="报警解除">
        <div class="split-container">
          <a-select v-model="form.APRecKey">
            <a-select-option v-for="item in notificationList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
          <a-select v-model="form.APRecGID">
            <a-select-option v-for="group in groups" :key="group.AGID" :value="group.AGID">{{ group.AGName }}</a-select-option>
          </a-select>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import { FormState } from '@/utils/constant'
import { mapState } from 'vuex'
import { AddAlarmProcess, EditAlarmProcess } from '@/api/alarm'

export default {
  name: 'AddOrEditAlarmProcess',
  data () {
    return {
      loading: false,
      visible: false,
      formState: '',
      form: {
        APRelay: 0,
        APNCGID: '1',
        APNCTime: 10,
        APNRecTime: 1,
        APNRecKey: 1,
        APNRecGID: '1',
        APCKey: 1,
        APCGID: '1',
        APRecKey: 1,
        APRecGID: '1'
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
  props: [ 'groups' ],
  computed: {
    title: function () {
      return this.formState === FormState.CREATE ? '新增流程' : '编辑流程'
    },
    ...mapState({
      username: state => state.user.username
    })
  },
  created () {
  },
  methods: {
    reset () {
      this.form = {
        APRelay: 0,
          APNCGID: '1',
          APNCTime: 10,
          APNRecTime: 1,
          APNRecKey: 1,
          APNRecGID: '1',
          APCKey: 1,
          APCGID: '1',
          APRecKey: 1,
          APRecGID: '1'
      }
    },
    changeCheckbox (e) {
      console.log(this.form.APBuzzer, this.form.APRelay)
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
        ...record,
        APBuzzer: record.APBuzzer === '1',
        APRelay: parseInt(record.APRelay),
        APNRecKey: parseInt(record.APNRecKey),
        APCKey: parseInt(record.APCKey),
        APRecKey: parseInt(record.APRecKey)
      }
    },
    async handleOk () {
      this.loading = true
      const requestObj = {
        ...this.form,
        APBuzzer: this.form.APBuzzer ? 1 : 0,
        username: this.username
      }
      const res = this.formState === FormState.EDIT ? await EditAlarmProcess(requestObj) : await AddAlarmProcess(requestObj)
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
