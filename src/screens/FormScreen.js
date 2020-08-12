import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import Message from '../components/Message';
import {formatText, calculPoidTotal, calculKerozeneUtilise} from '../utils';
import {caracteristiquesAvion} from '../utils/avion';

export default class FormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nbPassagers: '',
      nbLitreKerozene: '',
      nbKilosBagagesSoute: '',
      nbKilosBagagesCabine: '',
      nbHeuresVol: '',
      message: undefined,
    };
  }

  changeNbPassager = (e) => {
    const val = formatText(e.nativeEvent.text);
    if (+val > caracteristiquesAvion.nbPassagersMax) {
      this.setState({
        nbPassagers: caracteristiquesAvion.nbPassagersMax,
      });
    } else {
      this.setState({
        nbPassagers: val,
      });
    }
  };

  changeNbLitreKerozene = (e) => {
    const val = formatText(e.nativeEvent.text);
    this.setState({
      nbLitreKerozene: val,
    });
  };

  changeNbKilosBagagesCabine = (e) => {
    const val = formatText(e.nativeEvent.text);
    this.setState({
      nbKilosBagagesCabine: val,
    });
  };

  changeNbKilosBagagesSoute = (e) => {
    const val = formatText(e.nativeEvent.text);
    this.setState({
      nbKilosBagagesSoute: val,
    });
  };

  changeNbHeuresVol = (e) => {
    const val = formatText(e.nativeEvent.text);
    this.setState({
      nbHeuresVol: val,
    });
  };

  onSubmit = () => {
    if (
      this.state.nbPassagers === '' ||
      this.state.nbLitreKerozene === '' ||
      this.state.nbKilosBagagesCabine === '' ||
      this.state.nbKilosBagagesSoute === '' ||
      this.state.nbHeuresVol === ''
    ) {
      this.setState({
        message: {
          style: 'danger',
          text: 'Merci de remplir tout les champs',
        },
      });
    } else {
      const poidTotal = calculPoidTotal(this.state);
      const kerozeneUtilise = calculKerozeneUtilise(this.state.nbHeuresVol);
      if (
        poidTotal <= caracteristiquesAvion.poidMaxKG &&
        kerozeneUtilise <= this.state.nbLitreKerozene
      ) {
        this.setState({
          message: {
            style: 'success',
            text: 'vous pouvez voler! Bon vol!',
          },
        });
      } else {
        if (poidTotal > caracteristiquesAvion.poidMaxKG) {
          this.setState({
            message: {
              style: 'danger',
              text: "l'avion ne peut pas décoller car trop lourd",
            },
          });
        } else if (kerozeneUtilise > this.state.nbLitreKerozene) {
          this.setState({
            message: {
              style: 'danger',
              text:
                "Le temps de vol est supérieur à l'autonomie de l’avion en vue du kérosène embarqué",
            },
          });
        }
      }
    }
  };

  closeMessage = () => {
    this.setState({
      message: undefined,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/logoAirFrance.png')}
        />
        <View style={styles.form}>
          <TextInput
            mode={'outlined'}
            keyboardType={'number-pad'}
            style={{marginVertical: 5}}
            label={'Passagers'}
            value={this.state.nbPassagers}
            onChange={this.changeNbPassager}
          />
          <TextInput
            mode={'outlined'}
            keyboardType={'number-pad'}
            style={{marginVertical: 5}}
            label={'Kérozene (L)'}
            value={this.state.nbLitreKerozene}
            onChange={this.changeNbLitreKerozene}
          />
          <TextInput
            mode={'outlined'}
            keyboardType={'number-pad'}
            style={{marginVertical: 5}}
            label={'Bagages cabine (Kg)'}
            value={this.state.nbKilosBagagesCabine}
            onChange={this.changeNbKilosBagagesCabine}
          />
          <TextInput
            mode={'outlined'}
            keyboardType={'number-pad'}
            style={{marginVertical: 5}}
            label={'Bagages soute (Kg)'}
            value={this.state.nbKilosBagagesSoute}
            onChange={this.changeNbKilosBagagesSoute}
          />
          <TextInput
            mode={'outlined'}
            keyboardType={'number-pad'}
            style={{marginVertical: 5}}
            label={'Heures de vol'}
            value={this.state.nbHeuresVol}
            onChange={this.changeNbHeuresVol}
          />
        </View>
        {this.state.message && (
          <Message
            style={this.state.message.style}
            text={this.state.message.text}
            close={this.closeMessage}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
            Calculer
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  form: {
    width: '70%',
  },
  container: {
    width: '90%',
    padding: 10,
    marginHorizontal: '5%',
    marginVertical: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    bottom: -20,
    right: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  image: {
    width: '40%',
    height: 20,
    position: 'absolute',
    top: -10,
    right: 10,
  },
});
