import request from '@/utils/request'

const alarmApi = {
  GetAlarmLevel: 'cgi-bin/AlarmLevel.cgi?loadAllLevel',
  GetAllProcess: 'cgi-bin/AlarmProcess.cgi?loadAllProcess',
  GetAlarmGroup: 'cgi-bin/AlarmGroup.cgi?loadAlarmGroup',
  GetAlarmArmGroup: '/cgi-bin/HolidayGroup.cgi?loadAllHolidayGroup',
  GetAlarmDisArm: '/cgi-bin/WeekGroup.cgi?loadAllWeekGroup',
  GetAlarmRecord: '/cgi-bin/AlarmRecord.cgi?loadAlarmRecord',
  GetAlarmRecordCondition: '/cgi-bin/AlarmRecord.cgi?loadSelectCondition'
}

export function loadAlarmLevel () {
  return request({
    url: alarmApi.GetAlarmLevel,
    method: 'get'
  })
}
export function loadAllProcess () {
  return request({
    url: alarmApi.GetAllProcess,
    method: 'get'
  })
}
export function loadAlarmGroup () {
  return request({
    url: alarmApi.GetAlarmGroup,
    method: 'get'
  })
}

export function loadAlarmArmGroup () {
  return request({
    url: alarmApi.GetAlarmArmGroup,
    method: 'get'
  })
}

export function loadDisAlarmArmGroup () {
  return request({
    url: alarmApi.GetAlarmDisArm,
    method: 'get'
  })
}

export function loadAlarmRecord (parameter) {
  return request({
    url: alarmApi.GetAlarmRecord,
    method: 'post',
    data: parameter
  })
}

export function getAlarmCondition () {
  return request({
    url: alarmApi.GetAlarmRecordCondition,
    method: 'get'
  })
}
