package br.com.ads.funcionarios.sistema_funcionarios.controller;


import br.com.ads.funcionarios.sistema_funcionarios.dto.UserListResponse;
import br.com.ads.funcionarios.sistema_funcionarios.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Usuarios")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserListResponse> listaUsers(){

        return userService.listaUsers()
                .stream()
                .map(UserListResponse::fromEntity)
                .toList();
    }
}
