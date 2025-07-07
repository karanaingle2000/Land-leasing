package com.landlease.repository;

import com.landlease.entity.Land;
import com.landlease.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandRepository extends JpaRepository<Land, Long> {
    List<Land> findByOwner(User owner);
    
    List<Land> findByCurrentTenant(User tenant);
    
    List<Land> findByStatus(Land.LandStatus status);
    
    List<Land> findByUsageType(Land.UsageType usageType);
    
    @Query("SELECT l FROM Land l WHERE l.location LIKE %?1% OR l.area LIKE %?1% OR l.title LIKE %?1%")
    List<Land> findByLocationOrAreaOrTitleContaining(String searchTerm);
    
    @Query("SELECT l FROM Land l WHERE l.status = 'AVAILABLE'")
    List<Land> findAvailableLands();
    
    @Query("SELECT COUNT(l) FROM Land l WHERE l.owner = ?1")
    long countByOwner(User owner);
    
    @Query("SELECT COUNT(l) FROM Land l WHERE l.status = ?1")
    long countByStatus(Land.LandStatus status);
    
    @Query("SELECT COUNT(l) FROM Land l WHERE l.usageType = ?1")
    long countByUsageType(Land.UsageType usageType);
}