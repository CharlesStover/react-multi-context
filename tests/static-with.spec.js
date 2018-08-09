import React from 'react';
import createMultiContext from '../index';

describe('static with', () => {

  let MultiContext = null;
  beforeEach(() => {
    MultiContext = createMultiContext();
  });

  it('should be a static method', () => {
    const hoc = MultiContext.with('name');
  });

  it('should return a Higher Order Component', () => {
    const hoc = MultiContext.with('name');
    if (typeof hoc !== 'function') {
      throw new Error('Returned a ' + (typeof hoc) + ' (' + hoc + ')');
    }
  });
});
