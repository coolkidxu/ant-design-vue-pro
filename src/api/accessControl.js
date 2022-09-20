import request from '@/utils/request'

const accessControlApi = {
  getRecordSelectCondition: 'cgi-bin/AccessRecord.cgi?loadSelectCondition',
  getRecord: 'cgi-bin/AccessRecord.cgi?loadAccessRecord',
  getAllConsumer: 'cgi-bin/Consumer.cgi?loadAllConsumer'
}

export function getRecordSelectCondition () {
  return request({
    url: accessControlApi.getRecordSelectCondition,
    method: 'get'
  })
}
export function getRecord (parameter) {
  return request({
    url: accessControlApi.getRecord,
    method: 'post',
    data: parameter
  })
}
export function loadAllConsumer (parameter) {
  return request({
    url: accessControlApi.getAllConsumer,
    method: 'post',
    data: parameter
  })
}
