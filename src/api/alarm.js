import request from '@/utils/request'

const alarmApi = {
  GetAlarmLevel: 'cgi-bin/AlarmLevel.cgi?loadAllLevel',
  GetAllProcess: 'cgi-bin/AlarmProcess.cgi?loadAllProcess',
  GetAlarmGroup: 'cgi-bin/AlarmGroup.cgi?loadAlarmGroup',
  GetAlarmArmGroup: '/cgi-bin/HolidayGroup.cgi?loadAllHolidayGroup',
  GetAlarmDisArm: '/cgi-bin/WeekGroup.cgi?loadAllWeekGroup',
  GetAlarmRecord: '/cgi-bin/AlarmRecord.cgi?loadAlarmRecord',
  GetAlarmRecordCondition: '/cgi-bin/AlarmRecord.cgi?loadSelectCondition',
  GetAllAlarmUser: 'cgi-bin/AlarmGroup.cgi?loadUser',
  AddAlarmLevel: 'cgi-bin/AlarmLevel.cgi?addLevel',
  EditAlarmLevel: 'cgi-bin/AlarmLevel.cgi?modifyLevel',
  DeleteAlarmLevel: 'cgi-bin/AlarmLevel.cgi?delLevel',
  AddAlarmProcess: 'cgi-bin/AlarmProcess.cgi?addProcess',
  EditAlarmProcess: 'cgi-bin/AlarmProcess.cgi?modifyProcess',
  DeleteAlarmProcess: 'cgi-bin/AlarmProcess.cgi?delProcess',
  AddAlarmGroup: 'cgi-bin/AlarmGroup.cgi?addAlarmGroup',
  EditAlarmGroup: 'cgi-bin/AlarmGroup.cgi?modifyAlarmGroup',
  DeleteAlarmGroup: 'cgi-bin/AlarmGroup.cgi?delAlarmGroup'

}

export const loadAlarmLevel = () => request.get(alarmApi.GetAlarmLevel)
export const loadAllProcess = () => request.get(alarmApi.GetAllProcess)
export const loadAlarmGroup = () => request.get(alarmApi.GetAlarmGroup)
export const loadAlarmArmGroup = () => request.get(alarmApi.GetAlarmArmGroup)
export const loadDisAlarmArmGroup = () => request.get(alarmApi.GetAlarmDisArm)
export const loadAlarmRecord = (data) => request.post(alarmApi.GetAlarmRecord, data)
export const loadAlarmUser = () => request.get(alarmApi.GetAllAlarmUser)
export const getAlarmCondition = () => request.get(alarmApi.GetAlarmRecordCondition)
export const AddAlarmLevel = (data) => request.post(alarmApi.AddAlarmLevel, data)
export const EditAlarmLevel = (data) => request.post(alarmApi.EditAlarmLevel, data)
export const DeleteAlarmLevel = (data) => request.post(alarmApi.DeleteAlarmLevel, data)
export const AddAlarmProcess = (data) => request.post(alarmApi.AddAlarmProcess, data)
export const EditAlarmProcess = (data) => request.post(alarmApi.EditAlarmProcess, data)
export const DeleteAlarmProcess = (data) => request.post(alarmApi.DeleteAlarmProcess, data)
export const AddAlarmGroup = (data) => request.post(alarmApi.AddAlarmGroup, data)
export const EditAlarmGroup = (data) => request.post(alarmApi.EditAlarmGroup, data)
export const DeleteAlarmGroup = (data) => request.post(alarmApi.DeleteAlarmGroup, data)
