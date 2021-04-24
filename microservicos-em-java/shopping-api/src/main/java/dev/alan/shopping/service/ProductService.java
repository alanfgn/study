package dev.alan.shopping.service;

import dev.alan.shoppingclient.dto.ProductDTO;
import dev.alan.shoppingclient.exception.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class ProductService {

    @Value("${PRODUCT_API_URL:http://localhost:8081/products}")
    public String productApi;

    public ProductDTO getProductByProductIdentifier(String productIdentifier) {
      try {
          RestTemplate restTemplate = new RestTemplate();
          String url = productApi + "/" + productIdentifier;

          ResponseEntity<ProductDTO> response = restTemplate.getForEntity(url, ProductDTO.class);
          return response.getBody();
      } catch (HttpClientErrorException.NotFound e) {
          throw new ProductNotFoundException();
      }
    }
}
