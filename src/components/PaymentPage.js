import React from 'react';
import {axiosVerify , axiosServerPaymentUpdate , axiosAddTask} from "../lib/server"
import {history} from '../routers/AppRouter';
import { connect } from 'react-redux';
class PaymentPage extends React.Component {
    componentWillMount(){
        const state = this.props.match.params.state;
        const transId=this.props.match.params.transId;
        const status=this.props.match.params.status; 
        const userId= this.props.userId;
        console.log('cheeeck   ' ,userId,status);
        if (status=="1") { //satus ra b onvane string b ma barmigardanad
            console.log(typeof(transId)); 
            axiosVerify(state,userId,transId);
        }
        
    }
    onClick=e =>{
        e.preventDefault();
        console.log(this.props.match.params.state.substring(0,3));
        if(this.props.match.params.state.substring(0,3)=="add"){
        axiosAddTask(JSON.parse(localStorage.getItem('addTask'))); ////in bayad bere bala chon bere birun etelaat mipare dg !!            
        }else{
            history.push('/profile'); /// bayad bere profile
        }
        
    }
    onReturnClick =(e)=>{
        e.preventDefault();
        history.push("/profile");        
    }
    render() {
        return (this.props.match.params.status=="1") ? (
            <div>
                <p>پرداخت موفق </p>
                <p> شماره تراکنش: {this.props.match.params.transId}</p>
                <button onClick={this.onClick}> تایید تراکنش</button>
            </div>
        ) : (
            <div>
            <p>پرداخت ناموفق</p>
            <p>شماره تراکنش : {this.props.match.params.transId}</p>
            <button onClick={this.onReturnClick}> بازگشت به صفحه پروفایل </button>            
            </div>
        );
    }
}

const mapStateToProps =(state)=>({
    userId:state.auth.userId
})
export default connect (mapStateToProps)(PaymentPage);
