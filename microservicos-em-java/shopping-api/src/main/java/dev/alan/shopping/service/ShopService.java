package dev.alan.shopping.service;

import dev.alan.shopping.dto.DTOConverter;
import dev.alan.shopping.model.Shop;
import dev.alan.shopping.repository.ShopRepository;
import dev.alan.shoppingclient.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShopService {

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    public List<ShopDTO> getAll() {
        List<Shop> shops = shopRepository.findAll();
        return shops.stream().map(DTOConverter::convertShopDTO).collect(Collectors.toList());
    }

    public List<ShopDTO> getByUser(String userIdentifier) {
        List<Shop> shops = shopRepository.findAllByUserIdentifier(userIdentifier);
        return shops.stream().map(DTOConverter::convertShopDTO).collect(Collectors.toList());
    }

    public List<ShopDTO> getTotalGreaterThan(Float total) {
        List<Shop> shops = shopRepository.findAllByTotalGreaterThan(total);
        return shops.stream().map(DTOConverter::convertShopDTO).collect(Collectors.toList());
    }

    public List<ShopDTO> getDateGreaterThan(ShopDTO shopDTO) {
        List<Shop> shops = shopRepository.findAllByDateGreaterThan(shopDTO.getDate());
        return shops.stream().map(DTOConverter::convertShopDTO).collect(Collectors.toList());
    }

    public ShopDTO findById(Long id) {
        Optional<Shop> shop = shopRepository.findById(id);
        if(shop.isPresent()) {
            return DTOConverter.convertShopDTO(shop.get());
        }
        return null;
    }

    public ShopDTO save(ShopDTO shopDTO, String key) {

        UserDTO userDTO = userService.getUserByCpfAndKey(shopDTO.getUserIdentifier(), key);
        if(userDTO == null) {
            return null;
        }

        if(!this.validateProducts(shopDTO.getItems())) {
            return null;
        }

        shopDTO.setTotal(shopDTO.getItems()
                .stream()
                .map(x -> x.getPrice())
                .reduce((float) 0, Float::sum));

        shopDTO.setDate(new Date());
        Shop shop = Shop.convert(shopDTO);
        shop = shopRepository.save(shop);

        return DTOConverter.convertShopDTO(shop);
    }

    public boolean validateProducts(List<ItemDTO> itemDTOS) {
        for(ItemDTO itemDTO : itemDTOS) {
            ProductDTO productDTO = productService.getProductByProductIdentifier(itemDTO.getProductIdentifier());
            if(productDTO == null) {
                return false;
            }
            itemDTO.setPrice(productDTO.getPreco());
        }
        return true;
    }

    public List<ShopDTO> getShopsByFilter(
            Date dataInicio, Date dataFim, Float valorMinimo
    ) {
        List<Shop> shops = shopRepository.getShopByFilters(dataInicio, dataFim, valorMinimo);
        return shops.stream().map(DTOConverter::convertShopDTO).collect(Collectors.toList());
    }

    public ShopReportDTO getShopReport(Date dataInicio, Date dataFim) {
        return  shopRepository.getReportByDate(dataInicio, dataFim);
    }

}
