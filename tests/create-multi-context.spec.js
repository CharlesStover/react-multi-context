import Enzyme, { render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import createMultiContext from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('createMultiContext', () => {

  let MultiContext = null;
  beforeEach(() => {
    MultiContext = createMultiContext();
  });

  it('should render without crashing', () => {
    shallow(<MultiContext />);
  });

  it.skip('should not render contexts without getters/setters', () => {
    const multiContext = shallow(<MultiContext />);
    expect(multiContext.find('Context').length).toBe(0);
  });



  // Set
  describe('set', () => {

    it('should accept an object', () => {
      expect(() => {
        shallow(<MultiContext set={{ a: 1 }} />);
      }).not.toThrowError();
    });

    it.skip('should require an object', () => {
      expect(() => {
      }).toThrowError();
    });
  });



  // Get
  describe('get', () => {

    it('should accept a render prop', () => {
      expect(() => {
        shallow(<MultiContext set={{ a: 1 }} />);
        shallow(
          <MultiContext
            children={() => null}
            get={[ 'a' ]}
          />
        );
      }).not.toThrowError();
    });

    it('should require a render prop', () => {
      expect(() => {
        shallow(<MultiContext set={{ a: 1 }} />);
        shallow(
          <MultiContext
            children="children"
            get={[ 'a' ]}
          />
        );
      }).toThrowError();
    });

    it.skip('should execute the render prop', () => {
    });
  });



  // Set + Get
  describe('set + get', () => {

    it.skip('should not get what was just set', () => {
    });
  });
});
