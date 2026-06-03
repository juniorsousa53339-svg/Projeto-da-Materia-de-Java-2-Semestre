package br.com.ads.funcionarios.sistema_funcionarios.service;

import br.com.ads.funcionarios.sistema_funcionarios.domain.User;
import br.com.ads.funcionarios.sistema_funcionarios.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
public class UserService {


    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> listUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User update(Long id, String nome,
                            String email,
                            String senha,
                            String cargo,
                            BigDecimal salario) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.alteraDados(nome, email, senha, cargo, salario);
        return userRepository.save(user);
    }
}
