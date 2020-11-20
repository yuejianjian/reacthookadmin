import React from 'react';

import { Form, Input,InputNumber, Button, message, Radio } from 'antd';
import {DepartmentAddApi,GetDepartDetails,EditDepartDetails} from "../../api/account"
class DepartmentAdd extends React.Component{
  constructor(props){
    super(props)
    this.state={
        formLayout:{
          labelCol:{ span:2 },
          wrapperCol:{ span:22 }
        },
        id:null,
        loading:false,
    }
  }

  componentDidMount(){
    console.log(this.props.location.state);
     if(this.props.location.state){
      this.setState({
        id:this.props.location.state.id
      })
      this.getDepartmentDetails(this.props.location.state.id)
    }
    // if(!this.props.location.state){
    //   return false;
    // }else{
    //   this.getDepartmentDetails()
    // }
    //console.log( this.props.location.state.id);
  }
  //获取部门详情
  getDepartmentDetails=(id)=>{
    GetDepartDetails({id:id}).then(res =>{
      const data = res.data.data;
      this.refs.form.setFieldsValue	({
        name:data.name,
        number: data.number,
        status:data.status,
        content:data.content,

      });
  }).catch(err =>{
      this.setState({
        loading:false,
      })
      message.error(err.message);
      console.log(err);
  })
  }
  onSubmit=(value) =>{
    this.setState({
      loading:true,
    })
    this.state.id==null?this.addDepartmentList(value):this.editDepartmentList(value)
    // DepartmentAddApi(value).then(res =>{
    //     message.success(res.data.message);
    //     console.log(res);
    //     this.setState({
    //       loading:false,
    //     })
    //     this.refs.form.resetFields();
    // }).catch(err =>{
    //     this.setState({
    //       loading:false,
    //     })
    //     message.error(err.message);
    //     console.log(err);
    // })
  }
  //提交
  addDepartmentList=(value)=>{
    console.log(value)
    DepartmentAddApi(value).then(res =>{
        message.success(res.data.message);
        console.log(res);
        this.setState({
          loading:false,
        })
        this.refs.form.resetFields();
    }).catch(err =>{
        this.setState({
          loading:false,
        })
        message.error(err.message);
        console.log(err);
    })
  }
  //修改
  editDepartmentList=(value)=>{
    console.log(value)
    value.id =this.state.id
    EditDepartDetails(value).then(res =>{
        message.success(res.data.message);
        console.log(res);
        this.setState({
          loading:false,
        })
        this.refs.form.resetFields();
    }).catch(err =>{
        this.setState({
          loading:false,
        })
        message.error(err.message);
        console.log(err);
    })
  }
  render(){
    return(
      <div >
        <Form 
        ref="form"
        onFinish={this.onSubmit} 
        labelCol={this.state.formLayout.labelCol} 
        wrapperCol={this.state.formLayout.wrapperCol}
        initialValues={{
          number: 1,
          status:true
        }}
        >
          <Form.Item 
          label="部门名称"
          name="name"
          rules={[{ required: true, message: '部门名称不能为空!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="人员数量" name="number">
            <InputNumber min={0} max={100}  />
          </Form.Item>
          <Form.Item label="禁启用" name="status">
            <Radio.Group  >
              <Radio value={false}>禁用</Radio>
              <Radio value={true}>启用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item 
          label="描述" 
          name="content"
          rules={[{ required: true, message: '描述不能为空!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={this.state.loading}>{this.state.id?"修改":"确定"}</Button>
          </Form.Item>
        </Form>
       
      </div>
    )
  }
}


export default DepartmentAdd;