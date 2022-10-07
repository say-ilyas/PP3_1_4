package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.HashSet;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Set<Role> getAllRoles() {
        return roleRepository.getAllRoles();
    }

    @Override
    public Set<Role> getByName(String name) {
        Set<Role> roles = new HashSet<>();
        for (Role role : getAllRoles()) {
            if (name.contains(role.getName()))
                roles.add(role);
        }
        return roles;
    }

    @Override
    @Transactional
    public void saveRole(Role role) {
        roleRepository.saveRole(role);
    }

}
