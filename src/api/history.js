import request from '@/utils/request'

const historyApi = {
  GetInterface: '/cgi-bin/ComManager.cgi?loadAllCom',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function getInterface (parameter) {
  return request({
    url: historyApi.GetInterface,
    method: 'get'
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: historyApi.SendSms,
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
