import React from 'react';
import Conversation from '../components/Conversation';
import Contacts from '../components/Contacts';
import './PanelChat.css';
import io from 'socket.io-client';

/*
http://stackoverflow.com/questions/34480703/implementing-socket-io-with-reactjs-es6
let socket = io('http://localhost:4000');
socket.on('keys', data => {
    if(data.includes('PUBLIC')){
        this.setState({
            pub_key: data
        });
    }else{
        this.setState({
            priv_key: data
        });
    }
    console.log(data);
});
socket.emit('create keys', '');*/

class PanelChat extends React.Component {
    constructor (props){
        super(props);
        this.changeConversation = this.changeConversation.bind(this);
        this.sendmessage = this.sendmessage.bind(this);
        this.state = {
            conversations: {
                'aslkdmsakmdmasdklmds': [{message: 'This is the first test message.', align: 'left'}, {message: 'This is a second test message of Maria.', align: 'left'}],
                'aslkdmsakmdma535654sdf485sdklmds': [],
                'aslkdmsak524sdmdmasdklmds': []
            },
            contacts: {
                'aslkdmsakmdmasdklmds': {name: 'Maria'},
                'aslkdmsakmdma535654sdf485sdklmds': {name: 'Miquel'},
                'aslkdmsak524sdmdmasdklmds': {name: 'Marti'}
            },
            selected_contact: undefined
        };
    }

    changeConversation (contact){
        this.setState({selected_contact: contact});
    }

    sendmessage (message, pub_key){
        // do it once received server callback
        let messages = this.state.conversations[pub_key];
        messages.push({message: message, align: 'right'});
        let conversations = this.state.conversations;
        conversations[pub_key] = messages;
        this.setState({
            conversations: conversations
        });
    }

    renderConversation(){
        if(this.state.selected_contact !== undefined){
            return (
                <Conversation messages={this.state.conversations[this.state.selected_contact]}
                              extras={this.state.contacts[this.state.selected_contact]}
                              pub_key={this.state.selected_contact}
                              sendmessage={this.sendmessage}/>
            );
        }else{
            return (<p>Select a contact to begin </p>)
        }
    }

    render (){
        return (
            <div className="container">
                <div className="panel panel-info panel-main">
                    <div className="panel-heading">
                        <div className="panel-title">Simple Secure Chat</div>
                    </div>
                    <div className="panel-body">
                        <div className="row full-height">
                            <div className="col-md-4 panel-contacts">
                                <Contacts onclickcontact={this.changeConversation} contacts={this.state.contacts}/>
                            </div>
                            <div className="col-md-8 panel-conversation">
                                {this.renderConversation()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PanelChat;
