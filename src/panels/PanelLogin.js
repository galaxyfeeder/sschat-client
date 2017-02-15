import React from 'react';
import './PanelLogin.css';

class PanelLogin extends React.Component {
    constructor (props){
        super(props);
        this.startchatting = this.startchatting.bind(this);
        this.handlepublickey = this.handlepublickey.bind(this);
        this.handleprivatekey = this.handleprivatekey.bind(this);
        this.state = {
            pub_key: undefined,
            priv_key: undefined
        };
    }

    startchatting(e){
        if(this.state.pub_key !== undefined && this.state.priv_key !== undefined){
            this.props.startchatting(this.state.pub_key, this.state.priv_key);
        }
    }

    handlepublickey (e){
        const fileToRead = e.target.files[0];
        let reader = new FileReader();
        reader.readAsBinaryString(fileToRead);
        reader.onload = (event) => {
            this.setState({pub_key: event.target.result});
        };
        reader.onerror = (event) => {};
    }

    handleprivatekey(e){
        const fileToRead = e.target.files[0];
        let reader = new FileReader();
        reader.readAsBinaryString(fileToRead);
        reader.onload = (event) => {
            this.setState({priv_key: event.target.result});
        };
        reader.onerror = (event) => {};
    }

    render (){
        return (
            <div className="container container-login">
                <div className="panel panel-info panel-main">
                    <div className="panel-heading">
                        <div className="panel-title">Login</div>
                    </div>
                    <div className="panel-body">
                        <div className="row full-height">
                            <div className="col-md-6 panel-login">
                                <h2>Login</h2>
                                <div className="input-file-container">
                                    <label>Public key</label>
                                    <input type="file" onChange={this.handlepublickey}></input>
                                </div>
                                <div className="input-file-container">
                                    <label>Private key</label>
                                    <input type="file" onChange={this.handleprivatekey}></input>
                                </div>
                                <div className="input-file-container">
                                    <button className="btn btn-primary" onClick={this.startchatting}>Login with these keys.</button>
                                </div>
                            </div>
                            <div className="col-md-6 panel-register">
                                <h2>Register</h2>
                                <p>Is your first time? Go ahead and create some unique keys for you.</p>
                                <button className="btn btn-success" onClick={this.props.createnewkeys}>Create new keys.</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PanelLogin;
