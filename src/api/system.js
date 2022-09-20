import request from '@/utils/request'

const systemApi = {
  loadControlRecord: 'cgi-bin/ControlRecord.cgi?loadControlRecord',
  loadSelectCondition: 'cgi-bin/ControlRecord.cgi?loadSelectCondition',
  loadOperationRecord: 'cgi-bin/OperRecord.cgi?loadOperRecord',
  loadRunLog: 'cgi-bin/SystemLog.cgi?loadAllLog&sortOrder=asc',
  loadDebugLog: 'cgi-bin/SystemLog.cgi?loadDebugLog&sortOrder=asc'
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
