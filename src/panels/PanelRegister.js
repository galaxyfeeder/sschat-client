import React from 'react';
import './PanelRegister.css';
import rsa from 'node-rsa';

class PanelRegister extends React.Component {
    constructor (props){
        super(props);
        this.startchatting = this.startchatting.bind(this);
        this.savetodocument = this.savetodocument.bind(this);
        this.saveprivatekey = this.saveprivatekey.bind(this);
        this.savepublickey = this.savepublickey.bind(this);
        this.state = {
            pub_key: undefined,
            priv_key: undefined
        };
    }

    componentDidMount (){
        let key = new rsa({b: 2048});
        this.setState({
            pub_key: key.exportKey('pkcs1-public-pem'),
            priv_key: key.exportKey('pkcs1-private-pem')
        });
    }

    startchatting(){
        if(this.state.pub_key !== undefined && this.state.priv_key !== undefined){
            this.props.startchatting(this.state.pub_key, this.state.priv_key);
        }
    }

    savetodocument (data, name){
        let file = new Blob([data], {type : 'octet/stream'});
        const url = URL.createObjectURL(file);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
    }

    savepublickey (e){
        this.savetodocument(this.state.pub_key, 'rsa-key.pub');
    }

    saveprivatekey (e){
        this.savetodocument(this.state.priv_key, 'rsa-key');
    }

    render (){
        return (
            <div className="container container-login">
                <div className="panel panel-info panel-main">
                    <div className="panel-heading">
                        <div className="panel-title">These are your keys!</div>
                    </div>
                    <div className="panel-body">
                        <div className="row full-height">
                            <div className="col-md-6 panel-public">
                                <h2>Public key</h2>
                                <p>This is your public key. Send this key to your friends to be able to be contacted. This key is used to encryp all your messages.</p>
                                <div className="well well-keys">{this.state.pub_key}</div>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={this.savepublickey}>Save this key!</button>
                                </div>
                            </div>
                            <div className="col-md-6 panel-private">
                                <h2>Private key</h2>
                                <p>This is your private key. Save this key as your last thing in your life. If you share it anyone will be able to read your messages.</p>
                                <div className="well well-keys">{this.state.priv_key}</div>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={this.saveprivatekey}>Save this key!</button>
                                </div>
                            </div>
                            <div className="col-md-12 text-center">
                                <button className="btn btn-success" onClick={this.startchatting}>Start chatting with these keys!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PanelRegister;
