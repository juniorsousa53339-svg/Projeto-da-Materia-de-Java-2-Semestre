package br.com.ads.funcionarios.sistema_funcionarios.controller;


import br.com.ads.funcionarios.sistema_funcionarios.domain.User;
import br.com.ads.funcionarios.sistema_funcionarios.repository.UserRepository;
import br.com.ads.funcionarios.sistema_funcionarios.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Usuarios")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService,
                          UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> listUsers() {
        return userService.listUsers();
    }

    @PostMapping
    public User save(@RequestBody @Valid User user) {
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void>update(@PathVariable Long id ,@RequestBody @Valid User user) {

        userService.update
                (
                id,
                user.getNome(),
                user.getEmail(),
                user.getSenha(),
                user.getCargo(),
                user.getSalario()
                );
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete (@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
