import React,{Component} from 'react';
import './index.scss';

//ANTD
import { Form, Input, Button, Checkbox ,Row,Col} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//组件
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            formType:'login', //表单类型 用于判断这个表单是否显示

        }
    }


    toggleForm =(value)=>{
        this.setState({
            formType:value,
        })
    }

    render(){
        // console.log('this.state.formType',this.state.formType)
        return(
            <div className = 'form-wrap'>
                {this.state.formType ==='login'? <LoginForm onClick = {this.toggleForm}></LoginForm>:  <RegisterForm onClick = {this.toggleForm}></RegisterForm>} 
                {/* 三元运算，formType ==login 渲染login窗口，否则渲染registerForm 窗口 */}
               
              
           </div>
        );
    }
}