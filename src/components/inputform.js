
import React from 'react';
import {Button} from 'react-bootstrap';

export default class InputForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            employeeId: '',
            emailId: '',
            isRegistering: false,
            isFailedToRegister: false,
            errorMessage: ''
        };
    }

    handleEmployeeIdChange(e) {
        e.preventDefault();
        const employeeId = this.refs.emp_id.value;
        this.setState({employeeId: employeeId});
    }

    handleEmailChange(e) {
        e.preventDefault();
        const emailAdderss = this.refs.email.value;
        this.setState({emailId: emailAdderss});
    }

    handleRegisterButtonClick(e) {
        console.log('Register button clicked...');

        if (this.refs.emp_id.value == '' || this.refs.email.value == '') {
            return;
        }

        this.setState({
            isRegistering: true,
            isFailedToRegister: false,
        });

        let entryInfo = {employee : { emp_id: this.state.employeeId, email: this.state.emailId}};
        let serverURL = 'https://rideshare-survey.herokuapp.com/employees';

         fetch(serverURL, {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify(entryInfo)
            })
             .then(response => this.userRegisteredSuccessfully(response))
             .catch(error => {
                console.log('Error Encountered...');
                console.log(error);
            }
        )
    }

    userRegisteredSuccessfully(response) {
        console.log(response);

        this.updateStatesAndData(response);

        if (response.status == 201) {
            this.props.displayThankYouDialog();
        }
    }

    updateStatesAndData(response) {
        this.refs.emp_id.value = '';
        this.refs.email.value = '';

        this.setState({
            employeeId: '',
            emailId: '',
            isRegistering: false
        });

        this.setErrorMessageForResponse(response)
    }

    setErrorMessageForResponse(response) {
        if (response.status == 201) {
            this.setState({
                errorMessage: '',
                isFailedToRegister: false,
            });
        } else if (response.status == 422) {
            this.setState({
                errorMessage: 'Please provide valid inputs.',
                isFailedToRegister: true,
            });
        } else if (response.status == 404) {
            this.setState({
                errorMessage: 'Requesting resource not found.',
                isFailedToRegister: true,
            });
        } else  {
            this.setState({
                errorMessage: 'There was a problem registering with your data. Please try again.',
                isFailedToRegister: true,
            });
        }
    }

    render() {

        var employeeIdStyle = {
            width: 400,
            height: 40,
            marginRight: 50,
            marginTop:20,
            padding: 10,
            fontFamily: 'Palatino'
        };

        var emailTextInputStyle = {
            width: 400,
            height: 40,
            marginTop:20,
            marginRight: 50,
            padding: 10,
            fontFamily: 'Palatino'
        };

        var submitButtonStyle = {
            width: 400,
            height: 40,
            marginTop:20,
            marginRight: 50,
            fontWeight:'bold',
            fontFamily: 'Palatino'
        };

        var formTitleStyle = {
            width: 400,
            height: 40,
            marginRight: 50,
            fontSize: 19,
            color: 'white',
            fontWeight:'bold',
            fontFamily: 'Palatino'
        };

        var errorViewStyle = {
            width: 400,
            height: 40,
            marginRight: 50,
            marginTop: 20,
            fontSize: 19,
            color: 'red',
            fontWeight:'bold',
            fontFamily: 'Palatino'
        };

        let submitButtonTitle = this.state.isRegistering ? 'Please wait...' : 'Register';
        let errorMessage = this.state.errorMessage;
        let errorView = <div className="errorView pull-right" style={errorViewStyle} ><p> {errorMessage} </p> </div>;

        return (
            <div>
                <p className="inputTitle pull-right" style={formTitleStyle}>
                    Please register below to get our Ride sharing Mobile app.
                </p>
                <form className="commentForm pull-right">
                    <input style={employeeIdStyle}
                           type="text"
                           ref='emp_id'
                           placeholder="Employee Id"
                           onChange={this.handleEmployeeIdChange.bind(this)}
                    />
                    <br/>
                    <input style={emailTextInputStyle}
                           ref='email'
                           type="text"
                           placeholder="email@synerzip.com"
                           onChange={this.handleEmailChange.bind(this)}
                    />
                    <br/>
                    <Button style={submitButtonStyle}  onClick={(e)=>this.handleRegisterButtonClick(e)}  >
                        {submitButtonTitle}
                    </Button>
                </form>

                {errorView}

            </div>

        );
    }
}
