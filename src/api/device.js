import request from '@/utils/request'

const deviceApi = {
  GetInterface: '/cgi-bin/ComManager.cgi?loadAllCom',
  EditInterFace: '/cgi-bin/ComManager.cgi?modifyCom',
  AddComServer: '/cgi-bin/ComManager.cgi?addComServer',
  EditComServer: '/cgi-bin/ComManager.cgi?modifyComServer',
  DeleteComServer: '/cgi-bin/ComManager.cgi?delComServer',
  EditSimulation: '/cgi-bin/AnalogManager.cgi?modifyAnalogSet',
  EditComState: '/cgi-bin/ComManager.cgi?moComFlag'
}

export function getInterface () {
  return request({
    url: deviceApi.GetInterface,
    method: 'get'
  })
}

export function editInterface (parameter) {
  return request({
    url: deviceApi.EditInterFace,
    method: 'post',
    data: parameter
  })
}

export function addComServer (parameter) {
  return request({
    url: deviceApi.AddComServer,
    method: 'post',
    data: parameter
  })
}

export function editComServer (parameter) {
  return request({
    url: deviceApi.EditComServer,
    method: 'post',
    data: parameter
  })
}

export function deleteComServer (parameter) {
  return request({
    url: deviceApi.DeleteComServer,
    method: 'post',
    data: parameter
  })
}

export function editSimulation (parameter) {
  return request({
    url: deviceApi.EditSimulation,
    method: 'post',
    data: parameter
  })
}

export function editComState (parameter) {
  return request({
    url: deviceApi.EditComState,
    method: 'post',
    data: parameter
  })
}
