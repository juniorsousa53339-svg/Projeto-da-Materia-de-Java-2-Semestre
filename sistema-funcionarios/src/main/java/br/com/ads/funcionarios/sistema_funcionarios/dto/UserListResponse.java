package br.com.ads.funcionarios.sistema_funcionarios.dto;

import br.com.ads.funcionarios.sistema_funcionarios.domain.User;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class UserListResponse {

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

    public static UserListResponse fromEntity(User u) {
        UserListResponse users = new UserListResponse();
        u.setNome(u.getNome());
        u.setEmail(u.getEmail());
        u.setSenha(u.getSenha());
        u.setSalario(u.getSalario());
        return users;
    }
}
