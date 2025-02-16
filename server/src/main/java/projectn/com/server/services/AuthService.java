package projectn.com.server.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;
import projectn.com.server.DTO.AuthResponseDTO;
import projectn.com.server.DTO.LoginDTO;
import projectn.com.server.entities.User;
import projectn.com.server.repositories.UserRepository;

import java.net.URLDecoder;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private HttpServletRequest request;

    public ResponseEntity<AuthResponseDTO> login(String email) {
        try {
            String emailDecodificado = URLDecoder.decode(email, "UTF-8").replace("=", "");
            Optional<User> userOptional = userRepository.findByEmail(emailDecodificado);

            if (userOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Usuário não encontrado", "404", null));
            }

            User user = userOptional.get();

            Cookie cookie = tokenService.generateToken(user);

            if (cookie == null) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Erro para criar magic link", "500", null));
            }

            String url = "http://localhost:3000/auth/magic";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Seu Magic Link");
            message.setText("Clique no link para fazer login: " + url);
            mailSender.send(message);

            return ResponseEntity.ok().body(new AuthResponseDTO(url, "200", new LoginDTO(user.getEmail(), cookie.getValue())));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponseDTO("Erro para criar magic link", "500", null));
        }
    }


    public ResponseEntity<AuthResponseDTO> register(User user) {
        Optional<User> userAux = userRepository.findByEmail(user.getEmail());

        if(userAux.isPresent()) {
            return ResponseEntity.badRequest().body(new AuthResponseDTO("Email já está sendo utilizado", "400", null));
        }

        Cookie cookie = tokenService.generateToken(user);

        if(cookie == null) {
            return ResponseEntity.badRequest().body(new AuthResponseDTO("Email inválido", "400", null));
        }

        user.setId(null);
        userRepository.save(user);
        return ResponseEntity.ok().body(new AuthResponseDTO("Registro feito com sucesso", "200", new LoginDTO(user.getEmail(), cookie.getValue())));
    }

    public ResponseEntity<String> validationToken() {
        try {
            Cookie cookie = WebUtils.getCookie(request, "accessToken");

            if (cookie == null) {
                return ResponseEntity.badRequest().body("Nenhum cookie encontrado na requisição.");
            }

            String tokenFromCookie = cookie.getValue();

            if (tokenFromCookie != null && !tokenFromCookie.isEmpty()) {
                String validatedUser = tokenService.validateToken(tokenFromCookie);

                if (validatedUser != null && !validatedUser.isEmpty()) {
                    return ResponseEntity.ok().body("Token validado com sucesso para o usuário: " + validatedUser);
                } else {
                    return ResponseEntity.badRequest().body("Token inválido ou expirado.");
                }
            }

            return ResponseEntity.badRequest().body("Cookie 'accessToken' não encontrado.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao validar o token: " + e.getMessage());
        }
    }

}
