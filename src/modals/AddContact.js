import React from 'react';
import ReactModal from 'react-modal';

class AddContact extends React.Component {
    constructor (props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.state = {
            pub_key: undefined,
            name: undefined
        }
    }

    handleClose (e){
        this.props.handleAddContact(this.state.pub_key, this.state.name);
    }

    handleFileChange (e){
        const fileToRead = e.target.files[0];
        let reader = new FileReader();
        reader.readAsBinaryString(fileToRead);
        reader.onload = (event) => {
            this.setState({pub_key: event.target.result});
        };
        reader.onerror = (event) => {};
    }

    handleTextChange (e){
        this.setState({pub_key: e.target.value});
    }

    handleNameChange (e){
        this.setState({name: e.target.value});
    }

    render (){
        return (
            <ReactModal isOpen={this.props.showModal}
                        contentLabel="Add new contact"
                        style={{
                            content: {
                                width: '35%',
                                height: '50%',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }
                        }}>
                <h2>Add new contact</h2>
                <div className="form-group">
                    <label>Contact name</label>
                    <input className="form-control" type="text" onChange={this.handleNameChange} value={this.state.name} />
                </div>
                <div className="form-group">
                    <label>Public key (text or file)</label>
                    <textarea className="form-control" onChange={this.handleTextChange} value={this.state.pub_key} rows={9}/>
                </div>
                <div className="form-group">
                    <input type="file" onChange={this.handleFileChange} />
                </div>
                <button className="btn btn-success" onClick={this.handleClose}>Add this contact</button>
                <button className="btn btn-primary" onClick={this.handleClose}>Cancel</button>
            </ReactModal>
        );
    }
}

export default AddContact;
