package br.com.cadastrodecliente.server.client.controller;



import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.cadastrodecliente.server.client.model.AnsewerModel;
import br.com.cadastrodecliente.server.client.model.ClientModel;
import br.com.cadastrodecliente.server.client.service.ClientService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping("/client")
    public Iterable<ClientModel> list(){
        return clientService.list();
    }
    @GetMapping("/client/{idd}")
    public Optional<ClientModel> listid( @PathVariable long idd){
        return clientService.getId(idd);
    }

    @PostMapping("/client")
    public ResponseEntity<ClientModel> register(@RequestBody @Valid ClientModel clientModel){
        return clientService.register(clientModel);
    }

     @PutMapping("/client")
        public ResponseEntity<ClientModel> change(@RequestBody @Valid ClientModel clientModel){
    return clientService.change(clientModel);
        }

    @DeleteMapping("/client/{idd}")
    public ResponseEntity<AnsewerModel> delete(@PathVariable long idd){
        return clientService.delete(idd);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) ->{
            String fieldName = ((FieldError)error).getField();
            String errorMessage = error.getDefaultMessage();

            errors.put(fieldName, errorMessage);
        }

        );

        return errors;
    }

   
}
