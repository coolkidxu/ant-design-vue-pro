import request from '@/utils/request'

const systemApi = {
  loadControlRecord: 'cgi-bin/ControlRecord.cgi?loadControlRecord',
  loadSelectCondition: 'cgi-bin/ControlRecord.cgi?loadSelectCondition',
  loadOperationRecord: 'cgi-bin/OperRecord.cgi?loadOperRecord',
  loadOperSelectCondition: 'cgi-bin/OperRecord.cgi?loadSelectCondition',
  loadRunLog: 'cgi-bin/SystemLog.cgi?loadAllLog&sortOrder=asc',
  loadDebugLog: 'cgi-bin/SystemLog.cgi?loadDebugLog&sortOrder=asc',
  deleteLog: 'cgi-bin/SystemLog.cgi?deleteLog'
}

export function loadControlRecord (parameter) {
  return request({
    url: systemApi.loadControlRecord,
    method: 'post',
    data: parameter
  })
}
export function loadSelectCondition () {
  return request({
    url: systemApi.loadSelectCondition,
    method: 'get'
  })
}
export function loadOperationRecord (parameter) {
  return request({
    url: systemApi.loadOperationRecord,
    method: 'post',
    data: parameter
  })
}
export function loadOperationSelectCondition () {
  return request({
    url: systemApi.loadOperSelectCondition,
    method: 'get'
  })
}
export function loadRunLog () {
  return request({
    url: systemApi.loadRunLog,
    method: 'get'
  })
}
export function loadDebugLog () {
  return request({
    url: systemApi.loadDebugLog,
    method: 'get'
  })
}
export function deleteLog (parameter) {
  return request({
    url: systemApi.deleteLog,
    method: 'post',
    data: parameter
  })
}
