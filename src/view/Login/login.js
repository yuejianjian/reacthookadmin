import React from 'react'
import "../../style/login.scss"
import {withRouter} from 'react-router-dom'

import { message,Row, Col  } from 'antd'
import { setToken,setUserName,getToken } from '../../utils/cookies'

import {
    LoadingOutlined
  } from '@ant-design/icons';

  import { GetSms,login,register } from "../../api/account.js"

class Login extends React.Component{
    constructor(){
        super()
        this.state ={
            loginType: true,
            loading: false,
            loginForm: {
                username: '',
                password: '',
                code:''
            },
            registerForm: {
                username: '',
                password: '',
                confirmpassword: '',
                code:''
            },
            codeButtonStatus:{
                status:false,
                text:'获取验证码'
            },
        }
    }
    getCode =(event) =>{
        this.countDown(60)
        console.log(event);
        const { loginForm,registerForm } = this.state
        if (!loginForm.username&&event==="login") {
            return message.error('用户名不能为空')
        }else if(!registerForm.username&&event==="register"){
            return message.error('用户名不能为空')
        }
        let params={
            username:event==='login'?loginForm.username:registerForm.username,
            module:event
        }
        this.setState({ 
            codeButtonStatus:{
                status:true,
                text:'发送中'
            },
        })
        GetSms(params).then(res =>{
            message.success(res.data.message);
            console.log(res);
            this.setState({
                codeButtonStatus:{
                    status:false
                },
            })
            //this.codeButtonStatus.status =false;
            //调用定时器
            this.countDown(60);

        }).catch(err =>{
            console.log(err);
        })
    }
    countDown =(val) =>{
        console.log(val);
        let time = val;
        if(this.timer){
          clearInterval(this.timer)
        }
        this.timer = setInterval(() =>{
          time--;
          if(time===0){
            clearInterval(this.timer)
            this.setState({
                codeButtonStatus:{
                    text:"再次获取",
                    status:false
                },
            })
          }else{
            this.setState({
                codeButtonStatus:{
                    text:`倒计时${time}秒`,
                    status:false
                },
            })  
          }
        },1000)
    }

    toggleClass = () => {
        this.setState((state) => {
          if (state.loginType) {
            return {
              loginType: state.loginType,
              registerForm: {
                username: '',
                email: '',
                password: ''
              }
            }
          }
          return { loginType: state.loginType }
        })
        this.setState({ loginType: !this.state.loginType })
      }
    handleRegister =(event)=>{
        event.preventDefault()
        const { registerForm } = this.state
        if (!registerForm.username) {
          return message.error('用户名不能为空')
        }
        if (!registerForm.password) {
          return message.error('用户密码不能为空')
        }
        if (!registerForm.confirmpassword) {
          return message.error('重复密码不能为空')
        }
        if (registerForm.password!=registerForm.confirmpassword) {
            return message.error('用户密码与确认密码不一致')
        }
        if (!registerForm.code) {
            return message.error('验证码不能为空')
        }
        register({...registerForm}).then(res =>{
            message.success(res.data.message);
            console.log(res);
            this.clearCountDown();
        }).catch(err =>{
            console.log(err);
        })
    }
    handleInputChange = (event, formType, labelName) => {
        const { loginForm, registerForm } = this.state
        if (formType === 'register') {
          registerForm[labelName] = event.target.value
          this.setState({ registerForm })
        } else {
          loginForm[labelName] = event.target.value
          this.setState({
            loginForm,
            registerForm: {
              username: '',
              email: '',
              password: ''
            }
          })
        }
    }
    //登录提交
    handleLogin = (event) => {
        event.preventDefault()
        const { loginForm } = this.state
        if (!loginForm.username) {
          return message.error('用户名不能为空')
        }
        if (!loginForm.password) {
          return message.error('密码不能为空')
        }
        if (!loginForm.code) {
            return message.error('验证码不能为空')
        }
        this.setState({loading: true})
        login({...loginForm}).then(res =>{
            const data = res.data;
            console.log(data);
            setToken(data.data.token);
            setUserName(data.data.username);
            message.success(res.data.message);
            this.props.history.push("./Index/home/home")
        }).catch(err =>{
            console.log(err);
        })
       
    }
      //清除倒计时
      clearCountDown(){
        this.setState({ 
            codeButtonStatus:{
                status:false,
                text:'获取验证码'
            },
        })
        clearInterval(this.timer);
      }
    render(){
        const { loginType, registerForm, loginForm,loading,codeButtonStatus } = this.state;
        const activeClass = !loginType ? 'right-panel-active' : ''
        return(
            <div className="login-wrapper">
                <div className={`${activeClass} container`}>
                    <div className="form-container sign-up-container" >
                        <form id="register" onSubmit={this.handleRegister}>
                            <h1>注册</h1>
                            <input type="text" name="username" defaultValue={registerForm.username}  onChange={(event) => this.handleInputChange(event, 'register', 'username')} placeholder="用户名" />
                            <input type="password" name="password"defaultValue={registerForm.password} onChange={(event) => this.handleInputChange(event, 'register', 'password')} placeholder="密码" />
                            <input type="password" name="password" defaultValue={registerForm.confirmpassword} onChange={(event) => this.handleInputChange(event, 'register', 'confirmpassword')} placeholder="确认密码" />
                            <Row type="flex" justify="center" align="middle">
                                <Col span={10}>
                                    <input type="text" name="password" defaultValue={registerForm.code} onChange={(event) => this.handleInputChange(event, 'register', 'code')} placeholder="验证码" />  
                                </Col>
                                <Col span={12} offset={2}>
                                    <button type="button" data-type="primary" onClick={(event)=>this.getCode("register")}>{codeButtonStatus.text}</button>
                                </Col>
                            </Row>
                            <button type="submit" data-type="primary">注册</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container" >
                        <form id="login" onSubmit={this.handleLogin}>
                            <h1>登录</h1>
                            <input type="text" defaultValue={loginForm.username} onChange={(event) => this.handleInputChange(event, 'login', 'username')} name="username" placeholder="用户名" />
                            <input type="password" defaultValue={loginForm.password} onChange={(event) => this.handleInputChange(event, 'login', 'password')} name="password" placeholder="密码" />
                            <Row type="flex" justify="center" align="middle">
                                <Col span={10}>
                                <input type="text" name="password" defaultValue={loginForm.code} onChange={(event) => this.handleInputChange(event, 'login', 'code')} placeholder="验证码" />  
                                </Col>
                                <Col span={12} offset={2}>
                                    <button type="button" data-type="primary" onClick={(event)=>this.getCode("login")}>{codeButtonStatus.text}</button>
                                </Col>
                            </Row>
                            {/* <Link to="/forget">忘记密码</Link> */}
                            <button type="submit" data-type="primary" disabled={loading ? true : false}>
                                {loading ? <LoadingOutlined className="mr-5" /> : null}登录
                            </button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="text-white">欢迎回来！</h1>
                                <p>请您先登录的个人信息，进行操作。</p>
                                <button className="ghost" data-type="primary" id="signIn" onClick={this.toggleClass}>登录</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="text-white">注册新账号！</h1>
                                <p>输入您的个人信息注册账号。</p>
                                <button className="ghost" data-type="primary" id="signUp" onClick={this.toggleClass}>注册</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);