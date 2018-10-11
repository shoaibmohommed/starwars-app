import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'

const LoginWrapped = shallow(<Login.WrappedComponent store={configureMockStore}/>);

it("Login component rendering.", () => {
    LoginWrapped;
});