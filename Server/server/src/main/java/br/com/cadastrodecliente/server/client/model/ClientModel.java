package br.com.cadastrodecliente.server.client.model;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="clients")
@Getter
@Setter

public class ClientModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idd;

    @NotBlank(message = "O Campo deve ser informado")
    private String name;
    @NotBlank(message = "O Campo deve ser informado")
    private String cpf;
    @Email(message = "Insira um e-mail válido")
    @NotBlank(message = "O Campo deve ser informado")
    private String email;
    @NotBlank(message = "O Campo deve ser informado")
    private String city;
    @NotBlank(message = "O Campo deve ser informado")
    private String state;
}
