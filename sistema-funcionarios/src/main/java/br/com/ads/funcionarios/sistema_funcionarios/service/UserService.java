package br.com.ads.funcionarios.sistema_funcionarios.service;

import br.com.ads.funcionarios.sistema_funcionarios.domain.User;
import br.com.ads.funcionarios.sistema_funcionarios.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {


    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User>listaUsers() {
        return userRepository.findAll();
    }
}
