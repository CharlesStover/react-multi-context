import Enzyme, { shallow } from 'enzyme';
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
});
