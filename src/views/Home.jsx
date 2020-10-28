import React,{Component,Fragment} from 'react'
import './Home.scss'
import {Button} from 'antd'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){

        return (
            <Fragment >Home
            <Button type = 'primary'>123</Button>
            <ul>
                <li>111</li>
                <li>222</li>

                </ul>
            </Fragment>
                
        )
    }
}