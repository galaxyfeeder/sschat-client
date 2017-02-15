import React from 'react';
import './Contact.css';

class Contact extends React.Component {
    constructor (props) {
        super(props);
        this.onclick = this.onclick.bind(this);
    }

    onclick (e){
        this.props.onclick(this.props.contact);
    }

    render (){
        return (
            <div className="row contact" onClick={this.onclick}>
                <div className="col-md-10">{this.props.contact.name}</div>
                <div className="col-md-2"><span className="fa fa-info-circle"></span></div>
            </div>
        );
    }
}

export default Contact;
