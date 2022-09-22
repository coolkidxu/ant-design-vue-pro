import request from '@/utils/request'

const historyApi = {
  GetInterface: '/cgi-bin/ComManager.cgi?loadAllCom',
  Logout: '/auth/logout',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav',
  SelectCondition: 'cgi-bin/HistoryRecord.cgi?loadSelectCondition',
  QueryHistoryRecord: 'cgi-bin/HistoryRecord.cgi?loadHistoryRecord'
}

export function getInterface () {
  return request({
    url: historyApi.GetInterface,
    method: 'get'
  })
}

export function getSelectCondition () {
  return request({
    url: historyApi.SelectCondition,
    method: 'get'
  })
}
export function queryHistoryRecord (parameter) {
  return request({
    url: historyApi.QueryHistoryRecord,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: historyApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: historyApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: historyApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: historyApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
