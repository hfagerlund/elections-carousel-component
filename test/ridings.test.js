import Ridings from '../src/js/elections/components/Ridings';
import React from 'react';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Results } from '../src/assets/fixtures/mock-results.js';

describe('Ridings component', () => {
  describe('rendering tests', () => {
    it('should render a riding card', () => {
      const tree = shallow(<Ridings moreInput={[]} />);
      expect(tree).toMatchSnapshot();
    });

    it('should match its snapshot with riding data (received from props)', () => {
      const RIDINGS_PROPS = {
        moreInput: Results
      };
      const tree = renderer.create(<Ridings {...RIDINGS_PROPS} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
