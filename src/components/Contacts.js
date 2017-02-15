import React from 'react';
import Contact from './Contact';

class Contacts extends React.Component {
    constructor (props){
        super(props);
        this.onclickcontact = this.onclickcontact.bind(this);
    }

    onclickcontact (pub_key){
        this.props.onclickcontact(pub_key);
    }

    render (){
        let contacts = [];

        for(let c in this.props.contacts){
            if(this.props.contacts.hasOwnProperty(c)){
                contacts.push((<Contact extras={this.props.contacts[c]} pub_key={c} onclick={this.onclickcontact} />))
            }
        }

        return (
            <div>
                <h2>Contacts</h2>
                {contacts}
            </div>
        );
    }
}

export default Contacts;
