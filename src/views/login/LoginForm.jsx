import React,{Component} from 'react';
import './index.scss';


//ANTD
import { Form, Input, Button, Checkbox ,Row,Col,message} from 'antd';
import { UserOutlined, LockOutlined,PoweroffOutlined } from '@ant-design/icons';

//验证
import {validate_password,validate_email} from '../../utils/validate'

//API
import {Login,GetCode} from '../../api/account'
import { getKeyThenIncreaseKey } from 'antd/lib/message';


export default class LoginForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            username:"",
            code_button_disabled:true , //true表示禁用  false表示启用
            code_button_loading:false, //true表示正在加载，false表示正常状态 
            code_button_text:'获取验证码',

        }
        //react没有数据双向绑定的概念
    }

    /**
     * 提交登录
     * @param {} values 
     */
    onFinish = (values) => {
        //验证通过才会执行
        
        //调用axios
        Login().then(response =>{ //resolves
            console.log('response',response)

        }).catch(error=>{  //reject
            console.log('失败')
        })
        console.log('Received values of form: ', values);
      };

    /**
     * 切换登录/注册
     */
    toggleForm =() =>{
        this.props.onClick('register')
    }

    /**
     * 获取登录验证码
     */
    getCode = ()=>{
        this.setState({
            code_button_loading:true,
            code_button_text:"发送中.."
        })
        if(!this.state.username){
            // console.log('123')
            message.warning('用户名不能为空！',1)
            
            return false
        }
        const data = {
            username:this.state.username,
            module:"login"
        }
        GetCode(data).then(resposne =>{
            //执行倒计时函数
            this.countDown()
            // console.log(resposne)
            
        }).catch(error =>{
            this.setState({
                code_button_text:"重新发送",
                code_button_loading:false,
            })
            console.log(error)
        })

    }
    /**
     * 用户名输入
     */
    usernameChange =e =>{
        // console.log('e',e.target.value)
        let value = e.target.value
        this.setState({
            username:value
        })
    }
    /**
     * 倒计时函数
     */
    countDown = ()=>{
        let sec = 60
        this.setState({
            code_button_loading:false,
            code_button_disabled:true,
            code_button_text:`${sec}s`
        })

        //定时器
        let timer = null;
        timer = setInterval(()=>{
            sec--
            if(sec <=0){
                this.setState({
                    code_button_disabled:false,
                    code_button_text:"重新获取"
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_button_text:`${sec}s`
            })
        },1000)

    }

    render(){
        //定义this的指向
        const _this = this;
        const {code_button_loading,code_button_disabled,code_button_text} = this.state
        return(
            <div>
            <div className = 'form-header'>
                <h4 className = 'column'>登录</h4>
                <span onClick = {this.toggleForm}>注册</span>
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
                    ({getFieldValue}) =>({
                        validator(rule,value){
                            if(validate_email(value)){
                                //正则验证通过，返回true
                                _this.setState({
                                    code_button_disabled:false, //启用验证码按钮
                                })
                                return Promise.resolve();
                            }
                            _this.setState({
                                code_button_disabled:true, //禁用验证码按钮
                            })
                            return Promise.reject('邮箱格式不正确！')
                        }
                    })
                    ]}
                >
                    <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="userName"
                    placeholder="用户名"
                    value = {this.state.username}
                    onChange = {this.usernameChange}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                 
                    // {
                    //     min: 8,
                    //     message: '密码不少于8位！',
                    // },
                    // {
                    //     max: 18,
                    //     message: '密码不多于18位！',
                    // },
                    // {
                    //     pattern: /^[0-9]*$/,  //正则，只匹配数字
                    //     message: '请输入数字！',
                    // },
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
                    <Row gutter = {[5]}>
                    <Col span={14} >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="Code"
                        placeholder="验证码"
                        />
                    </Col>
                    <Col span = {10}>
                        <Button  type="primary" danger onClick = {this.getCode} block
                            disabled = {code_button_disabled}
                            loading = {code_button_loading}
                            icon = {<PoweroffOutlined></PoweroffOutlined>}
                        >{code_button_text}</Button>
                    </Col>

                </Row>
                    
                </Form.Item>
                

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block>
                    登录
                    </Button>
                    
                </Form.Item>
                </Form>
            </div>
        </div>
   
        );

    }
}