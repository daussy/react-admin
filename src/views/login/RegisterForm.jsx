import React,{Component} from 'react';
import './index.scss';


//ANTD
import { Form, Input, Button, Checkbox ,Row,Col} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//验证
import {validate_password} from '../../utils/validate'


export default class RegisterForm extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    /**
     * 提交注册
     * @param {*} values 
     */
    onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

    /**
     * 切换登录/注册
     */
    toggleForm =() =>{
        this.props.onClick('login')
    }

    render(){
        return(
            <div>
            <div className = 'form-header'>
                <h4 className = 'column'>注册</h4>
                <span onClick = {this.toggleForm}>登录</span>

             
            </div>
            <div className = 'form-content'>
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                >

                           
                <Form.Item
                    name="userName"
                    rules={[
                    {
                        required: true,
                        message: '请输入账号！',
                    },
                    ]}
                >
                    <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="userName"
                    placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                    {
                        pattern:validate_password,  //正则，只匹配数字+字母  8-18位
                        message: '请8-18位含数字、字母的密码！',
                    },
                 
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[
                    {
                        required: true,
                        message: '请再次输入密码！',
                    },
                    //自定义验证
                    ({getFieldValue})=>({ //ES6解构  把(context) 中的方法全部解构出来，使用时用花括号包裹，{getFieldError}
                    //getFieldValue('password') 打印出输入的内容
                        validator(rule,value){
                            // console.log(context)
                            // if(value.length < 8){
                            //     return Promise.reject('不能小于8位')
                            // }
                            // if(value.length > 18){
                            //     return Promise.reject('不能大于18位')
                            // }
                            if(!value||getFieldValue('password')===value){
                                //如果password == confirmPassword  
                                return Promise.resolve();//验证通过
                                //Promise返回值，自定义验证一定要Promise返回值
                            }
                            return Promise.reject('两次密码不匹配！');
                        }
                    }),
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="再次验证密码"
                    />
                </Form.Item>

                
            

                <Form.Item
                    name="Code"
                    rules={[
                    {
                        required: true,
                        message: '请输入验证码！',
                    },
                    {
                        len: 6,
                        message: '请输入长度为6位的验证码！',
                    },
                    ]}
                >
                    <Row gutter = {[16]}>
                    <Col span={15} >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="Code"
                        placeholder="验证码"
                        />
                    </Col>
                    <Col span = {6}>
                        <Button  type="primary" danger>获取验证码</Button>
                    </Col>

                </Row>
                    
                </Form.Item>
                

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                    完成注册
                    </Button>
                    
                </Form.Item>
                </Form>
            </div>
        </div>
   
        );

    }
}