package dev.alan.products.dto;

import dev.alan.products.model.Category;
import dev.alan.products.model.Product;
import dev.alan.shoppingclient.dto.CategoryDTO;
import dev.alan.shoppingclient.dto.ProductDTO;


public class DTOConverter {

    public static CategoryDTO convertCategoryDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setNome(category.getNome());
        return categoryDTO;
    }

    public static ProductDTO convertProductDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setNome(product.getNome());
        productDTO.setPreco(product.getPreco());
        productDTO.setDescricao(product.getDescricao());
        productDTO.setProductIdentifier(product.getProductIdentifier());

        if(product.getCategory() != null) {
            productDTO.setCategory(DTOConverter.convertCategoryDTO(product.getCategory()));
        }
        return productDTO;
    }

}
