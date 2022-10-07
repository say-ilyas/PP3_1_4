package ru.kata.spring.boot_security.demo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;
import javax.annotation.PostConstruct;

@Component
public class DefaultUser {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public DefaultUser(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @PostConstruct
    private void initialize() {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        roleService.saveRole(roleAdmin);
        roleService.saveRole(roleUser);
        User admin = new User();
        admin.setName("Admin");
        admin.setSurname("Adminov");
        admin.setAge(22);
        admin.setEmail("admin@gmail.com");
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.addRole(roleAdmin);
        userService.add(admin);

        User user = new User();
        user.setName("User");
        user.setName("Userov");
        user.setAge(22);
        user.setUsername("user");
        user.setPassword("user");
        user.setEmail("user@mail.ru");
        user.addRole(roleUser);
        userService.add(user);
    }
}
