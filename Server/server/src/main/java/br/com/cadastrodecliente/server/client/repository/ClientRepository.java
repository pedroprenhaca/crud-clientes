package br.com.cadastrodecliente.server.client.repository;

import org.springframework.data.repository.CrudRepository;


import br.com.cadastrodecliente.server.client.model.ClientModel;


public interface ClientRepository extends CrudRepository<ClientModel,Long>{
    
}
