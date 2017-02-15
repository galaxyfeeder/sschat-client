import React from 'react';
import './Contact.css';

class Contact extends React.Component {
    constructor (props) {
        super(props);
        this.onclick = this.onclick.bind(this);
        this.showkey = this.showkey.bind(this);
    }

    onclick (e){
        this.props.onclick(this.props.pub_key);
    }

    showkey (e){
        alert(this.props.pub_key);
    }

    render (){
        return (
            <div className="row contact" onClick={this.onclick}>
                <div className="col-md-10">{this.props.extras.name}</div>
                <div className="col-md-2"><span className="fa fa-info-circle" onClick={this.showkey}></span></div>
            </div>
        );
    }
}

export default Contact;
