<template>
  <div>
    <a-card>
      <div class="title-container">
        <span class="title-prefix"></span>
        <span class="title-content">产品规格</span>
      </div>
      <a-card>
        <a-card-grid>
          设备型号
        </a-card-grid>
        <a-card-grid>
          {{ dataSource.SGSysName }}
        </a-card-grid>
        <a-card-grid >
          产品序列号
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.sequencenumber }}
        </a-card-grid>
        <a-card-grid >
          模拟量个数
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGAINum }}
        </a-card-grid>
        <a-card-grid >
          开关量个数
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGDINum }}
        </a-card-grid>
        <a-card-grid>
          继电器个数
        </a-card-grid>
        <a-card-grid>
          {{ dataSource.SGDONum }}
        </a-card-grid>
        <a-card-grid >
          串口个数
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGCOMNum }}
        </a-card-grid>
        <a-card-grid >
          电话报警
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGTelphone === '1' ? '有' : '无' }}
        </a-card-grid>
        <a-card-grid >
          电话方式
        </a-card-grid>
        <a-card-grid>
          {{ getPhoneType(dataSource.SGTelephone4G) }}
        </a-card-grid>
        <a-card-grid>
          短信报警
        </a-card-grid>
        <a-card-grid>
          {{ dataSource.SGMsgNum === '1' ? '有' : '无' }}
        </a-card-grid>
        <a-card-grid >
          语音报警
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGVoiceNum === '1' ? '有' : '无' }}
        </a-card-grid>
        <a-card-grid >
          外置模块
        </a-card-grid>
        <a-card-grid >
          暂无逻辑约束
        </a-card-grid>
        <a-card-grid >
          外置模块串口号
        </a-card-grid>
        <a-card-grid >
          暂无逻辑约束
        </a-card-grid>
        <a-card-grid>
          视频
        </a-card-grid>
        <a-card-grid>
          {{ dataSource.SGVideo === '1' ? '有' : '无' }}
        </a-card-grid>
        <a-card-grid >
          手机app
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGAPP === '1' ? '有' : '无' }}
        </a-card-grid>
        <a-card-grid >
          网口个数
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGNetMouthNum }}
        </a-card-grid>
        <a-card-grid >
          网页语音报警
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGWebVoice === '1' ? '有' : '无' }}
        </a-card-grid>
        <a-card-grid>
          语音播放次数
        </a-card-grid>
        <a-card-grid>
          {{ dataSource.TelAndVocTime }}
        </a-card-grid>
        <a-card-grid >
          LCD液晶屏
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SGLcdNum === '1' ? '有' : '无' }}
        </a-card-grid>
      </a-card>
    </a-card>
    <a-card>
      <div class="title-container">
        <span class="title-prefix"></span>
        <span class="title-content">操作系统</span>
      </div>
      <a-card>
        <a-card-grid>
          系统名称
        </a-card-grid>
        <a-card-grid>
          {{ dataSource.SName }}
        </a-card-grid>
        <a-card-grid >
          动环监控系统
        </a-card-grid>
        <a-card-grid >
          {{ dataSource.SSoftwareV }}
        </a-card-grid>
      </a-card>
    </a-card>
  </div>
</template>

<script>

import { loadSystemInfo } from '@/api/systemManagement'

export default {
  name: 'SystemInfo',
  data () {
    return {
      loading: true,
      dataSource: []
    }
  },
  computed: {},
  created () {
    this.loadSystemInfo()
  },
  methods: {
    loadSystemInfo () {
      this.loading = true
      loadSystemInfo().then(res => {
        this.loading = false
        this.dataSource = res
      })
    },
    getPhoneType (SGTelephone4G) {
      switch (SGTelephone4G) {
        case '0':
          return '有线电话'
        case '1':
          return '内置4G电话'
        case '2':
          return '外置4G电话'
        default:
          return '暂无数据'
      }
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

.full-width {
  width: 100% !important;
}
.ant-card-grid {
  width: 25%;
}
.title-content {
  font-size: 22px;
  color: #333333;
}
.title-prefix {
  width: 4px;
  height: 20px;
  background: #1B3194;
  border-radius: 100px 100px 100px 100px;
  opacity: 1;
}
.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  gap: 0.5em;
}

</style>
