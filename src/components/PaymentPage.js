import React from 'react';
import {axiosVerify} from "../lib/server"
import {history} from '../routers/AppRouter';
class PaymentPage extends React.Component {
    componentWillMount(){
        const transId=this.props.match.params.transId;
        axiosVerify(transId,status);
    }
    onClick=e =>{
        e.preventDefault();
        const transId=this.props.match.params.transId;        
        history.push(`/create`);
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
            </div>
        );
    }
}

export default PaymentPage;
