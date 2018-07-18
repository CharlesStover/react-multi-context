const React = require('react').default;
const withContext = require('../withContext');

describe('withContext', () => {

  let Context = null;
  beforeEach(() => {
    Context = React.createContext();
  });

  it('should accept a React Context', () => {
    const hoc = withContext(Context, []);
  });

  it('should return a Higher Order Component', () => {
    const hoc = withContext(Context, []);
    if (typeof hoc !== 'function') {
      throw new Error('Returned a ' + (typeof hoc) + ' (' + hoc + ')');
    }
  });
});
