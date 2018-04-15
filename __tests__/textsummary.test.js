import TextSummary from '../src/js/elections/components/TextSummary';
import React from 'react';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

test('TextSummary component renders a riding summary', () => {
  const tree = shallow(<TextSummary riding={{}} />);
  expect(tree).toMatchSnapshot();
});

test('TextSummary component matches its snapshot with riding data', () => {
  const ridings = {
    id: 1,
    name: 'Annapolis',
    num: 1,
    pollsReported: 57,
    pollsTotal: 57,
    results: [
      {
        name: 'Henry Spurr',
        partyId: 13,
        votes: 834,
        isElected: false,
        partyCode: 'NDP'
      },
      {
        name: 'Stephen McNeil',
        partyId: 12,
        votes: 7709,
        isElected: true,
        partyCode: 'LIB'
      },
      {
        name: 'Ginny Hurlock',
        partyId: 14,
        votes: 1390,
        isElected: false,
        partyCode: 'PC'
      },
      {
        name: 'Ron Neufeld',
        partyId: 11,
        votes: 227,
        isElected: false,
        partyCode: 'GRN'
      }
    ]
  };
  const tree = renderer.create(<TextSummary riding={ridings} />);
  expect(tree).toMatchSnapshot();
});
