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
//新增部门
export function DepartmentAddApi(data){
    return service.request({
        url:"/department/add/",
        method:"post",
        data
    })
}
//获取部门列表
export function GetDepartmentList(data){
    return service.request({
        url:"/department/list/",
        method:"post",
        data
    })
}
//删除部门列表
export function DeleteDepartmentList(data){
    return service.request({
        url:"/department/delete/",
        method:"post",
        data
    })
}