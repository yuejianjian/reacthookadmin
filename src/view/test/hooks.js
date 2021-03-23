import React ,{ useState,useEffect } from 'react';
import { Button } from 'antd';

// class Hooks extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             count:0
//         }
//     }

//     render(){
//         return(
//             <div>
//                 <p>你点击的次数{this.state.count}</p>
//                 <Button type="primary" onClick={() =>this.setState({count:this.state.count+1})}>点击</Button>
//             </div>
//         )
//     }
// }


// export default Hooks;


//hooks测试
function Hooks(){
    const [count , setCount] = useState(0);
    useEffect(() => {
        // 使用浏览器API更新文档标题
        console.log(`You clicked ${count} times`);

        //document.title = `You clicked ${count} times`;
    });

    return(
        <div>
            <p>你点击的次数{count}</p>
            <Button type="primary" onClick={() =>setCount(count+1)}>点击</Button>
        </div>
    )
}

export default Hooks;