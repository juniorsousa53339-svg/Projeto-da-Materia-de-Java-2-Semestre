package br.com.ads.funcionarios.sistema_funcionarios.repository;


import br.com.ads.funcionarios.sistema_funcionarios.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface UserRepository  extends JpaRepository<User, Long> {


    // Lista todods os Users
    List<User> findByid(Long id);

}
