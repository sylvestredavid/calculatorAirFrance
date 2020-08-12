import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';

export default function Message(props) {
  if (props.style === 'danger') {
    return (
      <View style={[styles.message, styles.danger]}>
        <IconButton
          icon="close"
          style={styles.close}
          size={14}
          color={Colors.white}
          onPress={props.close}
        />
        <Text style={{color: 'white'}}>{props.text}</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.message, styles.success]}>
        <IconButton
          icon="close"
          style={styles.close}
          size={14}
          color={Colors.white}
          onPress={props.close}
        />
        <Text style={{color: 'white'}}>{props.text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  message: {
    padding: 15,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
    position: 'relative',
  },
  danger: {
    backgroundColor: 'red',
  },
  success: {
    backgroundColor: 'green',
  },
  close: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
});
