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
        let contacts = [
            <Contact contact={{name: "Maria", pub_key: 'aslkdmsakmdmasdklmds'}} onclick={this.onclickcontact}/>,
            <Contact contact={{name: "Miquel", pub_key: 'aslkdmsakmdma535654sdf485sdklmds'}} onclick={this.onclickcontact}/>,
            <Contact contact={{name: "Marti", pub_key: 'aslkdmsak524sdmdmasdklmds'}}  onclick={this.onclickcontact}/>
        ];

        return (
            <div>
                <h2>Contacts</h2>
                {contacts}
            </div>
        );
    }
}

export default Contacts;
