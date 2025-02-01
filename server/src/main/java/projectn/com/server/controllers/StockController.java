package projectn.com.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projectn.com.server.entities.Stock;
import projectn.com.server.services.StockService;

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
}
