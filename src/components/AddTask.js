import React from 'react';
import TaskForm from './TaskForm';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import PhoneNumModal from './PhoneNumModal';
class AddTask extends React.Component {
    // state = {
    //     lowBalance: false
    // };
    // componentWillMount() {
    //     console.log(this.state.wallet);
    //     if (this.state.wallet < 5000) {
    //         this.setState(() => ({
    //             lowBalance: true
    //         }));
    //     }
    // }
    // redirectInModal = e => {
    //     e.preventDefault();
    //     history.push('/profile');
    // };

    render() {
        return (
            <div>
                <div className="content-container">
                    <div>
                        <h1>Add Task</h1>
                    </div>
                    <div>
                        <TaskForm />
                    </div>
                    {/* <PhoneNumModal
                        closeModal={this.redirectInModal}
                        addTaskState={this.state.lowBalance}
                    /> */}
                </div>
            </div>
        );
    }
}


export default connect()(AddTask);
