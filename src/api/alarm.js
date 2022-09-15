import request from '@/utils/request'

const alarmApi = {
  GetAlarmLevel: 'cgi-bin/AlarmLevel.cgi?loadAllLevel',
  GetAllProcess: 'cgi-bin/AlarmProcess.cgi?loadAllProcess',
  GetAlarmGroup: 'cgi-bin/AlarmGroup.cgi?loadAlarmGroup'
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
