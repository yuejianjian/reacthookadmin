import React,{Fragment} from 'react';

import { Form, Input, Button,Table,message,Switch,Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { GetDepartmentList,DeleteDepartmentList } from "../../api/account"
const { confirm } = Modal;
function destroyAll() {
  Modal.destroyAll();
}
class DepartmentList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      pageNumber:1,
      pageSize:10,
      keyword:null,
      selectedRowKeys:[],
      columns:[
        {
          title:"部门名称",
          dataIndex:"name",
          align:"center",
          key:"name"
        },
        {
          title:"禁启用",
          dataIndex:"status",
          key:"status",
          align:"center",
          render:(text,rowData)=>{
            return <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={rowData.status==="1"?true:false} />
          }
        },
        {
          title:"人员数量",
          dataIndex:"number",
          align:"center",
          key:"number"
        },
        {
          title:"操作",
          dataIndex:"operation",
          align:"center",
          key:"name",
          width:250,
          render:(text,rowData)=>{
            return (
              <div>
                <Button type="primary" style={{marginRight:'10px'}}>编辑</Button>
                <Button type="default" onClick={() => this.DeleteList(rowData)}>删除</Button>
              </div>
            )
          }
        },
      ],
      data:[
        
      ]
    }
  }
  //删除部门列表
  DeleteList=(value)=>{
    confirm({
      title:'删除',
      icon: <ExclamationCircleOutlined />,
      content: <Button onClick={destroyAll}>确定删除{value.name}?</Button>,
      onOk:() =>this.confirmdelete(value.id),
      onCancel() {
        console.log('Cancel');
      },
    });
   
    
  }
  //确认删除
  confirmdelete=(id)=>{
    if(!id){
      return false;
    }else{
      DeleteDepartmentList({id}).then(res =>{
        console.log(res);
        message.success(res.data.message);
        this.loadData()  
      }).catch(err =>{
        console.log(err);
        message.error(err.message);
      })
    }
  }
  //生命周期挂载
  componentDidMount(){
    this.loadData();
  }
  loadData=()=>{
      const params={
        pageNumber:this.state.pageNumber,
        pageSize:this.state.pageSize
      }
      if(this.state.keyword){
        params.name = this.state.keyword
      }

      GetDepartmentList(params).then(res =>{

        //message.success(res.data.message);
        console.log(res);
        if(res.data.data.data){
          this.setState({
            data:res.data.data.data
          })
        }
      
        // this.setState({
        //   loading:false,
        // })
    }).catch(err =>{
      message.error(err.message);
      console.log(err);
    })
  }
  onFinish=(value)=>{

    this.setState({
      keyword:value.username,
      pageNumber:1,
      pageSize:10
    })
    console.log(value);
    this.loadData()
  }
  onSelectChange=(value)=>{
    this.setState({ 
      selectedRowKeys:value
    });
  }
  // onSelectChange = selectedRowKeys => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({ selectedRowKeys });
  // };
  render(){
    const { columns,data,selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return(
      <Fragment >
        <Form layout="inline" onFinish={this.onFinish}>
            <Form.Item label="部门名称" name="username">
                <Input placeholder="请输入部门名称" />
            </Form.Item>
            <Form.Item label="部门名称" name="username">
                <Button type="primary" htmlType="submit">搜索</Button>
            </Form.Item>
        </Form>
       <Table
        rowSelection={rowSelection}
        style={{marginTop:'20px'}}
        rowKey="id"
        columns={columns}
        dataSource={data}
        bordered
      >

       </Table>
      </Fragment>
    )
  }
}


export default DepartmentList;