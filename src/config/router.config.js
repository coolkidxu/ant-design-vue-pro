// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/summary',
    children: [
      {
        path: '/summary',
        name: 'summary',
        redirect: '/dashboard/check',
        component: RouteView,
        meta: { title: 'menu.dashboard.summary', keepAlive: false, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/room',
            name: 'room',
            component: () => import('@/views/dashboard/Room'),
            meta: { title: 'menu.dashboard.room', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/Check',
            name: 'check',
            component: () => import('@/views/dashboard/Check'),
            meta: { title: 'menu.dashboard.check', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/device',
        name: 'device',
        redirect: '/device/management',
        component: RouteView,
        meta: { title: 'menu.device.deviceManagement', keepAlive: false, permission: ['dashboard'] },
        children: [
          {
            path: '/device/management',
            name: 'management',
            component: () => import('@/views/device/DeviceManagement'),
            meta: { title: 'menu.device.deviceManagement', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/device/interfaceConfig',
            name: 'interfaceConfig',
            component: () => import('@/views/device/InterfaceConfig'),
            meta: { title: 'menu.device.interfaceConfig', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/history',
        name: 'history',
        redirect: '/history/record',
        component: RouteView,
        meta: { title: 'menu.history.history', keepAlive: false, permission: ['dashboard'] },
        children: [
          {
            path: '/history/record',
            name: 'record',
            component: () => import('@/views/history/Record'),
            meta: { title: 'menu.history.record', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/history/statistics',
            name: 'statistics',
            component: () => import('@/views/history/Statistics'),
            meta: { title: 'menu.history.statistics', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/system',
        name: 'System',
        redirect: '/system/controlRecord',
        component: RouteView,
        meta: { title: 'menu.system.systemLog', keepAlive: false, permission: ['dashboard'] },
        children: [
          {
            path: '/system/controlRecord',
            name: 'ControlRecord',
            component: () => import('@/views/system/ControlRecord'),
            meta: { title: 'menu.system.controlRecord', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/system/operationRecord',
            name: 'OperationRecord',
            component: () => import('@/views/system/OperationRecord'),
            meta: { title: 'menu.system.operationRecord', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/system/runLog',
            name: 'RunLog',
            component: () => import('@/views/system/RunLog'),
            meta: { title: 'menu.system.runLog', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/system/debugRecord',
            name: 'DebugRecord',
            component: () => import('@/views/system/DebugRecord'),
            meta: { title: 'menu.system.debugRecord', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/alarm',
        name: 'alarm',
        redirect: '/alarm/level',
        component: RouteView,
        meta: { title: 'menu.alarm.management', keepAlive: false, permission: ['dashboard'] },
        children: [
          {
            path: '/alarm/level',
            name: 'level',
            component: () => import('@/views/alarm/Level'),
            meta: { title: 'menu.alarm.level', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/alarm/process',
            name: 'process',
            component: () => import('@/views/alarm/Process'),
            meta: { title: 'menu.alarm.process', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/alarm/armOrDisArm',
            name: 'armOrDisArm',
            component: () => import('@/views/alarm/ArmOrDisArm'),
            meta: { title: 'menu.alarm.armOrDisArm', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/alarm/alarmRecord',
            name: 'alarmRecord',
            component: () => import('@/views/alarm/Record'),
            meta: { title: 'menu.alarm.record', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/alarm/alarmStatistics',
            name: 'alarmStatistics',
            component: () => import('@/views/alarm/Statistics'),
            meta: { title: 'menu.alarm.statistics', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/userManagement',
        name: 'UserManagement',
        redirect: '/userManagement/roleDefinition',
        component: RouteView,
        meta: { title: 'menu.userManagement.management', keepAlive: false, permission: ['dashboard'] },
        children: [
          {
            path: '/userManagement/roleDefinition',
            name: 'RoleDefinition',
            component: () => import('@/views/user/RoleDefinition'),
            meta: { title: 'menu.userManagement.roleDefinition', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/userManagement/userAuthorization',
            name: 'UserAuthorization',
            component: () => import('@/views/user/UserAuthorization'),
            meta: { title: 'menu.userManagement.userAuthorization', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/accessControl',
        name: 'AccessControl',
        redirect: '/accessControl/record',
        component: RouteView,
        meta: { title: 'menu.accessControl.management', keepAlive: false, permission: ['dashboard'] },
        children: [
          {
            path: '/accessControl/record',
            name: 'Record',
            component: () => import('@/views/accessControl/Record'),
            meta: { title: 'menu.accessControl.record', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/accessControl/personnelManagement',
            name: 'PersonnelManagement',
            component: () => import('@/views/accessControl/PersonnelManagement'),
            meta: { title: 'menu.accessControl.personnelManagement', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/systemManagement',
        name: 'SystemManagement',
        redirect: '/systemManagement/systemConfig',
        component: RouteView,
        meta: { title: 'menu.systemManagement.management', keepAlive: false, permission: ['dashboard'] },
        children: [
          {
            path: '/systemManagement/systemConfig',
            name: 'SystemConfig',
            component: () => import('@/views/systemManagement/SystemConfig'),
            meta: { title: 'menu.systemManagement.systemConfig', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/systemManagement/systemInfo',
            name: 'SystemInfo',
            component: () => import('@/views/systemManagement/SystemInfo'),
            meta: { title: 'menu.systemManagement.systemInfo', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/systemManagement/systemMaintain',
            name: 'Maintain',
            component: () => import('@/views/systemManagement/SystemMaintain'),
            meta: { title: 'menu.systemManagement.systemMaintain', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      }
      // dashboard
     /* {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/summary',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        meta: { title: 'menu.form', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/basicForm'),
            meta: { title: 'menu.form.basic-form', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: 'menu.form.step-form', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: 'menu.form.advanced-form', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: 'menu.list', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: 'menu.list.table-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/BasicList'),
            meta: { title: 'menu.list.basic-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: 'menu.list.card-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: 'menu.list.search-list', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: 'menu.list.search-list.articles', permission: ['table'] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'menu.list.search-list.projects', permission: ['table'] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: 'menu.list.search-list.applications', permission: ['table'] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: 'menu.profile', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic'),
            meta: { title: 'menu.profile.basic', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: 'menu.profile.advanced', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/!* webpackChunkName: "result" *!/ '@/views/result/Success'),
            meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/!* webpackChunkName: "result" *!/ '@/views/result/Error'),
            meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/!* webpackChunkName: "fail" *!/ '@/views/exception/403'),
            meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/!* webpackChunkName: "fail" *!/ '@/views/exception/404'),
            meta: { title: 'menu.exception.not-find', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/!* webpackChunkName: "fail" *!/ '@/views/exception/500'),
            meta: { title: 'menu.exception.server-error', permission: ['exception'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      } */

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
