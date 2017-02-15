import React from 'react';
import './ChatApp.css';
import PanelChat from './panels/PanelChat';
import PanelEndRegister from './panels/PanelEndRegister';
import PanelLogin from './panels/PanelLogin';

class ChatApp extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            status: 1,
            user_pub_key: "askjbdsajbkdjkbasdjknadsnjjsnsds public",
            user_priv_key: "asjuhdjasjkdsajkbd private"
        };
    }

    render(){
        switch (this.state.status) {
            case 0:
                // home status
                return (<PanelLogin />);
            case 1:
                // registering user
                return (<PanelEndRegister pub_key={this.state.user_pub_key} priv_key={this.state.user_priv_key} />);
            case 2:
                // chatting time
                return (<PanelChat pub_key={this.state.user_pub_key} priv_key={this.state.user_priv_key} />);
            default:
                // home status
                return (<PanelLogin />);
        }
    }
}

export default ChatApp;
