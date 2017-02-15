import React from 'react';
import Contact from './Contact';

class Contacts extends React.Component {
    constructor (props){
        super(props);
        this.onclickcontact = this.onclickcontact.bind(this);
    }

    onclickcontact (contact){
        this.props.onclickcontact(contact);
    }

    render (){
        let contacts = [];

        for(let c of this.props.contacts){
            contacts.push((<Contact contact={c} onclick={this.onclickcontact} />))
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
