package com.talentsprint.cycleshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.talentsprint.cycleshop.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
	void deleteByIdIn(List<Long> id);
//	List<Cart> findByIdIn(List<Long> id);
	void deleteById(Long id);
	Optional<Cart> findByCycleId(Long id);
}
