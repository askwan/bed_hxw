/* eslint-disable */
import request from '../../utils/request'

const labApi = {
  list: '/portalsystem/laboratory/listLaboratory',
  labAdd: '/portalsystem/laboratory/add',
  listLaboratory: '/portalsystem/serverHost/listLaboratorySources',
  listUser: '/portalsystem/laboratory/listUser',
  labUsers: '/portalsystem/laboratoryUserManager/listLaboratory',
  addUser: '/portalsystem/laboratoryUserManager/add',
  delUser: '/portalsystem/laboratoryUserManager/delete/',
  labDetail: '/portalsystem/laboratory/details/',
  gigeonhole: '/portalsystem/laboratoryArchive/placeOnFile',
  addSource: '/portalsystem/laboratoryServerHostIds/add',
  delSource: `/portalsystem/laboratoryServerHostIds/delete/`,
  addLabMember: '/portalsystem/laboratoryUserIds/add',
  delLabMember: '/portalsystem/laboratoryUserIds/delete/',
  delLab: '/portalsystem/laboratory/delete/',
  archiveList: '/portalsystem/laboratoryArchive/listLaboratoryArchive',
  archiveDetail: '/portalsystem/laboratoryArchive/placeOnFileDetails/'
}

export function uploadImageUrl() {
  return process.env.VUE_APP_API_BASE_URL + '/portalsystem/images/photoFileUpload'
}

export const getLabList = params => {
  return request({
    url: labApi.list,
    params
  })
}

// 添加实验室
export const addLab = data => {
  return request({
    url: labApi.labAdd,
    method: 'post',
    data
  })
}

// 云资源——分页列表
export const listLaboratory = params => {
  return request({
    url: labApi.listLaboratory,
    method: 'get',
    params
  })
}

// 用户信息——分页列表
export const listUser = data => {
  return request({
    url: labApi.listUser,
    method: 'post',
    data
  })
}

// 实验室人员管理列表
export const labUsers = params => {
  return request({
    url: labApi.labUsers,
    params
  })
}

// 添加实验室人员管理人员
export const addUser = data => {
  return request({
    url: labApi.addUser,
    data,
    method: 'post'
  })
}

// 删除实验室人员管理人员
export const delUser = id => {
  return request({
    url: labApi.delUser + id,
    method: 'delete'
  })
}

// 实验室详情
export const labDetail = id => {
  return request({
    url: labApi.labDetail + id,
    method: 'post'
  })
}

// 归档
export const gigeonhole = data => {
  return request({
    url: labApi.gigeonhole,
    method: 'post',
    data
  })
}

// 添加云服务器
export const addLabSource = data => {
  return request({
    url: labApi.addSource,
    data,
    method: 'post'
  })
}

// 删除云服务器
export const delLabSource = (labid, id) => {
  const str = labid + '/' + id
  return request({
    url: labApi.delSource + str,
    method: 'delete'
  })
}

// 添加实验室成员
export const addLabMember = data => {
  return request({
    url: labApi.addLabMember,
    data,
    method: 'post'
  })
}

// 删除实验室成员
export const delLabMember = (labid, id) => {
  const str = labid + '/' + id
  return request({
    url: labApi.delLabMember + str,
    method: 'delete'
  })
}

// 删除实验室
export const delLab = labid => {
  return request({
    url: labApi.delLab + labid,
    method: 'delete'
  })
}

// 实验室归档分页列表
export const getArchiveList = params => {
  return request({
    url: labApi.archiveList,
    params
  })
}

// 实验室归档详情
export const getArchiveDetail = id => {
  return request({
    url: labApi.archiveDetail + id
  })
}

// 获取自己所属别人实验室的用户
export const getLabUser = () => {
  return request({
    url: '/portalsystem/laboratory/otherListUser'
  })
}

// 首页-进入实验室——分页列表
export const enterLabList = (params) => {
  return request({
    url: '/portalsystem/laboratory/inLaboratory',
    params
  })
}

// 获取服务器详情
export const getSourceById = (params) => {
  return request({
    url: '/portalsystem/course/findBySourceId',
    params
  })
}

// 判断是否是自己的服务器
export const adjustMyselfSource = (params) => {
  return request({
    url: '/portalsystem/course/findBySourceIdHaveUser',
    params
  })
}

// 实验室镜像管理
export function getMirrorList(params) {
  return request({
    url: '/portalsystem/laboratoryImage/listImage',
    params
  })
}

// 操作系统列表
export function osList(params) {
  return request({
    url: '/portalsystem/laboratoryImage/listOperSys',
    params
  })
}

// 新增镜像
export function addMirror(data) {
  return request({
    url: '/portalsystem/laboratoryImage/addImage',
    data,
    method:'post'
  })
}

// 删除镜像
export function delMirror(id) {
  return request({
    url:`/portalsystem/laboratoryImage/deleteImage/${id}`,
    method:'delete'
  })
}

// 我的资源-分布式实验床列表
export function getTestBedList(params) {
  return request({
    url: '/portalsystem/distributedLaboratoryBed/listDistributedLabBed',
    params
  })
}
// 添加分布式实验床
export function addBedToLab(data) {
  return request({
    url: '/portalsystem/laboratory/distributedLabBed/add',
    data,
    method:'post'
  })
}

// 我的资源-分布式实验床-资源列表
export function labSourceDetail(params) {
  return request({
    url:'/portalsystem/distributedLaboratoryBed/listDisLabBedSource',
    params
  })
}

// 获取站点信息
export function getStations(params) {
  return request({
    url: '/oms/station/list',
    params
  })
}

// 删除归档
export function delArchme(id){
  return request({
    url:'/portalsystem/laboratoryArchive/'+id,
    method:'delete'
  })
}

// 查询人员
export function getUserById(id) {
  return request({
    url:'/portalsystem/laboratoryUserManager/one/edit/'+id
  })
}

// 更新人员
export function updateUser(data) {
  return request({
    url:'/portalsystem/laboratoryUserManager/update',
    data,
    method:'post'
  })
}

// 释放实验床
export function releaseBed(id){
  return request({
    url:`/portalsystem/distributeExp/delete/${id}`,
    method:'get'
  })
}
