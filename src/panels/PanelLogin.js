import React from 'react';
import './PanelLogin.css';

class PanelLogin extends React.Component {
    endlogin(e){
        let pub_key = '', priv_key = '';
        this.props.endlogin(pub_key, priv_key);
    }

    render (){
        return (
            <div className="container container-login">
                <div className="panel panel-info panel-main">
                    <div className="panel-heading">
                        <div className="panel-title">Login</div>
                    </div>
                    <div className="panel-body">
                        <div className="row full-height">
                            <div className="col-md-6 panel-login">
                                <input type="file"></input>
                                <input type="file"></input>
                                <button></button>
                            </div>
                            <div className="col-md-6 panel-register">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PanelLogin;
