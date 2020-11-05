import service from "../../src/utils/request";



export function login(data){
    return service.request({
        url:"/login/",
        method:"post",
        data
    })
}

export function GetSms(data){
    console.log(data)
    return service.request({
        url:"/getSms/",
        method:"post",
        data
    })
}

export function register(data){
    return service.request({
        url:"/register/",
        method:"post",
        data
    })
}