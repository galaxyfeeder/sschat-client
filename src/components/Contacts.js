import React from 'react';
import Contact from './Contact';

class Contacts extends React.Component {
    render (){
        let contacts = [
            <Contact name="Maria" />,
            <Contact name="Miquel" />,
            <Contact name="Marti" />
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
