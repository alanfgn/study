package dev.alan.shopping.dto;

import dev.alan.shopping.model.Item;
import dev.alan.shopping.model.Shop;
import dev.alan.shoppingclient.dto.ItemDTO;
import dev.alan.shoppingclient.dto.ShopDTO;

import java.util.stream.Collectors;

public class DTOConverter {

    public static ItemDTO convertItemDTO(Item item) {
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setProductIdentifier(item.getProductIdentifier());
        itemDTO.setPrice(item.getPrice());
        return itemDTO;
    }

    public static ShopDTO convertShopDTO(Shop shop) {
        ShopDTO shopDTO = new ShopDTO();
        shopDTO.setId(shop.getId());
        shopDTO.setUserIdentifier(shop.getUserIdentifier());
        shopDTO.setTotal(shop.getTotal());
        shopDTO.setDate(shop.getDate());
        shopDTO.setItems(shop.getItems().stream().map(DTOConverter::convertItemDTO).collect(Collectors.toList()));
        return shopDTO;
    }
}
