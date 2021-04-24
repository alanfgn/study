package dev.alan.shopping.controller;

import dev.alan.shopping.service.ShopService;
import dev.alan.shoppingclient.dto.ShopDTO;
import dev.alan.shoppingclient.dto.ShopReportDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class ShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping("/shopping/")
    public List<ShopDTO> getShops() {
        return shopService.getAll();
    }

    @GetMapping("/shopping/user/{userIdentifier}")
    public List<ShopDTO> getShopsByUser(
            @PathVariable String userIdentifier
    ) {
        return shopService.getByUser(userIdentifier);
    }

    @GetMapping("/shopping/byDate/")
    public List<ShopDTO> getShopsByDate(
            @RequestBody ShopDTO shopDTO
    ) {
        return shopService.getDateGreaterThan(shopDTO);
    }

    @GetMapping("/shopping/{id}")
    public ShopDTO getShopsById(
            @PathVariable Long id
    ) {
        return shopService.findById(id);
    }

    @PostMapping("/shopping/")
    public ShopDTO getShopsById(
            @RequestHeader(name = "key", required = true) String key,
            @RequestBody ShopDTO shopDTO
    ) {
        return shopService.save(shopDTO, key);
    }

    @GetMapping("/shopping/search")
    public List<ShopDTO> getShopsByFilter(
            @RequestParam(name = "dataInicio", required = true)
            @DateTimeFormat(pattern = "dd/MM/yyyy")Date dataInicio,
            @RequestParam(name = "dataFim", required = false)
            @DateTimeFormat(pattern = "dd/MM/yyyy")Date dataFim,
            @RequestParam(name = "valorMinimo", required = false) Float valorMinimo
            ) {
        return shopService.getShopsByFilter(dataInicio, dataFim, valorMinimo);
    }

    @GetMapping("/shopping/report")
    public ShopReportDTO getShopsByDate(
            @RequestParam(name = "dataInicio", required = true)
            @DateTimeFormat(pattern = "dd/MM/yyyy")Date dataInicio,
            @RequestParam(name = "dataFim", required = false)
            @DateTimeFormat(pattern = "dd/MM/yyyy")Date dataFim
    ) {
        return shopService.getShopReport(dataInicio, dataFim);
    }
}
