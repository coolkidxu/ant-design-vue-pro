import request from '@/utils/request'

const systemApi = {
  loadSystemInfo: 'cgi-bin/SystemInfo.cgi?loadInfo'
}

export function loadSystemInfo () {
  return request({
    url: systemApi.loadSystemInfo,
    method: 'get'
  })
}
