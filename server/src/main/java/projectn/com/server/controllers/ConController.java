package projectn.com.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projectn.com.server.entities.Coin;
import projectn.com.server.services.CoinService;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class ConController {

    @Autowired
    private CoinService coinService;

    @GetMapping
    public ResponseEntity<List<Coin>> findAll() {
        return ResponseEntity.ok(coinService.findAll());
    }
}
