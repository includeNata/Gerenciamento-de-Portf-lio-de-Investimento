package projectn.com.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectn.com.server.entities.Coin;
import projectn.com.server.services.CoinService;

import java.util.List;

@RestController
@RequestMapping("/coins")
@CrossOrigin(origins = "http://localhost:3000/")
public class CoinController {

    @Autowired
    private CoinService coinService;

    @GetMapping
    public ResponseEntity<List<Coin>> findAll() {
        return ResponseEntity.ok(coinService.findAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Coin> findByName(@PathVariable String name) {
        return ResponseEntity.ok(coinService.findByName(name));
    }
}
