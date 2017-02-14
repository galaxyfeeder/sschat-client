import React from 'react';
import './Contact.css';

class Contact extends React.Component {
    render (){
        return (
            <div className="row contact">
                <div className="col-md-10">{this.props.name}</div>
                <div className="col-md-2"><span className="fa fa-info-circle"></span></div>
            </div>
        );
    }
}

export default Contact;
