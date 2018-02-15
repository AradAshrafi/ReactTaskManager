import React from "react";
import { connect } from 'react-redux';
import PurchaseTasksListItem from "./PurchaseTasksListItem";
import {axiosPayment} from "../lib/server";

class FactorPage extends React.Component {
    state={
        totalCost:0,
        modalStatus:false
    }
    componentWillMount(){

    }
    onBankAcc=()=>{
        axiosPayment()
    }
    onWallet=()=>{

    }
    closeModal=()=>{
        this.setState(()=>({
            modalStatus:true
        }))
    }
    render(){
        return(
            <div>
                <div>
                    {this.props.tasks.map(val=>{
                        this.setState((prevState)=>({
                            totalCost:prevState.totalCost+val.amount
                        }))
                        return (<PurchaseTasksListItem {...val} />)
                    })}
                    <div>
                        <p>Total costs :{this.state.totalCost}</p> 
                    </div>
                </div>
                <div>  
                    <h3>Payment method</h3>
                    <button onClick={this.closeModal}>Use Bank Account</button>
                    <button onClick={this.onWallet}>Use Wallet</button>
                </div>
                <Modal
                isOpen={!!this.state.modalStatus}
                onRequestClose={this.onBankAcc}
                contentLabel="PhoneNum"
                closeTimeoutMS={200}
                className="modal"
                >

                    
                </Modal>
            </div>
        );
    }
}

const mapStateToProps =(state)=>({
    tasks:state.tasks
})
export default connect (mapStateToProps)(FactorPage);