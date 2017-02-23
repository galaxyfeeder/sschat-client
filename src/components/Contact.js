import React from 'react';
import './Contact.css';
import EditContact from '../modals/EditContact';

class Contact extends React.Component {
    constructor (props) {
        super(props);
        this.onclick = this.onclick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onEditContact = this.onEditContact.bind(this);
        this.renderEditModal = this.renderEditModal.bind(this);
        this.state = {
            edit_contact_opened: false
        };
    }

    onclick (e){
        this.props.onclick(this.props.pub_key);
    }

    onEditClick (e){
        this.setState({edit_contact_opened: true});
    }

    onEditContact (pub_key, extras){
        this.setState({edit_contact_opened: false});
        this.props.onEditContact(pub_key, extras);
    }

    renderEditModal(){
        if(this.state.edit_contact_opened){
            return (
                <EditContact showModal={this.state.edit_contact_opened}
                             handleEditContact={this.onEditContact}
                             pub_key={this.props.pub_key}
                             extras={this.props.extras}/>
            );
        }
    }

    render (){
        return (
            <div className="row contact" onClick={this.onclick}>
                <div className="col-md-10">{this.props.extras.name}</div>
                <div className="col-md-2"><span className="fa fa-info-circle" onClick={this.onEditClick}></span></div>
                {this.renderEditModal()}
            </div>
        );
    }
}

export default Contact;
