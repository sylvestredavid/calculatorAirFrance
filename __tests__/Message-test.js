/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Message from '../src/components/Message';

test('renders correctly', () => {
  const tree = renderer.create(<Message />).toJSON();
  expect(tree).toMatchSnapshot();
});
