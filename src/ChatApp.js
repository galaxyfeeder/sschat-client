import React from 'react';
import './ChatApp.css';
import PanelChat from './panels/PanelChat';
import PanelRegister from './panels/PanelRegister';
import PanelLogin from './panels/PanelLogin';

class ChatApp extends React.Component {
    constructor (props){
        super(props);
        this.startchatting = this.startchatting.bind(this);
        this.createnewkeys = this.createnewkeys.bind(this);
        this.state = {
            status: 0,
            user_pub_key: undefined,
            user_priv_key: undefined
        };
    }

    startchatting(pub_key, priv_key){
        this.setState({
            status: 2,
            user_pub_key: pub_key,
            user_priv_key: priv_key
        });
    }

    createnewkeys(e){
        this.setState({
            status: 1
        });
    }

    render(){
        switch (this.state.status) {
            case 0:
                // home status
                return (<PanelLogin startchatting={this.startchatting} createnewkeys={this.createnewkeys} />);
            case 1:
                // registering user
                return (<PanelRegister startchatting={this.startchatting} />);
            case 2:
                // chatting time
                return (<PanelChat pub_key={this.state.user_pub_key} priv_key={this.state.user_priv_key} />);
            default:
                // home status
                return (<PanelLogin startchatting={this.startchatting} createnewkeys={this.createnewkeys} />);
        }
    }
}

export default ChatApp;
