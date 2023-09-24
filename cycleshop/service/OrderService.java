package com.talentsprint.cycleshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talentsprint.cycleshop.entity.Orders;
import com.talentsprint.cycleshop.repository.OrderRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
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

    // Get all orders
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

}
