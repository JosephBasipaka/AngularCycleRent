package com.talentsprint.cycleshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.talentsprint.cycleshop.entity.Cart;
import com.talentsprint.cycleshop.entity.Cycle;
import com.talentsprint.cycleshop.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CycleService cycleService;

    public void addToCart(Cart cartItem) {
            cartRepository.save(cartItem);
        
    }

    public List<Cart> getCartItems() {
        return cartRepository.findAll();
    }

    public void removeFromCart(long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

    public double calculateTotalPrice(long price, int quantity) {
        return price * quantity;
    }
    
    public void deleteItemsFromCart(List<Long> cartItemId) {
    	System.out.println("deleted");
    	System.out.println(cartItemId);
    	List<Cart> itemsToDelete = cartRepository.findByIdIn(cartItemId);
    	cartRepository.deleteAll(itemsToDelete);
    }
}
