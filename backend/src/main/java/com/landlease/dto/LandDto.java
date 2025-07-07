package com.landlease.dto;

import com.landlease.entity.Land;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LandDto {
    private Long id;
    private String title;
    private String location;
    private String area;
    private String size;
    private Land.UsageType usageType;
    private BigDecimal price;
    private String leaseLength;
    private Land.PaymentSchedule paymentSchedule;
    private String improvements;
    private String imageUrl;
    private String mapLink;
    private Land.LandStatus status;
    private UserDto owner;
    private UserDto currentTenant;
    private LocalDateTime createdAt;
    
    public LandDto() {}
    
    public LandDto(Land land) {
        this.id = land.getId();
        this.title = land.getTitle();
        this.location = land.getLocation();
        this.area = land.getArea();
        this.size = land.getSize();
        this.usageType = land.getUsageType();
        this.price = land.getPrice();
        this.leaseLength = land.getLeaseLength();
        this.paymentSchedule = land.getPaymentSchedule();
        this.improvements = land.getImprovements();
        this.imageUrl = land.getImageUrl();
        this.mapLink = land.getMapLink();
        this.status = land.getStatus();
        this.owner = land.getOwner() != null ? new UserDto(land.getOwner()) : null;
        this.currentTenant = land.getCurrentTenant() != null ? new UserDto(land.getCurrentTenant()) : null;
        this.createdAt = land.getCreatedAt();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    
    public Land.UsageType getUsageType() { return usageType; }
    public void setUsageType(Land.UsageType usageType) { this.usageType = usageType; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public String getLeaseLength() { return leaseLength; }
    public void setLeaseLength(String leaseLength) { this.leaseLength = leaseLength; }
    
    public Land.PaymentSchedule getPaymentSchedule() { return paymentSchedule; }
    public void setPaymentSchedule(Land.PaymentSchedule paymentSchedule) { this.paymentSchedule = paymentSchedule; }
    
    public String getImprovements() { return improvements; }
    public void setImprovements(String improvements) { this.improvements = improvements; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getMapLink() { return mapLink; }
    public void setMapLink(String mapLink) { this.mapLink = mapLink; }
    
    public Land.LandStatus getStatus() { return status; }
    public void setStatus(Land.LandStatus status) { this.status = status; }
    
    public UserDto getOwner() { return owner; }
    public void setOwner(UserDto owner) { this.owner = owner; }
    
    public UserDto getCurrentTenant() { return currentTenant; }
    public void setCurrentTenant(UserDto currentTenant) { this.currentTenant = currentTenant; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}