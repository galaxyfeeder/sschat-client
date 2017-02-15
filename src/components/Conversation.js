import React from 'react';

class Conversation extends React.Component {
    addmessage (){

    }

    render (){
        return (
            <div>
                <h2>{this.props.name}</h2>
                <div className="conversation-container">
                </div>
                <input>
                </input>
            </div>
        );
    }
}

export default Conversation;
