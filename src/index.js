import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Screens/Login';
import Search from './Screens/Search';
import { setUsername } from './Redux/actions';
import store from './Redux/store';
import { Provider } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Route, BrowserRouter as Router } from 'react-router-dom';
const onLogout = (dispatch) => {
    dispatch(setUsername(''));
    window.location.reload();
}
const Routing = ({ username, dispatch }) => (
    <Router basename="/starwars-app" >
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Start Wars App</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                        Signed in as: {username}
                    </Navbar.Text>
                    {username && <Navbar.Text pullRight> <Navbar.Link href="#" onClick={() => onLogout(dispatch)} >Logout</Navbar.Link> </Navbar.Text>}
                </Navbar.Collapse>
            </Navbar>;
            <Route exact path="/" component={Login} />
            <Route path="/search" component={Search} />
        </div>
    </Router>
)
const RoutingWithStore = connect(store => { return { username: store.reducer.username } })(Routing);

ReactDOM.render(<Provider store={store}><RoutingWithStore /></Provider>, document.getElementById('root'));

