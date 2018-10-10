import React from 'react';
import { FormGroup, HelpBlock, FormControl, Button } from 'react-bootstrap';
import Util from '../Util';
import swal from 'sweetalert';
import { ScaleLoader } from 'react-spinners';
import PropType from 'prop-types';
import { setUsername } from '../Redux/actions'
import { connect } from 'react-redux';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        showLoader: false
    };

    getValidationState = (field) => {
        const stateFieldLength = this.state[field].length;
        if (stateFieldLength === 0) {
            return null;
        }
        else if (stateFieldLength < 3) {
            return 'error';
        }
        return "success";
    }

    handleChange = (e) => {
        let state = Object.assign({}, this.state);
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    checkLogin = () => {
        const { username, password } = this.state;
        this.setState({ showLoader: true });
        fetch(`${Util.BaseUrl}people?search=${username}`).then(response => response.json()).then(responseData => {
            let success = true;

            if (responseData.count !== 1) {
                success = false;
            } else {
                let user = responseData.results[0];
                if (user["birth_year"] !== password) {
                    success = false;
                }
            }
            if (!success) {
                swal("Alert", "Username or password is incorrect");
            } else {
                this.props.dispatch(setUsername(username));
                this.context.router.history.push('/search');
                return;
            }
            this.setState({ showLoader: false });
        }).catch(e => {
            this.setState({ showLoader: false });
        });
    }
    onLoginClick = (e) => {
        const { showLoader } = this.state;
        if (!showLoader) {
            if (this.getValidationState("username") === "success" && this.getValidationState("password") === "success")
                this.checkLogin();
            else {
                swal("Alert", "Please correct the form first.");
            }
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className="container text-center">
                <h1>Login to Star Wars App</h1>
                <form onSubmit={this.onLoginClick} className="col-md-4 col-lg-3 col-sm-6" style={{ float: "initial", margin: "40px auto" }}>

                    <FieldGroup
                        controlId="formUsername"
                        validationState={() => this.getValidationState("username")}
                        type="text"
                        value={this.state.username}
                        style={{ margin: "5px" }}
                        placeholder="Enter Username"
                        name="username"
                        onChange={this.handleChange}
                    />

                    <FieldGroup
                        controlId="formPassword"
                        validationState={() => this.getValidationState("password")}
                        type="text"
                        value={this.state.password}
                        style={{ margin: "5px" }}
                        placeholder="Enter Password"
                        name="password"
                        onChange={this.handleChange} />


                    <HelpBlock>Only enter star wars character name as user name and their birth Year as password.</HelpBlock>
                    <Button type="submit" bsStyle="danger" >Login</Button>

                </form>
                <ScaleLoader
                    className={Util.override}
                    height={35}
                    width={4}
                    radius={2}
                    color={'#123abc'}
                    loading={this.state.showLoader}
                />
            </div>

        );
    }
}
Login.contextTypes = {
    router: PropType.object.isRequired
}
const FieldGroup = ({ controlId, validationState, help, ...props }) => {
    return (
        <FormGroup controlId={controlId} validationState={validationState()}>
            <FormControl {...props} />
        </FormGroup>
    );
}

export default connect(store => {
    return {}
})(Login);