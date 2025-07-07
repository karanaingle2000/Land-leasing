package com.landlease.repository;

import com.landlease.entity.Land;
import com.landlease.entity.Payment;
import com.landlease.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByTenant(User tenant);
    
    List<Payment> findByLand(Land land);
    
    List<Payment> findByStatus(Payment.PaymentStatus status);
    
    List<Payment> findByDueDateBefore(LocalDate date);
    
    @Query("SELECT p FROM Payment p WHERE p.status = 'OVERDUE'")
    List<Payment> findOverduePayments();
    
    @Query("SELECT p FROM Payment p WHERE p.dueDate BETWEEN ?1 AND ?2")
    List<Payment> findPaymentsBetweenDates(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'PAID' AND p.paidDate BETWEEN ?1 AND ?2")
    BigDecimal getTotalPaidAmountBetweenDates(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT COUNT(p) FROM Payment p WHERE p.status = ?1")
    long countByStatus(Payment.PaymentStatus status);
    
    @Query("SELECT p FROM Payment p WHERE p.land.owner = ?1")
    List<Payment> findByLandOwner(User owner);
}