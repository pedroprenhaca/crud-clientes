import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getCityForState, getStates } from "../../utils/ibge";
import styles from './index.module.css'
import 'toastr/build/toastr.min.css'
import { useNavigate } from 'react-router-dom';

export function Post() {
    const { dataForm, registerClient,objClient } = useContext(UserContext)

    const [states, setStates] = useState([]);

    const [cities, setCities] = useState([]);

    const [statesAndCitiesValues, setStatesAndCitiesValues] = useState({});

    const navigateTo = useNavigate();

    useEffect(() => {
        getStates().then((states) => {
            setStates(states);
        })
    }, [])

    useEffect(() => {
        getCityForState(statesAndCitiesValues.state).then((cities) => {
            setCities(cities);
        })
    }, [statesAndCitiesValues.state])

    function handleStatesAndCitiesChange(event) {
        event.preventDefault();
        const { value, name } = event.target;
        setStatesAndCitiesValues({ ...statesAndCitiesValues, [name]: value })
    }

    function registerForm() {
        registerClient()
        if ((objClient.name != "") 
            && (objClient.cpf != "") 
            && (objClient.email != "") 
            && (objClient.state != "") 
            && (objClient.city != "") 
            && (TestaCPF(objClient.cpf)) ) {
            window.location.reload(true, navigateTo('/'));
        }
    }

    function TestaCPF(strCPF) {
        var Soma;
        Soma = 0;
    
        if (strCPF.length != 11 ) return false;
    
        if (strCPF == "00000000000") return false;
        if (strCPF == "11111111111") return false;
        if (strCPF == "22222222222") return false;
        if (strCPF == "33333333333") return false;
        if (strCPF == "44444444444") return false;
        if (strCPF == "55555555555") return false;
        if (strCPF == "66666666666") return false;
        if (strCPF == "77777777777") return false;
        if (strCPF == "88888888888") return false;
        if (strCPF == "99999999999") return false;
        
        return true;
      }

    return (

        <div className={styles.card}>
            <h1>Novo Cliente </h1>
            <div className={styles.line} />

            <form className={styles.input}>

                <input type="text" required onChange={dataForm} placeholder='Nome' name='name' />

                <input type="number" required onChange={dataForm} placeholder='Cpf' name='cpf' />

                <input type="text" required onChange={dataForm} placeholder='Email' name='email' />

                <div className={styles.dropstate}>
                    <select id="state" name="state" required onChange={dataForm} onClick={handleStatesAndCitiesChange} >
                        <option value="">Selecione um Estado</option>
                        {states.map((item) => (
                            <option key={item.id} value={item.sigla}>{item.nome}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.dropcity}>
                    <select id="city" name="city" required onChange={dataForm}>
                        <option value="">Selecione uma Cidade</option>
                        {cities.map((item) => (
                            <option key={item.id} >{item.nome}</option>
                        ))}
                    </select>
                </div>
            </form>

            <div className={styles.btn}>
                <button onClick={registerForm}>Cadastrar</button>
            </div>


        </div>
    )
}