package projectn.com.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectn.com.server.DTO.StockDTO;
import projectn.com.server.entities.Stock;
import projectn.com.server.services.StockService;

import java.util.List;

@RestController
@RequestMapping("stock")
@CrossOrigin(origins = "http://localhost:3000/")
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping
    public ResponseEntity<Page<Stock>> findAll(Pageable pageable) {
        return ResponseEntity.ok(stockService.findAll(pageable));
    }

    @PostMapping
    public List<Stock> recommendationStock(@RequestBody List<StockDTO> stocks) {
        return stockService.recommendationStock(stocks);
    }
}
