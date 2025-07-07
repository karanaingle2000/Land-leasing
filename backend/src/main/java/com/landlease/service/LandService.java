package com.landlease.service;

import com.landlease.dto.LandDto;
import com.landlease.entity.Land;
import com.landlease.entity.User;
import com.landlease.repository.LandRepository;
import com.landlease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LandService {
    
    @Autowired
    private LandRepository landRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<LandDto> getAllLands() {
        return landRepository.findAll().stream()
                .map(LandDto::new)
                .collect(Collectors.toList());
    }
    
    public List<LandDto> getAvailableLands() {
        return landRepository.findAvailableLands().stream()
                .map(LandDto::new)
                .collect(Collectors.toList());
    }
    
    public Optional<LandDto> getLandById(Long id) {
        return landRepository.findById(id)
                .map(LandDto::new);
    }
    
    public List<LandDto> getLandsByOwner(Long ownerId) {
        return userRepository.findById(ownerId)
                .map(owner -> landRepository.findByOwner(owner).stream()
                        .map(LandDto::new)
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }
    
    public LandDto createLand(Land land, Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        
        land.setOwner(owner);
        Land savedLand = landRepository.save(land);
        return new LandDto(savedLand);
    }
    
    public Optional<LandDto> updateLand(Long id, Land landDetails) {
        return landRepository.findById(id)
                .map(land -> {
                    land.setTitle(landDetails.getTitle());
                    land.setLocation(landDetails.getLocation());
                    land.setArea(landDetails.getArea());
                    land.setSize(landDetails.getSize());
                    land.setUsageType(landDetails.getUsageType());
                    land.setPrice(landDetails.getPrice());
                    land.setLeaseLength(landDetails.getLeaseLength());
                    land.setPaymentSchedule(landDetails.getPaymentSchedule());
                    land.setImprovements(landDetails.getImprovements());
                    land.setImageUrl(landDetails.getImageUrl());
                    land.setMapLink(landDetails.getMapLink());
                    land.setStatus(landDetails.getStatus());
                    return new LandDto(landRepository.save(land));
                });
    }
    
    public boolean deleteLand(Long id) {
        if (landRepository.existsById(id)) {
            landRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<LandDto> searchLands(String searchTerm) {
        return landRepository.findByLocationOrAreaOrTitleContaining(searchTerm).stream()
                .map(LandDto::new)
                .collect(Collectors.toList());
    }
    
    public List<LandDto> getLandsByUsageType(Land.UsageType usageType) {
        return landRepository.findByUsageType(usageType).stream()
                .map(LandDto::new)
                .collect(Collectors.toList());
    }
    
    public Optional<LandDto> leaseLand(Long landId, Long tenantId) {
        Optional<Land> landOpt = landRepository.findById(landId);
        Optional<User> tenantOpt = userRepository.findById(tenantId);
        
        if (landOpt.isPresent() && tenantOpt.isPresent()) {
            Land land = landOpt.get();
            User tenant = tenantOpt.get();
            
            if (land.getStatus() == Land.LandStatus.AVAILABLE) {
                land.setCurrentTenant(tenant);
                land.setStatus(Land.LandStatus.LEASED);
                return Optional.of(new LandDto(landRepository.save(land)));
            }
        }
        return Optional.empty();
    }
}