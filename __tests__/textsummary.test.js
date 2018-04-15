import TextSummary from '../src/js/elections/components/TextSummary';
import React from 'react';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

test('TextSummary component renders a riding summary', () => {
  const tree = shallow(<TextSummary riding={{}} />);
  expect(tree).toMatchSnapshot();
});

test('TextSummary component matches its snapshot with riding data', () => {
  const tree = renderer.create(<TextSummary riding={testRiding} />);
  expect(tree).toMatchSnapshot();
});
