package com.talentsprint.cycleshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.talentsprint.cycleshop.entity.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
}
