import React from 'react';

class PaymentPage extends React.Component {
    render() {
        console.log(this.props.match.params);
        return this.props.match.params.status ? (
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
