import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'


const LoginWrapped = shallow(<Login.WrappedComponent store={configureMockStore} />);

// describe what we are testing
describe('Login Component', () => {
    // make our assertion and what we expect to happen 
    it('contains h1 tag for main heading', () => {
        expect(LoginWrapped.find('h1').exists()).toBe(true)
    })
})