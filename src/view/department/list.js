import React,{Fragment} from 'react';
import { Link  } from 'react-router-dom'
import { Form, Input, Button,Table,message,Switch,Modal,Pagination } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { GetDepartmentList,DeleteDepartmentList,StatusDepartmentList } from "../../api/account"

import TableComponent from "@c/tableData/index"
import PaginationComponent from "@c/pagination/index"

class DepartmentList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      pageNumber:1,
      pageSize:5,
      keyword:null,
      selectedRowKeys:[],
      visible:false,
      departmentid:null,
      confirmLoading:false,
      tableloading:false,
      statusid:"",
      totals :0,
      selectarr:[3536,3535],
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
            return <Switch onChange={()=>this.onHandlerSwitch(rowData)} loading={rowData.id==this.state.statusid} checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={rowData.status==="1"?true:false} />
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
                <Button type="primary" style={{marginRight:'10px'}}>
                  <Link to={{pathname:'/index/department/add',state:{id:rowData.id}}}>
                      编辑
                  </Link>
                </Button>
                <Button type="default" onClick={() => this.DeleteList(rowData.id)}>删除</Button>
              </div>
            )
          }
        },
      ],
      data:[
        
      ]
    }
  }
  //禁启用\切换
  onHandlerSwitch=(value)=>{
    console.log(value.status);
    var params={
      id:value.id,
      status:value.status==="1"?false:true
    }
    this.setState({
      statusid:value.id
    })
    StatusDepartmentList(params).then(res =>{
      message.success(res.data.message);
      this.loadData()
      this.setState({
        statusid:""
      })
    }).catch(err =>{
      console.log(err);
      message.error(err.message);
    })
    // if(!value)
  }
  //删除部门列表
  DeleteList=(id)=>{
    console.log(id);
    if(!id){
      console.log(this.state.selectedRowKeys)
      if(this.state.selectedRowKeys.length===0){
        return false;
      }
      var id =this.state.selectedRowKeys.join()
      this.setState({
        visible:true,
        departmentid:id, 
      }) 
    }else{
      this.setState({
        visible:true,
        departmentid:id, 
      }) 
    }
    
  }
  handleOk =()=>{
    if(!this.state.departmentid){
      return false;
    }else{
      this.setState({
        confirmLoading:true,
      })
      DeleteDepartmentList({id:this.state.departmentid}).then(res =>{
        console.log(res);
        message.success(res.data.message);
        this.loadData()
        this.setState({
          confirmLoading:false,
          departmentid:null,
          visible:false,
          selectedRowKeys:[]
        })  
      }).catch(err =>{
        console.log(err);
        message.error(err.message);
      })
    }
  }
  //确认删除
  // confirmdelete=(id)=>{
    
  // }
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
      this.setState({
        tableloading:true,
      })
      GetDepartmentList(params).then(res =>{
        console.log(res);
        if(res.data.data.data){
          this.setState({
            data:res.data.data.data,
            totals:res.data.data.total,
            tableloading:false,
            //selectedRowKeys:arr
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
      pageSize:5
    })
    console.log(value);
    this.loadData()
  }
  onSelectChange=(value)=>{
    this.setState({ 
      selectedRowKeys:value
    });
  }

  onChangePage=(pageNumber) => {
    console.log(pageNumber)
    this.setState({
        pageNumber:pageNumber,
    },()=>{
        this.loadData()
    })
        
  }
  render(){
    const { columns,data,selectedRowKeys,tableloading,selectarr } = this.state;
    const totals =this.state.totals?this.state.totals:5;
    console.log(selectedRowKeys);
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      preserveSelectedRowKeys:true,
      getCheckboxProps(record){
        console.log(selectedRowKeys.includes(Number(record.id)));
        return{
          props: {
            defaultChecked:selectedRowKeys.includes(Number(record.id))
          }
        }
      }
      
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
        {/* <TableComponent /> */}
       <Table
        rowSelection={rowSelection}
        style={{marginTop:'20px'}}
        rowKey='id'
        columns={columns}
        dataSource={data}
        bordered
        loading={tableloading}
        pagination={ false }
      >

       </Table>
       <Button type="default" onClick={()=>this.DeleteList()} style={{marginTop:'10px',}}>批量删除</Button>
       <PaginationComponent total={totals} onChangePage={this.onChangePage} />
       {/* <Pagination defaultCurrent={1}  defaultPageSize={5} total={totals} onChange={this.onChange} style={{float:'right',marginTop:'10px'}}/> */}
       <Modal
          title="提示"
          visible={this.state.visible}
          okText="确定"
          cancelText ="取消"
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={()=>{this.setState({visible:false})}}
        >
          <p style={{textAlign:"center"}}>确定删除此信息,<span style={{color:'red',fontWeight:"bold"}}>删除后无法恢复!</span></p>
          
        </Modal>
      </Fragment>
    )
  }
}


export default DepartmentList;