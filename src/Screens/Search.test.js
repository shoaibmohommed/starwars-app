import React from 'react';
import Search from './Search';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'


const SearchWrapped = shallow(<Search.WrappedComponent planetsList={[]} store={configureMockStore} />);

// describe what we are testing
describe('Search Component', () => {
    // make our assertion and what we expect to happen 
    it('contains h1 tag for main heading', () => {
        expect(SearchWrapped.find('h1').exists()).toBe(true)
    })
})