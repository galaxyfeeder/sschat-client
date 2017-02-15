import React from 'react';
import Message from './Message';
import './Conversation.css';

class Conversation extends React.Component {
    constructor (props){
        super(props);

        this.sendmessage = this.sendmessage.bind(this);
        this.updatetypedmessage = this.updatetypedmessage.bind(this);
        this.handlekeypress = this.handlekeypress.bind(this);

        this.state = {
            typed_message: ''
        };
    }

    updatetypedmessage(e){
        this.setState({typed_message: e.target.value});
    }

    handlekeypress(e){
        if(e.charCode === 13){
            this.sendmessage(e);
        }
    }

    sendmessage(e){
        this.props.sendmessage(this.state.typed_message, this.props.pub_key);
    }

    render (){
        let messages = [];

        for(let message of this.props.messages){
            messages.push(<Message message={message} />);
        }

        return (
            <div className="full-height">
                <h2>{this.props.extras.name}</h2>
                <div className="conversation-container">
                    {messages}
                </div>
                <div className="input-group send-group">
                    <input type="text" className="form-control" placeholder="Type a message..." onChange={this.updatetypedmessage}  onKeyPress={this.handlekeypress} value={this.state.typed_message} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.sendmessage}>Send!</button>
                    </span>
                </div>
            </div>
        );
    }
}

export default Conversation;
