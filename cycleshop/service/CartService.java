package com.talentsprint.cycleshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.talentsprint.cycleshop.entity.Cart;
import com.talentsprint.cycleshop.entity.Cycle;
import com.talentsprint.cycleshop.repository.CartRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CycleService cycleService;

    public void addToCart(Cart cartItem) {
            cartRepository.save(cartItem);
        
    }
    public Optional<Cart> getCartItemByCycleId(long cycleId) {
        return cartRepository.findByCycleId(cycleId);
    }
	public void updateCartItem(Cart cartItem) {
        cartRepository.save(cartItem);
    }
    public List<Cart> getCartItems() {
        return cartRepository.findAll();
    }
    
    @Transactional
    public void removeFromCart(long cartItemId) {
    	System.out.println("hii");
        cartRepository.deleteById(cartItemId);
    }

    public double calculateTotalPrice(long price, int quantity) {
        return price * quantity;
    }
    
    @Transactional
    public void deleteItemsFromCart(List<Long> cartItemId) {
    	cartRepository.deleteByIdIn(cartItemId);
    }
}
