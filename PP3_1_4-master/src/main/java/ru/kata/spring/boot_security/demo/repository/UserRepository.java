package ru.kata.spring.boot_security.demo.repository;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserRepository {
    List<User> getAllUsers();

    void create(User user);

    User getUserById(Long id);

    void delete(Long id);

    void update(User user);

    User findByUsername(String username);
}
