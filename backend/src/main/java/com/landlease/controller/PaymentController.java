package com.landlease.controller;

import com.landlease.entity.Payment;
import com.landlease.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<Payment>> getPaymentsByTenant(@PathVariable Long tenantId) {
        return ResponseEntity.ok(paymentService.getPaymentsByTenant(tenantId));
    }
    
    @GetMapping("/land/{landId}")
    public ResponseEntity<List<Payment>> getPaymentsByLand(@PathVariable Long landId) {
        return ResponseEntity.ok(paymentService.getPaymentsByLand(landId));
    }
    
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Payment>> getPaymentsByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(paymentService.getPaymentsByOwner(ownerId));
    }
    
    @GetMapping("/overdue")
    public ResponseEntity<List<Payment>> getOverduePayments() {
        return ResponseEntity.ok(paymentService.getOverduePayments());
    }
    
    @GetMapping("/pending")
    public ResponseEntity<List<Payment>> getPendingPayments() {
        return ResponseEntity.ok(paymentService.getPendingPayments());
    }
    
    @GetMapping("/revenue")
    public ResponseEntity<BigDecimal> getTotalRevenue(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        return ResponseEntity.ok(paymentService.getTotalRevenue(startDate, endDate));
    }
    
    @PostMapping
    public ResponseEntity<Payment> createPayment(
            @Valid @RequestBody Payment payment,
            @RequestParam Long landId,
            @RequestParam Long tenantId) {
        try {
            Payment createdPayment = paymentService.createPayment(payment, landId, tenantId);
            return ResponseEntity.ok(createdPayment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @Valid @RequestBody Payment payment) {
        return paymentService.updatePayment(id, payment)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{id}/mark-paid")
    public ResponseEntity<Payment> markPaymentAsPaid(
            @PathVariable Long id,
            @RequestBody Map<String, String> paymentDetails) {
        String paymentMethod = paymentDetails.get("paymentMethod");
        String transactionId = paymentDetails.get("transactionId");
        
        return paymentService.markPaymentAsPaid(id, paymentMethod, transactionId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/update-overdue")
    public ResponseEntity<?> updateOverduePayments() {
        paymentService.updateOverduePayments();
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable Long id) {
        if (paymentService.deletePayment(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}