package com.talentsprint.cycleshop.controller;

import java.security.Principal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.talentsprint.cycleshop.entity.Cart;
import com.talentsprint.cycleshop.entity.Cycle;
import com.talentsprint.cycleshop.entity.Orders;
import com.talentsprint.cycleshop.entity.User;
import com.talentsprint.cycleshop.exception.CycleShopBusinessException;
import com.talentsprint.cycleshop.repository.UserRepository;
import com.talentsprint.cycleshop.service.CartService;
import com.talentsprint.cycleshop.service.CycleService;
import com.talentsprint.cycleshop.service.OrderService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class CycleRestController {

	@Autowired
	private CycleService cycleService;
	@Autowired
	private CartService cartService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	/*
	 * For example, /1/borrow?count=3 borrows 3 cycles of id 1.
	 */

	@GetMapping("/registration")

	public String registrationForm(Model model) {

		return "userRegistration";

	}
	@PostMapping("/{id}/borrow")
    public List<Cycle> borrowCycle(@PathVariable long id, @RequestParam(required=false, defaultValue="1") int count) {
        cycleService.borrowCycle(id, count);
        //just a comment
        return all(); //TODO: redirect to List handler
    }

    @PostMapping("/{id}/return")
    public List<Cycle> returnCycle(@PathVariable long id, @RequestParam(required=false, defaultValue="1") int count) {
        cycleService.returnCycle(id, count);
        return all();//TODO: redirect to list handler
    }

    @PostMapping("/{id}/restock")
    public List<Cycle> restockCycle(@PathVariable long id, @RequestParam(required=false, defaultValue="1") int count) {
        cycleService.restockBy(id, count);
        return all();
    }

    @GetMapping("/list")
    public List<Cycle> listAvailableCycles(Model model) {
        var allCycles = cycleService.listAvailableCycles();
        model.addAttribute("allCycles", allCycles);
        return all();
    }

    @GetMapping("/{id}")
    public String cycleDetail(@PathVariable long id, Model model) {
        var cycle = cycleService.findByIdOrThrow404(id);
        model.addAttribute("cycle", cycle);
        return "cycleDetail";
    }

    @GetMapping("/cart")
    public List<Cart> getRentedCycles(Model model){
    	return cartService.getCartItems();
    }
    @GetMapping("/orders")
    public List<Orders> getOrderedCycles(Model model){
    	return orderService.getAllOrders();
    }

	@GetMapping("/cycle/list")
	public List<Cycle> all() {
		//Jwt jwt = (Jwt) authentication.getPrincipal();
		//System.out.println(jwt.getClaimAsString("scope"));
		return cycleService.listCycles();
	}
//	@PostMapping("/cart/add")
//	public ResponseEntity<String> addToCart(@RequestParam long cycleId, @RequestParam int quantity) {
//	    double totalPrice = cartService.calculateTotalPrice(cycleId, quantity);
//
//	    Cart cartItem = new Cart();
//	    cartItem.setCycleId(cycleId);
//	    cartItem.setQuantity(quantity);
////	    cartItem.setTotalPrice(totalPrice);
//
//	    cartService.addToCart(cartItem);
//	
//	    return ResponseEntity.ok("Cycle added to cart successfully.");
//	}
//
//	@GetMapping("/cart")
//	public List<Cart> getCartItems() {
//	    List<Cart> cartItems = cartService.getCartItems();
//	    return cartItems;
//	}
	@PostMapping("/{id}/rent")
	public List<Cycle> rentCycle(@PathVariable long id, @RequestParam(required = false, defaultValue = "1") int count) {
	
	        cycleService.rentCycle(id, count);
	        Cart cartItem = new Cart();
	        cartItem.setCycle(cycleService.findByIdOrThrow404(id));
	        cartItem.setQuantity(count);
	        cartItem.setTotalPrice((double)(cycleService.findByIdOrThrow404(id).getPrice()*count));
	        cartService.addToCart(cartItem);
	        return all();
	    
	}

	@PostMapping("/orders")
	public ResponseEntity<Map<String,String>> createOrders(@RequestBody List<Orders> orders) {
   	 	List<Orders> createdOrders = orderService.createOrder(orders);
   	 	List<Long> itemIdsToDelete = orders.stream()
            .map(order -> order.getCycle().getId())
            .collect(Collectors.toList());
   	 	
        cartService.deleteItemsFromCart(itemIdsToDelete);
    	Map<String, String> response = new HashMap<>();
	    response.put("message", "Orders created successfully");
	    response.put("orderCount", String.valueOf(createdOrders.size())); 
	    return ResponseEntity.ok(response);
}


}