package projectn.com.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import projectn.com.server.DTO.JwtAuthResponseDTO;
import projectn.com.server.DTO.LoginDTO;
import projectn.com.server.services.AuthService;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDTO> login(@RequestBody LoginDTO loginDTO){
        String token = authService.login(loginDTO);
        JwtAuthResponseDTO responseDTO = new JwtAuthResponseDTO(token,"Bearer");
        return ResponseEntity.ok(responseDTO);
    }
}
