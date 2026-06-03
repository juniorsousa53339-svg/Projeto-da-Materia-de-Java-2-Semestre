package br.com.ads.funcionarios.sistema_funcionarios.domain;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@Entity
@Table(name = "usuarios")
@NoArgsConstructor
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String nome;

    @Column(nullable = false)
    @NotBlank
    private String email;

    @Column(nullable = false)
    @NotBlank
    private String senha;

    @Column(nullable = false)
    @NotBlank
    private String cargo;

    @Column(nullable = false)
    @NotNull
    private BigDecimal salario;

}
