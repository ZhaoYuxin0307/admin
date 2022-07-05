import request from '@/utils/request'

function getLoginCode() {
  return request({ url: '/captcha', method: 'get' })
}

//  登录接口

function getlogin(params) {
  return request({
    url: `/login?username=${params.username}&password=${params.password}&code=${params.code}&token=${params.token}`,
    method: 'post'
  })
}

export { getLoginCode, getlogin }
