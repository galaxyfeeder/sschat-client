import React from 'react';
import Conversation from '../components/Conversation';
import Contacts from '../components/Contacts';
import './PanelChat.css';
import io from 'socket.io-client';
import AddContact from '../modals/AddContact';

class PanelChat extends React.Component {
    constructor (props){
        super(props);
        this.changeConversation = this.changeConversation.bind(this);
        this.sendmessage = this.sendmessage.bind(this);
        this.addnewcontact = this.addnewcontact.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state = {
            conversations: {},
            contacts: {
                'aslkdmsakmdmasdklmds': {name: 'Maria'},
                'aslkdmsakmdma535654sdf485sdklmds': {name: 'Miquel'},
                'aslkdmsak524sdmdmasdklmds': {name: 'Marti'}
            },
            selected_contact: undefined,
            add_contact: false
        };
        this.socket = io('http://localhost:4000');
        this.socket.on('contacts', data => {
            let contacts = {};
            for(let contact of data){
                contacts[contact.pub_key] = {name: contact.name};
            }
            this.setState({contacts: contacts});
        });
        this.socket.on('info', data => {
            console.log(data);
        });
    }

    componentDidMount (){
        this.socket.emit('register', JSON.stringify({pub_key: this.props.pub_key}));
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

    addnewcontact (pub_key, name){
        this.setState({add_contact: false});
        if(pub_key !== undefined && name !== undefined){
            console.log(pub_key);
            console.log(name);
        }
    }

    openModal(e){
        this.setState({add_contact: true});
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
                                <AddContact showModal={this.state.add_contact}
                                            handleAddContact={this.addnewcontact}/>
                                <button className="btn btn-primary" onClick={this.openModal}>Add new contact</button>
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
