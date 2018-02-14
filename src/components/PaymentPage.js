import React from 'react';
import {axiosVerify} from "../lib/server"
class PaymentPage extends React.Component {
    componentWillMount(){
        const transId=this.props.match.params.transId;
        axiosVerify(transId,status);
    }
    render() {
        return (this.props.match.params.status=="1") ? (
            <div>
                <p>پرداخت موفق </p>
                <p> شماره تراکنش: {this.props.match.params.transId}</p>
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
