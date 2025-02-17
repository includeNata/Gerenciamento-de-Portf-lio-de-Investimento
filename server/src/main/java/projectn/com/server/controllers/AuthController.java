package projectn.com.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectn.com.server.DTO.AuthResponseDTO;
import projectn.com.server.DTO.JwtAuthResponseDTO;
import projectn.com.server.DTO.LoginDTO;
import projectn.com.server.entities.User;
import projectn.com.server.services.AuthService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody String email){
        return authService.login(email);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody User user){
        return authService.register(user);
    }

    @GetMapping("/magic/token")
    public ResponseEntity<String> validationToken(){
        return authService.validationToken();
    }

    @GetMapping("/logout")
    public ResponseEntity<AuthResponseDTO> logout(){
        return authService.logout();
    }
}
