//建立上下文
const files = require.context("../../view",true,/\.js$/); //第一个参数,目录.第二个参数.是否查找子级目录,第三个参数,指定查找文件
//声明组件对象
const components =[];
//循环文件
files.keys().map(key =>{
    if(key.includes("./index/")||key.includes("./login/")){ return false; }
    const splitFilesName =key.split(".");
    const jsonObj ={};
    const path =`/index${splitFilesName[1].toLowerCase()}`;
    const component = files(key).default;
    jsonObj.path =path;
    jsonObj.component =component;
    components.push(jsonObj);
})

export default components;