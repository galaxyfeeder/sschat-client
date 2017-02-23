import React from 'react';
import Contact from './Contact';

class Contacts extends React.Component {

    render (){
        let contacts = [];

        for(let c in this.props.contacts){
            if(this.props.contacts.hasOwnProperty(c)){
                contacts.push((<Contact extras={this.props.contacts[c]}
                                        pub_key={c}
                                        onclick={this.props.onclickcontact}
                                        onEditContact={this.props.onEditContact} />));
            }
        }

        return (
            <div>
                {contacts}
            </div>
        );
    }
}

export default Contacts;
