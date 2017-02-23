import React from 'react';
import Conversation from '../components/Conversation';
import Contacts from '../components/Contacts';
import AddContact from '../modals/AddContact';

import io from 'socket.io-client';
import rsa from 'node-rsa';

import './PanelChat.css';

class PanelChat extends React.Component {
    constructor (props){
        super(props);
        this.handleChangeConversation = this.handleChangeConversation.bind(this);
        this.handleAddContactClick = this.handleAddContactClick.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.addContact = this.addContact.bind(this);
        this.editContact = this.editContact.bind(this);
        this.onContactsReceived = this.onContactsReceived.bind(this);
        this.onInformationReceived = this.onInformationReceived.bind(this);
        this.onConversationsReceived = this.onConversationsReceived.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.state = {
            conversations: {},
            contacts: {},
            selected_contact: undefined,
            add_contact: false
        };
        this.key = new rsa(this.props.priv_key);
        this.socket = io('http://localhost:4000');
        this.socket.on('contacts', this.onContactsReceived);
        this.socket.on('info', this.onInformationReceived);
        this.socket.on('conversations', this.onConversationsReceived);
        this.socket.on('message', this.onMessageReceived);
    }

    // React component lifecycle
    componentDidMount (){
        this.socket.emit('register', JSON.stringify({pub_key: this.props.pub_key}));
    }

    // incoming socket communications
    onInformationReceived (data){
        console.log(data);
        if(data === 'Correctly registered.'){
            this.socket.emit('get contacts', '');
            this.socket.emit('get conversations', '');
        }
    }

    onMessageReceived (data){
        let decrypted = this.key.decrypt(data.message, 'utf8');
        if(data.to === this.props.pub_key){
            let messages = this.state.conversations[data.sender];
            messages.push({message: decrypted, align: 'left'});
            let conversations = this.state.conversations;
            conversations[data.sender] = messages;
            this.setState({
                conversations: conversations
            });
        }else{
            let messages = this.state.conversations[data.to];
            messages.push({message: decrypted, align: 'right'});
            let conversations = this.state.conversations;
            conversations[data.to] = messages;
            this.setState({
                conversations: conversations
            });
        }
    }

    onConversationsReceived (data){
        let conversations = {};
        for(let conversation in data){
            if(data.hasOwnProperty(conversation)){
                let messages = [];
                for(let message of data[conversation]){
                    let decrypted = this.key.decrypt(message.message, 'utf8');
                    if(message.to === this.props.pub_key){
                        messages.push({message: decrypted, align: 'left'});
                    }else{
                        messages.push({message: decrypted, align: 'right'});
                    }
                }
                conversations[conversation] = messages;
            }
        }
        this.setState({conversations: conversations});
    }

    onContactsReceived (data){
        let contacts = {};
        for(let contact of data){
            contacts[contact.pub_key] = {name: contact.name};
        }
        this.setState({contacts: contacts});
    }

    // outgoing socket communications
    sendMessage (message, pub_key){
        let key = new rsa(pub_key);
        this.socket.emit('message', JSON.stringify({message: key.encrypt(message, 'base64'), to: pub_key, encrypt: pub_key}));
        this.socket.emit('message', JSON.stringify({message: this.key.encrypt(message, 'base64'), to: pub_key, encrypt: this.props.pub_key}));
    }

    addContact (pub_key, name){
        this.setState({add_contact: false});
        if(pub_key !== undefined && name !== undefined){
            this.socket.emit('add contact', JSON.stringify({pub_key: pub_key, name: name}));
        }
    }

    editContact (pub_key, extras){
        if(pub_key !== undefined && extras !== undefined){
            this.socket.emit('edit contact', JSON.stringify({pub_key: pub_key, name: extras.name}));
        }
    }

    // visual handlers
    handleChangeConversation (contact){
        this.setState({selected_contact: contact});
    }

    handleAddContactClick(e){
        this.setState({add_contact: true});
    }

    // render methods
    renderConversation (){
        if(this.state.selected_contact !== undefined){
            return (
                <Conversation messages={this.state.conversations[this.state.selected_contact]}
                              extras={this.state.contacts[this.state.selected_contact]}
                              pub_key={this.state.selected_contact}
                              sendmessage={this.sendMessage}/>
            );
        }else{
            return (
                <div className="panel-nothing">
                    Select a contact to begin.
                </div>
            );
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
                                <Contacts onclickcontact={this.handleChangeConversation}
                                          contacts={this.state.contacts}
                                          onEditContact={this.editContact}/>
                                <AddContact showModal={this.state.add_contact}
                                            handleAddContact={this.addNewContact}/>
                                <button className="btn btn-primary" onClick={this.handleAddContactClick}>Add new contact</button>
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
