package com.landlease.controller;

import com.landlease.dto.LandDto;
import com.landlease.entity.Land;
import com.landlease.service.LandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lands")
@CrossOrigin(origins = "*")
public class LandController {
    
    @Autowired
    private LandService landService;
    
    @GetMapping
    public ResponseEntity<List<LandDto>> getAllLands() {
        return ResponseEntity.ok(landService.getAllLands());
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<LandDto>> getAvailableLands() {
        return ResponseEntity.ok(landService.getAvailableLands());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LandDto> getLandById(@PathVariable Long id) {
        return landService.getLandById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<LandDto>> getLandsByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(landService.getLandsByOwner(ownerId));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<LandDto>> searchLands(@RequestParam String q) {
        return ResponseEntity.ok(landService.searchLands(q));
    }
    
    @GetMapping("/usage/{usageType}")
    public ResponseEntity<List<LandDto>> getLandsByUsageType(@PathVariable Land.UsageType usageType) {
        return ResponseEntity.ok(landService.getLandsByUsageType(usageType));
    }
    
    @PostMapping
    public ResponseEntity<LandDto> createLand(@Valid @RequestBody Land land, @RequestParam Long ownerId) {
        try {
            LandDto createdLand = landService.createLand(land, ownerId);
            return ResponseEntity.ok(createdLand);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LandDto> updateLand(@PathVariable Long id, @Valid @RequestBody Land land) {
        return landService.updateLand(id, land)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{landId}/lease/{tenantId}")
    public ResponseEntity<LandDto> leaseLand(@PathVariable Long landId, @PathVariable Long tenantId) {
        return landService.leaseLand(landId, tenantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLand(@PathVariable Long id) {
        if (landService.deleteLand(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}