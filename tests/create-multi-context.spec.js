import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import createMultiContext from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('createMultiContext', () => {

  let MultiContext = null;
  beforeEach(() => {
    MultiContext = createMultiContext({ d: true });
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
  });



  // Get
  describe('get', () => {

    it('should accept an array and a render prop', () => {
      shallow(<MultiContext set={{ a: 1 }} />);
      expect(() => {
        shallow(
          <MultiContext
            children={() => null}
            get={[ 'a' ]}
          />
        );
      }).not.toThrowError();
    });

    it('should require a render prop', () => {
      shallow(<MultiContext set={{ a: 1 }} />);
      expect(() => {
        shallow(
          <MultiContext
            children={true}
            get={[ 'a' ]}
          />
        );
      }).toThrowError();
      expect(() => {
        shallow(
          <MultiContext
            children={1}
            get={[ 'a' ]}
          />
        );
      }).toThrowError();
      expect(() => {
        shallow(
          <MultiContext
            children="children"
            get={[ 'a' ]}
          />
        );
      }).toThrowError();
    });

    it('should execute the render prop', () => {
      let value = null;
      mount(
        <MultiContext set={{ a: 1 }}>
          <MultiContext get={[ 'a' ]}>
            {a => {
              value = a;
              return null;
            }}
          </MultiContext>
        </MultiContext>
      );
      expect(value).toBe(1);
    });
  });



  // Defaults
  describe('default', () => {
    it('should accept default parameter', () => {
      let value = null;
      mount(
        <MultiContext
          children={d => {
            value = d;
            return null;
          }}
          get={[ 'd' ]}
        />
      );
      expect(value).toBe(true);
    });
  });



  // Set + Get
   describe('set + get', () => {

    it('should not get what was just set', () => {
      let value = null;
      mount(
        <MultiContext
          children={d => {
            value = d;
            return null;
          }}
          get={[ 'd' ]}
          set={{ d: false }}
        />
      );
      expect(value).toBe(true);
    });
  });
});
