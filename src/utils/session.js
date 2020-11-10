const tokenAdmin ="adminToken"
export function setToken(value){
    return sessionStorage.setItem(tokenAdmin, value)
}
export function getToken(){
    return sessionStorage.getItem(tokenAdmin)
}