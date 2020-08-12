import React from 'react';
import {TextInput} from 'react-native-paper';

export default function CustomInput(props) {
  return (
    <TextInput
      mode={'outlined'}
      keyboardType={'number-pad'}
      style={{marginVertical: 5}}
      label={props.label}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
