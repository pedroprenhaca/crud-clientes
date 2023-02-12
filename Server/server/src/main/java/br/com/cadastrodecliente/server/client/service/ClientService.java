package br.com.cadastrodecliente.server.client.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.cadastrodecliente.server.client.model.AnsewerModel;
import br.com.cadastrodecliente.server.client.model.ClientModel;
import br.com.cadastrodecliente.server.client.repository.ClientRepository;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private AnsewerModel ansewerModel;

    public Iterable<ClientModel> list() {
        return clientRepository.findAll();
    }

    public Optional<ClientModel> getId(long idd) {
        return clientRepository.findById(idd);
    }

    public ResponseEntity<ClientModel> register(ClientModel clientModel) {

        
        return new ResponseEntity<ClientModel>(clientRepository.save(clientModel), HttpStatus.CREATED);
    }

    public ResponseEntity<ClientModel> change(ClientModel clientModel) {
        return new ResponseEntity<ClientModel>(clientRepository.save(clientModel), HttpStatus.OK);
    }

    public ResponseEntity<AnsewerModel> delete(long idd) {
        clientRepository.deleteById(idd);
        ansewerModel.setMessage("Cliente removido com sucesso!");
        return new ResponseEntity<AnsewerModel>(ansewerModel, HttpStatus.OK);
    }
}