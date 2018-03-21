import TotalVotes from '../src/js/elections/components/TotalVotes';
import React from 'react';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('TotalVotes component', () => {
  describe('rendering tests', () => {
    it('should render vote total for the riding', () => {
      const tree = shallow(<TotalVotes riding={{}} />);
      expect(tree).toMatchSnapshot();
    });
	
    it('should match its snapshot with riding data', () => {
      var ridings = {
			"id": 1,
			"name": "Annapolis",
			"num": 1,
			"pollsReported": 57,
			"pollsTotal": 57,
			"results": [
				{
					"name": "Henry Spurr",
					"partyId": 13,
					"votes": 834,
					"isElected": false,
					"partyCode": "NDP"
				},
				{
					"name": "Stephen McNeil",
					"partyId": 12,
					"votes": 7709,
					"isElected": true,
					"partyCode": "LIB"
				},
				{
					"name": "Ginny Hurlock",
					"partyId": 14,
					"votes": 1390,
					"isElected": false,
					"partyCode": "PC"
				},
				{
					"name": "Ron Neufeld",
					"partyId": 11,
					"votes": 227,
					"isElected": false,
					"partyCode": "GRN"
				}
			]
		};


      const tree = renderer.create(
        <TotalVotes riding={ridings} />
      );
      expect(tree).toMatchSnapshot();
    });
  });
});

