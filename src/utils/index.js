import {CARACTERISTIQUES_AVION} from './avion';

/**
 * format un texte afin de pouvoir le changer en number.
 * @param text le text à formater
 * @returns string le text formaté
 */
function formatText(text) {
  text = text.replace(/[a-z A-z]/gi, '');
  text = text.replace(/,/gi, '.');
  text = text.replace(/ /gi, '');
  const arr = text.split('.');
  if (arr.length > 1) {
    return arr[0] + '.' + arr[1];
  } else {
    return arr[0];
  }
}

/**
 * calcule le poid total de l'avion un fois tout les inputs remplis
 * @param state les valeurs des inputs
 * @returns {number} le poid calculé
 */
function calculPoidTotal(state) {
  return (
    +state.nbPassagers * 70 +
    +state.nbLitreKerozene * 0.84 +
    +state.nbKilosBagagesCabine +
    +state.nbKilosBagagesSoute +
    CARACTERISTIQUES_AVION.poidAVideKG
  );
}

/**
 * calcul le nombre de litre de kérozene qui sera utilisé le temps du vol
 * @param nbHeuresVol la valeur de l'input nombre d'heures de vol
 * @returns {number} le nombre de litre de kérozene utilisé
 */
function calculKerozeneUtilise(nbHeuresVol) {
  return +nbHeuresVol * CARACTERISTIQUES_AVION.kerozenParHeureLitre;
}

module.exports = {formatText, calculPoidTotal, calculKerozeneUtilise};
