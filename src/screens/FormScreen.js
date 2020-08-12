import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Message from '../components/Message';
import {calculKerozeneUtilise, calculPoidTotal, formatText} from '../utils';
import {CARACTERISTIQUES_AVION} from '../utils/avion';
import CustomInput from '../components/CustomInput';

export default class FormScreen extends React.Component {
  constructor(props) {
    super(props);
    // bien qu'on ai besoin de numbers pour le calcul, on met les attributs du state en string
    // car L'element TextInput ne prend et ne renvoi que des string
    this.state = {
      nbPassagers: '',
      nbLitreKerozene: '',
      nbKilosBagagesSoute: '',
      nbKilosBagagesCabine: '',
      nbHeuresVol: '',
      message: undefined,
    };
  }

  /**
   * formate la valeur de l'input, vérifie si la valeur n'est pas supérieur à la
   * capacité max de l'avion, si c'est le cas, on modifie le state avec la capacité max
   * sinon on le modifie avec la valeur de l'input
   * @param e l'event 'change' de l'input
   */
  changeNbPassager = (e) => {
    const val = formatText(e.nativeEvent.text);
    // le + permet de caster une string en un number
    if (+val > CARACTERISTIQUES_AVION.nbPassagersMax) {
      this.setState({
        nbPassagers: '' + CARACTERISTIQUES_AVION.nbPassagersMax,
      });
    } else {
      this.setState({
        nbPassagers: val,
      });
    }
  };

  /**
   * formate la valeur de l'input et modifie le state avec
   * @param e l'event 'change' de l'input
   */
  changeNbLitreKerozene = (e) => {
    const val = formatText(e.nativeEvent.text);
    this.setState({
      nbLitreKerozene: val,
    });
  };

  /**
   * formate la valeur de l'input et modifie le state avec
   * @param e l'event 'change' de l'input
   */
  changeNbKilosBagagesCabine = (e) => {
    const val = formatText(e.nativeEvent.text);
    this.setState({
      nbKilosBagagesCabine: val,
    });
  };

  /**
   * formate la valeur de l'input et modifie le state avec
   * @param e l'event 'change' de l'input
   */
  changeNbKilosBagagesSoute = (e) => {
    const val = formatText(e.nativeEvent.text);
    this.setState({
      nbKilosBagagesSoute: val,
    });
  };

  /**
   * formate la valeur de l'input et modifie le state avec
   * @param e l'event 'change' de l'input
   */
  changeNbHeuresVol = (e) => {
    const val = formatText(e.nativeEvent.text);
    this.setState({
      nbHeuresVol: val,
    });
  };

  /**
   * method d'envoi du formulaire
   */
  onSubmit = () => {
    // on vérifie d'abord si au moins un des input est vide
    if (
      this.state.nbPassagers === '' ||
      this.state.nbLitreKerozene === '' ||
      this.state.nbKilosBagagesCabine === '' ||
      this.state.nbKilosBagagesSoute === '' ||
      this.state.nbHeuresVol === ''
    ) {
      // si c'est le cas, on crée un message d'erreur
      this.setState({
        message: {
          style: 'danger',
          text: 'Merci de remplir tout les champs',
        },
      });
    } else {
      // sinon on calcul le poid total et le kérozene utilisé
      const poidTotal = calculPoidTotal(this.state);
      const kerozeneUtilise = calculKerozeneUtilise(this.state.nbHeuresVol);
      // on vérifie que le poid total est inférieur ou égal au poid max de l'avion
      // et que le nombre de litre de kérozene utilisé est inférieur ou égal au kérozene embarqué
      if (
        poidTotal <= CARACTERISTIQUES_AVION.poidMaxKG &&
        kerozeneUtilise <= this.state.nbLitreKerozene
      ) {
        // si c'est le cas, on crée un message de succès
        this.setState({
          message: {
            style: 'success',
            text: 'vous pouvez voler! Bon vol!',
          },
        });
      } else {
        //sinon on a deux possibilités, soit l'avion est trop lourd
        // on vérifie si l'avion est trop lourd
        if (poidTotal > CARACTERISTIQUES_AVION.poidMaxKG) {
          // si c'est le cas, on crée un message d'erreur
          this.setState({
            message: {
              style: 'danger',
              text: "l'avion ne peut pas décoller car trop lourd",
            },
          });
          // sinon on vérifie si le kérozene embarqué est inssufisant
        } else if (kerozeneUtilise > this.state.nbLitreKerozene) {
          // si c'est le cas, on crée un message d'erreur
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

  /**
   * method qui supprime le mesage, le faisant ainsi disparaitre de la vue
   */
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
          <CustomInput
            label={'Passagers'}
            value={this.state.nbPassagers}
            onChange={this.changeNbPassager}
          />
          <CustomInput
            label={'Kérozene (L)'}
            value={this.state.nbLitreKerozene}
            onChange={this.changeNbLitreKerozene}
          />
          <CustomInput
            label={'Bagages cabine (Kg)'}
            value={this.state.nbKilosBagagesCabine}
            onChange={this.changeNbKilosBagagesCabine}
          />
          <CustomInput
            label={'Bagages soute (Kg)'}
            value={this.state.nbKilosBagagesSoute}
            onChange={this.changeNbKilosBagagesSoute}
          />
          <CustomInput
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
