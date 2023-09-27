package com.talentsprint.cycleshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talentsprint.cycleshop.entity.Orders;
import com.talentsprint.cycleshop.repository.OrderRepository;

import jakarta.persistence.criteria.Order;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

	@Autowired
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Create a new order
    public List<Orders> createOrder(List<Orders> orders) {
    	LocalDateTime createdTime = LocalDateTime.now();
    	for(Orders order : orders) {
    		order.setOrderDate(createdTime);
    	}
        return orderRepository.saveAll(orders);
    }

    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public void save(Orders order) {
    	orderRepository.save(order);
    }
    public Optional<Orders> findById(long orderId){
    	return orderRepository.findById(orderId);
    }
}
