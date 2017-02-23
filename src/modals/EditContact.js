import React from 'react';
import ReactModal from 'react-modal';

class EditContact extends React.Component {
    constructor (props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.state = {
            name: this.props.extras.name
        }
    }

    handleClose (e){
        let extras = this.props.extras;
        extras.name = this.state.name;
        this.props.handleEditContact(this.props.pub_key, extras);
    }

    handleCancel (e){
        this.props.handleEditContact(undefined, undefined);
    }

    handleNameChange (e){
        this.setState({name: e.target.value});
    }

    render (){
        return (
            <ReactModal isOpen={this.props.showModal}
                        contentLabel="Edit contact"
                        style={{
                            content: {
                                width: '35%',
                                height: '50%',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }
                        }}>
                <h2>Edit contact</h2>
                <div className="form-group">
                    <label>Contact name</label>
                    <input className="form-control" type="text" onChange={this.handleNameChange} value={this.state.name} />
                </div>
                <div className="well well-keys">{this.props.pub_key}</div>
                <button className="btn btn-success" onClick={this.handleClose}>Save contact</button>
                <button className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
            </ReactModal>
        );
    }
}

export default EditContact;
