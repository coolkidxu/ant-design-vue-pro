import request from '@/utils/request'

const userApi = {
  GetUserDefinition: 'cgi-bin/RoleManager.cgi?loadRole',
  GetUserAuthorization: 'cgi-bin/UserManager.cgi?loadUser'
}

export function loadUserDefinition (parameter) {
  return request({
    url: userApi.GetUserDefinition,
    method: 'post',
    data: parameter
  })
}

export function loadUserAuthorization (parameter) {
  return request({
    url: userApi.GetUserAuthorization,
    method: 'post',
    data: parameter
  })
}
