package dev.alan.products.controller;

import dev.alan.products.service.ProductService;
import dev.alan.shoppingclient.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products/")
    public List<ProductDTO> listProducts(){
        return productService.getProducts();
    }

    @GetMapping("/products/category/{categoryId}")
    public List<ProductDTO> listProductsByCategory(@PathVariable Long categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @GetMapping("/products/{productIdentifier}")
    public ProductDTO getProductByProductIdentifier(
            @PathVariable String productIdentifier
    ) {
        return  productService.getProductByProductIdentifier(productIdentifier);
    }

    @PostMapping("/products/")
    public ProductDTO saveProduct(
            @Valid @RequestBody ProductDTO productDTO
    ) {
      return productService.save(productDTO);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.delete(id);
    }

}
