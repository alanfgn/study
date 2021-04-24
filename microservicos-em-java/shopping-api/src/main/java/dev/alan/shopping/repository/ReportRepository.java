package dev.alan.shopping.repository;

import dev.alan.shopping.model.Shop;
import dev.alan.shoppingclient.dto.ShopReportDTO;

import java.util.Date;
import java.util.List;

public interface ReportRepository {

    public List<Shop> getShopByFilters(
            Date dataInicio,
            Date dataFim,
            Float valorMinimo
    );

    public ShopReportDTO getReportByDate(
            Date dataInicio,
            Date dataFim
    );

}
