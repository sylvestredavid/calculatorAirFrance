/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import FormScreen from '../src/screens/FormScreen';

test('renders correctly', () => {
  const tree = renderer.create(<FormScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
