package com.landlease.repository;

import com.landlease.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByRole(User.Role role);
    
    List<User> findByStatus(User.Status status);
    
    @Query("SELECT u FROM User u WHERE u.fullName LIKE %?1% OR u.email LIKE %?1%")
    List<User> findByNameOrEmailContaining(String searchTerm);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = ?1")
    long countByRole(User.Role role);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.status = ?1")
    long countByStatus(User.Status status);
}