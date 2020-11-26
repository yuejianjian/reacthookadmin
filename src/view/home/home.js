import React from 'react';
import { Input , Row, Col ,Button,Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  store from '../../store/index'

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = store.getState().todolist;
    // this.state={
    //   list:[],
    // }
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange)
  }
  handleStoreChange(){
      console.log(store.getState().todolist.list);
      this.setState({
        list:store.getState().todolist.list,
        dolist:store.getState().todolist.dolist
      })
  }
  //完成事件
  finishList =(val1,val2)=>{
    console.log(val1)
    const action = {
        type: 'finish_item',
        index: val2,
        arr:val1
    }
    store.dispatch(action)
  }
  //删除未做事件
  DeleteList =(val1,val2)=>{
    const action = {
        type: 'delete_item',
        index: val2
    }
    store.dispatch(action)
  }
  //删除已做完的事情
  DeleteListTwo =(val1,val2)=>{
    const action = {
        type: 'finishdelete_item',
        index: val2
    }
    store.dispatch(action)
  }
  //新增未做事件
  handleBtnCLick=()=>{
    const action = {
        type: 'add_item',
    }
    store.dispatch(action)
    //store.getState()
    console.log(store.getState());
  }
  onChange=({ target: { value } })=>{
    console.log(value)
    const action = {
        type: 'input_change',
        value:value
    }
    store.dispatch(action);
    console.log(this.state.dataSource);
  }
  render(){
    const columns= [
      {
        title: '未完成的事',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align:"center",
        key: 'operation',
        render:(text,rowData,index)=>{
          return (
            <div>
              <Button type="primary" style={{marginRight:'10px'}} onClick={() => this.finishList(rowData,index)}>
                完成
              </Button>
              <Button type="default" onClick={() => this.DeleteList(rowData,index)}>删除</Button>
            </div>
          )
        }
      },
      
    ]
    const columnstwo= [
      {
        title: '已完成的事',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align:"center",
        key: 'operation',
        render:(text,rowData,index)=>{
          return (
            <div>
              <Button type="default" onClick={() => this.DeleteListTwo(rowData,index)}>删除</Button>
            </div>
          )
        }
      },
      
    ]
    return(
      <div >
         <Row>
            <Col span={18}>
              <Input placeholder="想做点什么" onChange={this.onChange} prefix={<PlusOutlined style={{color:'#BFBFBF'}} />}/>
            </Col>
            <Col span={2} offset={2}>
              <Button type="primary" onClick={()=>this.handleBtnCLick()}>新增</Button>
            </Col>
          </Row>
      
          <Table
            rowKey="name"
            dataSource={this.state.list}
            columns={columns}
            style={{marginTop:'20px'}}
            pagination={ false }
            bordered
          />
          <Table
            dataSource={this.state.dolist}
            columns={columnstwo}
            style={{marginTop:'20px'}}
            pagination={ false }
            bordered
          />
      </div>
    )
  }
}


export default Home;