import cookies from 'react-cookies'

const tokenAdmin ="adminToken"
const userName ="userName"
//存储cookies
export function setToken(value){
     cookies.save(tokenAdmin, value)
}
export function getToken(){
    return cookies.load(tokenAdmin)
}
export function getuserName(){
    return cookies.load(userName)
}
//存储用户名
export function setUserName(value){
    cookies.save(userName, value)
}