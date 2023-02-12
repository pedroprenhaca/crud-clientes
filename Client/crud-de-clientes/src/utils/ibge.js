
const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/';

export function getStates(){
    const url = `${BASE_URL}/localidades/estados`;
    return fetch(url)
    .then(response => response.json());
}

export function getCityForState(state){
    const url = `${BASE_URL}/localidades/estados/${state}/municipios`;
    return fetch(url)
    .then(response => response.json());
}