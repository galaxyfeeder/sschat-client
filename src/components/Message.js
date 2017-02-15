import React from 'react';
import './Message.css';

class Message extends React.Component{
    render (){
        let alignclassname = 'message-'+this.props.message.align;

        return (
            <div className={'message '+alignclassname}>
                {this.props.message.message}
            </div>
        );
    }
}

export default Message;
