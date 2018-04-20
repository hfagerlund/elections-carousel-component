import Spinner from '../src/js/elections/components/Spinner';
import React from 'react';

import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

describe('Spinner component', () => {
  describe('rendering tests', () => {
    it('gets instance of Spinner component', () => {
      const wrapper = mount(<Spinner />);
      const inst = wrapper.instance();
      expect(inst).to.be.instanceOf(Spinner);
    });

    it('should 2 divs', () => {
      const wrapper = shallow(<Spinner />);
      const divs = wrapper.find('div');
      expect(wrapper.find('div')).to.have.length(2);
    });

    it('returns p element as a child of its 2nd div element', () => {
      const wrapper = mount(<Spinner />);
      const secondChild = wrapper
        .find('div')
        .last()
        .childAt(0);
      expect(secondChild.type()).to.equal('p');
      expect(secondChild).to.have.length(1);
    });
  });
});
