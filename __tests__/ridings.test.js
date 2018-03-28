import Ridings from '../src/js/elections/components/Ridings';
import React from 'react';

import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import renderer from 'react-test-renderer';

import { Results } from '../src/assets/fixtures/mock-results.js';

describe('Ridings component', () => {
  describe('rendering tests', () => {
    const RIDINGS_PROPS = {
      allRidings: Results
    };

    it('should render a riding card', () => {
      const tree = shallow(<Ridings allRidings={[]} />);
      expect(tree).toMatchSnapshot();
    });

    it('should match its snapshot with riding data (received from props)', () => {
      const tree = renderer.create(<Ridings {...RIDINGS_PROPS} />);
      expect(tree).toMatchSnapshot();
    });

    it('should render 10 ridings', () => {
      const tree = mount(<Ridings {...RIDINGS_PROPS} />);
      assert.equal(tree.children().length, 10);
    });
  });
});
