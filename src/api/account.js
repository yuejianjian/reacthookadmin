import service from "../../src/utils/request";



export function login(){
    return service.request({
        url:"/login/",
        methods:"post",
        data:data,
    })
}