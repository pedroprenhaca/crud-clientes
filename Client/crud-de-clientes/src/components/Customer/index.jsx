import { CirclesFour, ClipboardText, Pencil, Trash } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { BoxEdit } from "../Modal";

import styles from './index.module.css'

export function History() {

    const { clients, remove, getAll, loadData } = useContext(UserContext)

    const [modalOpen, setModalOpen] = useState(false);

    const [idClient, setIdClient] = useState(0);

    function openModal(id) {
        loadData(id)
        setIdClient(id);
        setModalOpen(true);
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <div className={styles.container}>
            <h1>Clientes</h1>

            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Cpf</th>
                            <th>Email</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th><CirclesFour size={20} weight="bold" /></th>

                        </tr>
                    </thead>
                    <tbody>
                        <BoxEdit id={idClient} modalOpen={modalOpen} setModalOpen={setModalOpen} />
                        {clients.map((client, indice) => {
                            return (

                                <tr key={client.idd}>
                                    <td data-title="#">{indice + 1}</td>
                                    <td data-title="Nome">{client.name}</td>
                                    <td data-title="Cpf">{client.cpf}</td>
                                    <td data-title="Email">{client.email}</td>
                                    <td data-title="Cidade">{client.city}</td>
                                    <td data-title="Estado">{client.state}</td>
                                    <div className={styles.tablebtn}>
                                        <td><button onClick={() => { openModal(client.idd) }}><Pencil size={24} weight="bold" color="#1E6F9F" /></button></td>
                                        <td><button onClick={() => remove(client.idd)}><Trash size={24} weight="bold" color="#E25858" /></button></td>
                                    </div>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {clients.length<=0 &&(
                <section className={styles.empty}>
                    <ClipboardText size={50} weight="light" />
                    <div>
                        <p>Voce ainda não tem clientes cadastrados</p>
                    </div>
                </section>
            )}
        </div>
    )
}

