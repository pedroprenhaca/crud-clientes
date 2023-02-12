import { useContext, useEffect, useState,} from "react";
import { getCityForState, getStates } from "../../utils/ibge";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import styles from './index.module.css'
import {
  Box,
  Modal,
  Typography,
} from '@mui/material'

import { UserContext } from "../../contexts/UserContext";

export function BoxEdit({ modalOpen, setModalOpen,}) {

  const { changeClient, fillInFilds,getAll } = useContext(UserContext)

  const [states, setStates] = useState([]);

  const [cities, setCities] = useState([]);

  const [statesAndCitiesValues, setStatesAndCitiesValues] = useState({})

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

  function editClient() {
    changeClient()
    toastr.options = {
      positionClass : 'toast-top-full-width',
      hideDuration: 300,
      timeOut: 3000
    }
    toastr.clear()
    setTimeout(() => toastr.success("cliente alterado com sucesso"), 2)
    setModalOpen(false)
    getAll()
    
  }

  if(fillInFilds.length == 0){
    console.log("bbb")
    return ''
  }

  function dataModal(event){
    fillInFilds.client.data[event.target.name] = event.target.value
  }

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box} >
          <Typography className={styles.header} id="modal-modal-title" variant="h6" component="h2">
            Alterar Cliente
          </Typography>
          <Typography className={styles.body} id="modal-modal-description" sx={{ mt: 2 }}>
            <input type="text" defaultValue={fillInFilds.client.data.name} key={fillInFilds.client.data.name} onChange={dataModal}  placeholder='Nome' name='name' />
            <input type="number" defaultValue={fillInFilds.client.data.cpf} key={fillInFilds.client.data.cpf} onChange={dataModal}  placeholder='Cpf' name='cpf' />
            <input type="text" defaultValue={fillInFilds.client.data.email} key={fillInFilds.client.data.email} onChange={dataModal}  placeholder='Email' name='email' />
            <div className={styles.dropstate}>
                        <select id="state" name="state" defaultValue={fillInFilds.client.data.state} key={fillInFilds.client.data.state} onChange={dataModal} onClick={handleStatesAndCitiesChange} >
                        <option value="">Selecione um Estado</option>
                            {states.map((item) => (
                                <option key={item.id} value={item.sigla}>{item.nome}</option> 
                                ))}
                        </select>
                    </div>

                    <div className={styles.dropcity}>
                        <select id="city" name="city" defaultValue={fillInFilds.client.data.city} key={fillInFilds.client.data.city} onChange={dataModal}>
                            <option  value="">{fillInFilds.client.data.city}</option>
                            {cities.map((item) => (
                                <option key={item.id} >{item.nome}</option> 
                                ))}
                        </select>
                    </div>
            <div className={styles.btn} >
              <button type="submit" onClick={editClient}>Alterar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
