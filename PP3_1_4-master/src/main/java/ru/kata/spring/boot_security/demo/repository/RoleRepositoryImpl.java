package ru.kata.spring.boot_security.demo.repository;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class RoleRepositoryImpl implements RoleRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Set<Role> getAllRoles() {
        String JPAql = "SELECT role FROM Role role";
        return entityManager.createQuery(JPAql, Role.class).getResultStream().collect(Collectors.toSet());
    }

    @Override
    public Set<Role> getByName(String name) {
        String JPAql = "SELECT role FROM Role role WHERE role.name = :name";
        return entityManager.createQuery(JPAql, Role.class).setParameter("name", name)
                .getResultStream().collect(Collectors.toSet());
    }

    @Override
    public void saveRole(Role role) {
        entityManager.persist(role);
    }
}
