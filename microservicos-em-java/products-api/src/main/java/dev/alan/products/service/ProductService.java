package dev.alan.products.service;

import dev.alan.products.dto.DTOConverter;
import dev.alan.products.model.Product;
import dev.alan.products.repository.CategoryRepository;
import dev.alan.products.repository.ProductRepository;
import dev.alan.shoppingclient.dto.ProductDTO;
import dev.alan.shoppingclient.exception.CategoryNotFoundException;
import dev.alan.shoppingclient.exception.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<ProductDTO> getProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(DTOConverter::convertProductDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategoryId(Long categoryId) {
        List<Product> products = productRepository.getProductByCategory(categoryId);
        return products.stream().map(DTOConverter::convertProductDTO).collect(Collectors.toList());
    }

    public ProductDTO getProductByProductIdentifier(String productIdentifier) {
        Product product = productRepository.findByProductIdentifier(productIdentifier);
        if(product != null) {
            return DTOConverter.convertProductDTO(product);
        }
        throw new ProductNotFoundException();
    }

    public ProductDTO save(ProductDTO productDTO) {
        if(!categoryRepository.existsById(productDTO.getCategory().getId())) {
            throw new CategoryNotFoundException();
        }

        Product product = productRepository.save(Product.convert(productDTO));
        return DTOConverter.convertProductDTO(product);
    }

    public void delete(Long id){
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()) {
            productRepository.delete(product.get());
            return;
        }
        throw new ProductNotFoundException();
    }
}
