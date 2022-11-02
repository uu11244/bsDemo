import req from '@/utils/request.js'

export const getUserList = function (queryInfo) {
  return req.require.get('/users', { params: queryInfo });
}