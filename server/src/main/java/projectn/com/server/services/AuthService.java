package projectn.com.server.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import projectn.com.server.DTO.AuthResponseDTO;
import projectn.com.server.DTO.LoginDTO;
import projectn.com.server.entities.User;
import projectn.com.server.repositories.UserRepository;
import projectn.com.server.security.JwtTokenProvider;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private HttpServletRequest request;


    public ResponseEntity<AuthResponseDTO> login(LoginDTO loginDTO) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginDTO.email());

            if (userOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("User not found", "404", null));
            }

            User user = userOptional.get();

            Cookie cookie = tokenService.generateToken(user);

            if (cookie == null) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Error generating magic link", "500", null));
            }

            String url = "http://localhost:8080/login/magic?token=" + cookie.getValue();

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Seu Magic Link");
            message.setText("Clique no link para fazer login: " + url);
            mailSender.send(message);

            return ResponseEntity.ok().body(new AuthResponseDTO("Magic link sent to your email", "200", user));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponseDTO("Error generating magic link", "500", null));
        }
    }


    public ResponseEntity<AuthResponseDTO> register(User user) {
        Optional<User> userAux = userRepository.findByEmail(user.getEmail());

        if(userAux.isPresent()) {
            return ResponseEntity.badRequest().body(new AuthResponseDTO("Email already in use", "400", null));
        }

        Cookie cookie = tokenService.generateToken(user);

        if(cookie == null) {
            return ResponseEntity.badRequest().body(new AuthResponseDTO("Invalid email", "400", null));
        }

        return ResponseEntity.ok().body(new AuthResponseDTO("Login Successful", "200", user));
    }

    public ResponseEntity<String> validationToken(String token) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("accessToken")) {
                    if(Objects.equals(cookie.getValue(), token.replace("token=", ""))){
                        return ResponseEntity.ok().body("Token Successfully Validated");
                    }
                }
            }
        }

        return ResponseEntity.badRequest().body("Invalid token");
    }
}
