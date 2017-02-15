import React from 'react';

class Message extends React.Component{
    render (){
        return (
            <div className="message mesage-{this.props.align}">
                {this.props.message.message}
            </div>
        );
    }
}

export default Message;
