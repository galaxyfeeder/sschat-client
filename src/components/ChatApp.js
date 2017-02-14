import React from 'react';
import './ChatApp.css';
import Conversation from './Conversation';
import Contacts from './Contacts';

class ChatApp extends React.Component {
    chooseConversation (){

    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Contacts/>
                    </div>
                    <div className="col-md-8">
                        <Conversation name="Miquel" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatApp;
