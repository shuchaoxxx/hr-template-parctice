import Cookies from 'js-cookie'

const TokenKey = 'hr-token-key'
const timeStamp = 'hr-timeStamp-token-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeStamp, Date.now())
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeStamp)
}

