import { Router } from "./Router";
import { BrowserRouter, } from "react-router-dom";
import './global.css';
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import * as React from 'react';

import axios from "axios";

export function App() {

  const client = {
    idd: 0,
    name: '',
    cpf: '',
    email: '',
    city: '',
    state: '',
  }

  const [clients, setClients] = useState([]);
  const [objClient, setObjClient] = useState(client);
  const [fillInFilds, setFillInFilds] = useState([]);

  function selectClient(indice) {
    setObjClient(clients[indice]);
  }

  function getOneClient(clientId) {
    axios.get('http://localhost:8080/client/' + clientId)
      .then((response) => {
        setObjClient(response.data);
      })
  }

  function getAll() {
    axios.get('http://localhost:8080/client')
      .then((response) => {
        setClients(response.data);
      })
  }

  function dataForm(event) {
    setObjClient({ ...objClient, [event.target.name]: event.target.value });
  }

  function validationFilds(client) {
    if ((client.name === "") || (client.cpf === "") || (client.email === "") || (client.state === "") || (client.city === "")) {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        hideDuration: 300,
        timeOut: 3000
      }
      toastr.clear()
      setTimeout(() => toastr.warning("preencha todos os campos"), 2)
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

  function registerClient() {
    validationFilds(objClient)
    if (!TestaCPF(objClient.cpf)) {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        hideDuration: 300,
        timeOut: 3000
      }
      toastr.clear()
      setTimeout(() => toastr.warning("Cpf inválido"), 2)
    } else {
      axios.post('http://localhost:8080/client', objClient)
        .then((response) => {
          setClients([...objClient, response])
          if (response.status === 201) {
            toastr.options = {
              positionClass: 'toast-top-full-width',
              hideDuration: 300,
              timeOut: 3000
            }
            toastr.clear()
            setTimeout(() => toastr.success("cliente registrado com sucesso"), 2)
          }
        })
    }
  }

  function remove(idd) {

    axios.delete('http://localhost:8080/client/' + idd)
      .then((response) => {

        if (response.status == 200) {
          setClients(clients.filter(client => client.idd !== idd));
          toastr.options = {
            positionClass: 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 3000
          }
          toastr.clear()
          setTimeout(() => toastr.success("cliente removido com sucesso"), 2)
        } else {
          alert('Nao Foi Possivel Remover o CLiente')
        }
      })
  }

  function changeClient() {
    axios.put('http://localhost:8080/client', fillInFilds.client.data)
      .then((response) => {
        if (response.status == 200) {
          setClients([...fillInFilds])
        }
      })
  }

  const loadData = async (idd) => {
    const client = await axios.get(
      'http://localhost:8080/client/' + idd
    );
    setFillInFilds({ ...fillInFilds, client })
  };

  return (
    <UserContext.Provider value={
      {
        clients, setClients, dataForm, registerClient, selectClient, remove, getAll, getOneClient,
        loadData, fillInFilds, setFillInFilds, changeClient,objClient
      }
    } >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserContext.Provider>

  )
}

