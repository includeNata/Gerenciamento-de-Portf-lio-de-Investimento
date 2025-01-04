package projectn.com.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projectn.com.server.entities.Fii;
import projectn.com.server.services.FiiService;

import java.util.List;

@RestController
@RequestMapping("/fiis")
@CrossOrigin(origins = "http://localhost:3000/")
public class FiiController {

    @Autowired
    private FiiService fiiService;

    @GetMapping
    public ResponseEntity<Page<Fii>> findAll(Pageable pageable) {
        return ResponseEntity.ok(fiiService.findAll(pageable));
    }
}
