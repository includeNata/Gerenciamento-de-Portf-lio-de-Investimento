package projectn.com.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectn.com.server.DTO.AuthResponseDTO;
import projectn.com.server.DTO.JwtAuthResponseDTO;
import projectn.com.server.DTO.LoginDTO;
import projectn.com.server.entities.User;
import projectn.com.server.services.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO){
        return authService.login(loginDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody User user){
        return authService.register(user);
    }

    @GetMapping("/{token}")
    public ResponseEntity<String> validationToken(@PathVariable String token){
        System.out.println("dlfnpkdfnkdsbdskklbsdklf");
        return authService.validationToken(token);
    }
}
