import TotalVotes from '../src/js/elections/components/TotalVotes';
import React from 'react';

import expect from 'expect';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('TotalVotes component', () => {
  describe('rendering tests', () => {
    it('should render vote total for the riding', () => {
      const tree = shallow(<TotalVotes riding={{}} />);
      expect(tree).toMatchSnapshot();
    });

    it('should match its snapshot with riding data', () => {
      const tree = renderer.create(<TotalVotes riding={testRiding} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
