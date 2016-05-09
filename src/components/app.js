import React from 'react';
import InputForm from './inputform';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayDialog: false,
            showInputForm: true
        }
    }

    hideModal() {
        console.log('hideModal  called...');
        this.setState({showInputForm: false});
        this.setState({displayDialog: false});
    }

    render() {
        var thankYouDialogFunc = this.displayThankYouDialog.bind(this);

        var mainDivStyle = {
            marginLeft: 50
        };

        var leftContainerStyle =  {
            marginTop: 20,
            marginLeft: 0,
            color: 'white',
            fontFamily: 'Palatino'
        };

        var bulletsStyle =  {
            color: 'white',
            fontSize: 24
        };

        var synLogoStyle =  {
            width: 400,
            height: 50,
            marginBottom: 50
        };

        const modalInstance = (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header >
                        <Modal.Title className="dialog-title"> Thank you !!!</Modal.Title>
                    </Modal.Header>

                    <img className="dialog-car" src='greenCar.jpg'/>

                    <Modal.Body className="dialog-description">
                        Your Green Ride Mobile App Is On The Way.. Stay Tuned..
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal.bind(this)}>OK</Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        );

        var dialog = this.state.displayDialog ? modalInstance : <div/>;

        const inputFormDiv = <div className="col-md-6" style={{marginTop: 40}}>
            <InputForm displayThankYouDialog = {thankYouDialogFunc}/>
        </div>;

        var inputForm = this.state.showInputForm ? inputFormDiv : <div/>;
        return(
            
            <div style={mainDivStyle}>
                <div className="row">
                    <div className="col-md-6" style={leftContainerStyle} >
                        <h1> Share Ride to Go Green ! </h1>
                        <ul id="ullist" style={bulletsStyle}>
                            <li>Earn Green points</li>
                            <li>Help the world by reducing pollution and traffic congestion</li>
                            <li>Reduce daily commute cost</li>
                            <li>Have comfortable ride to Office/Home</li>
                        </ul>
                    </div>
                    {inputForm}
                </div>
                {dialog}
                <div className="footer navbar-fixed-bottom inverse-menu">
                    <h1 style={{fontSize: 14, marginLeft: 50}}>Powered By :</h1>
                    <img className="logo" src='synLogo.png'/>
                </div>
        </div>
    );
    }

    displayThankYouDialog() {
        console.log('displayThankYouDialog  called...');

        this.setState({
            displayDialog: true
        });
    }


}
