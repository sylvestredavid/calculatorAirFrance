import React from 'react';
import {StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native';
import FormScreen from './src/screens/FormScreen';

export default function App() {
  return (
      <ScrollView>
        <Text style={styles.title}>Feuille calcul{'\n'} A320</Text>
        <FormScreen />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 40,
  },
});
