package com.landlease.service;

import com.landlease.entity.Payment;
import com.landlease.entity.Land;
import com.landlease.entity.User;
import com.landlease.repository.PaymentRepository;
import com.landlease.repository.LandRepository;
import com.landlease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private LandRepository landRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }
    
    public List<Payment> getPaymentsByTenant(Long tenantId) {
        return userRepository.findById(tenantId)
                .map(paymentRepository::findByTenant)
                .orElse(List.of());
    }
    
    public List<Payment> getPaymentsByLand(Long landId) {
        return landRepository.findById(landId)
                .map(paymentRepository::findByLand)
                .orElse(List.of());
    }
    
    public List<Payment> getPaymentsByOwner(Long ownerId) {
        return userRepository.findById(ownerId)
                .map(paymentRepository::findByLandOwner)
                .orElse(List.of());
    }
    
    public Payment createPayment(Payment payment, Long landId, Long tenantId) {
        Land land = landRepository.findById(landId)
                .orElseThrow(() -> new RuntimeException("Land not found"));
        User tenant = userRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        
        payment.setLand(land);
        payment.setTenant(tenant);
        return paymentRepository.save(payment);
    }
    
    public Optional<Payment> updatePayment(Long id, Payment paymentDetails) {
        return paymentRepository.findById(id)
                .map(payment -> {
                    payment.setAmount(paymentDetails.getAmount());
                    payment.setLateFee(paymentDetails.getLateFee());
                    payment.setDueDate(paymentDetails.getDueDate());
                    payment.setPaidDate(paymentDetails.getPaidDate());
                    payment.setStatus(paymentDetails.getStatus());
                    payment.setPaymentMethod(paymentDetails.getPaymentMethod());
                    payment.setTransactionId(paymentDetails.getTransactionId());
                    payment.setStripePaymentId(paymentDetails.getStripePaymentId());
                    payment.setNotes(paymentDetails.getNotes());
                    return paymentRepository.save(payment);
                });
    }
    
    public Optional<Payment> markPaymentAsPaid(Long id, String paymentMethod, String transactionId) {
        return paymentRepository.findById(id)
                .map(payment -> {
                    payment.setStatus(Payment.PaymentStatus.PAID);
                    payment.setPaidDate(LocalDate.now());
                    payment.setPaymentMethod(paymentMethod);
                    payment.setTransactionId(transactionId);
                    return paymentRepository.save(payment);
                });
    }
    
    public List<Payment> getOverduePayments() {
        return paymentRepository.findOverduePayments();
    }
    
    public List<Payment> getPendingPayments() {
        return paymentRepository.findByStatus(Payment.PaymentStatus.PENDING);
    }
    
    public BigDecimal getTotalRevenue(LocalDate startDate, LocalDate endDate) {
        BigDecimal total = paymentRepository.getTotalPaidAmountBetweenDates(startDate, endDate);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    public void updateOverduePayments() {
        List<Payment> overduePayments = paymentRepository.findByDueDateBefore(LocalDate.now());
        for (Payment payment : overduePayments) {
            if (payment.getStatus() == Payment.PaymentStatus.PENDING) {
                payment.setStatus(Payment.PaymentStatus.OVERDUE);
                // Calculate late fee (5% of amount)
                BigDecimal lateFee = payment.getAmount().multiply(new BigDecimal("0.05"));
                payment.setLateFee(lateFee);
                paymentRepository.save(payment);
            }
        }
    }
    
    public boolean deletePayment(Long id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}