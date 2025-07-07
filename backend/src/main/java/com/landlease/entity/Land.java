package com.landlease.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "lands")
public class Land {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "title")
    private String title;

    @NotBlank
    @Column(name = "location")
    private String location;

    @NotBlank
    @Column(name = "area")
    private String area;

    @NotBlank
    @Column(name = "size")
    private String size;

    @Enumerated(EnumType.STRING)
    @Column(name = "usage_type")
    private UsageType usageType;

    @NotNull
    @Positive
    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "lease_length")
    private String leaseLength;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_schedule")
    private PaymentSchedule paymentSchedule;

    @Column(name = "improvements", length = 1000)
    private String improvements;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "map_link")
    private String mapLink;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LandStatus status = LandStatus.AVAILABLE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_tenant_id")
    private User currentTenant;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "land", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Payment> payments;

    public enum UsageType {
        AGRICULTURE, COMMERCIAL, RESIDENTIAL, PARKING
    }

    public enum PaymentSchedule {
        MONTHLY, QUARTERLY, SEMI_ANNUAL, YEARLY
    }

    public enum LandStatus {
        AVAILABLE, LEASED, MAINTENANCE, INACTIVE
    }

    // Constructors
    public Land() {}

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

    public UsageType getUsageType() { return usageType; }
    public void setUsageType(UsageType usageType) { this.usageType = usageType; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getLeaseLength() { return leaseLength; }
    public void setLeaseLength(String leaseLength) { this.leaseLength = leaseLength; }

    public PaymentSchedule getPaymentSchedule() { return paymentSchedule; }
    public void setPaymentSchedule(PaymentSchedule paymentSchedule) { this.paymentSchedule = paymentSchedule; }

    public String getImprovements() { return improvements; }
    public void setImprovements(String improvements) { this.improvements = improvements; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getMapLink() { return mapLink; }
    public void setMapLink(String mapLink) { this.mapLink = mapLink; }

    public LandStatus getStatus() { return status; }
    public void setStatus(LandStatus status) { this.status = status; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public User getCurrentTenant() { return currentTenant; }
    public void setCurrentTenant(User currentTenant) { this.currentTenant = currentTenant; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<Payment> getPayments() { return payments; }
    public void setPayments(List<Payment> payments) { this.payments = payments; }
}