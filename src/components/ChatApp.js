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
        return (
            <div className="container">
                <div className="panel panel-info panel-main">
                    <div className="panel-heading">
                        <div clasName="panel-title">Simple Secure Chat</div>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-4 panel-contacts">
                                <Contacts onclickcontact={this.changeConversation}/>
                            </div>
                            <div className="col-md-8 panel-conversation">
                                <Conversation name="Miquel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatApp;
