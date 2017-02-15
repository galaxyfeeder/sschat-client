import React from 'react';
import './ChatApp.css';
import Conversation from './Conversation';
import Contacts from './Contacts';

class ChatApp extends React.Component {
    constructor (props){
        super(props);
        this.changeConversation = this.changeConversation.bind(this);
    }

    changeConversation (contact){
        console.log(contact);
    }

    render(){
        let contacts = [
            {name: "Maria", pub_key: 'aslkdmsakmdmasdklmds'},
            {name: "Miquel", pub_key: 'aslkdmsakmdma535654sdf485sdklmds'},
            {name: "Marti", pub_key: 'aslkdmsak524sdmdmasdklmds'}
        ]

        return (
            <div className="container">
                <div className="panel panel-info panel-main">
                    <div className="panel-heading">
                        <div className="panel-title">Simple Secure Chat</div>
                    </div>
                    <div className="panel-body">
                        <div className="row full-height">
                            <div className="col-md-4 panel-contacts">
                                <Contacts onclickcontact={this.changeConversation} contacts={contacts}/>
                            </div>
                            <div className="col-md-8 panel-conversation">
                                <Conversation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatApp;
