import {caracteristiquesAvion} from './avion';

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

function calculPoidTotal(state) {
  return (
    +state.nbPassagers * 70 +
    +state.nbLitreKerozene * 0.84 +
    +state.nbKilosBagagesCabine +
    +state.nbKilosBagagesSoute +
    caracteristiquesAvion.poidAVideKG
  );
}

function calculKerozeneUtilise(nbHeuresVol) {
  return +nbHeuresVol * caracteristiquesAvion.kerozenParHeureLitre;
}

module.exports = {formatText, calculPoidTotal, calculKerozeneUtilise};
