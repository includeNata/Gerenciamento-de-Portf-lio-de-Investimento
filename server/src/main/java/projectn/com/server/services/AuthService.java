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
import projectn.com.server.entities.Role;
import projectn.com.server.entities.User;
import projectn.com.server.repositories.RoleRepository;
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
    @Autowired
    private RoleRepository roleRepository;

    public ResponseEntity<AuthResponseDTO> login(String email) {
        try {
            String emailDecodificado = URLDecoder.decode(email, "UTF-8").replace("=", "");
            Optional<User> userOptional = userRepository.findByEmail(emailDecodificado);

            if (userOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Usuário não encontrado", "404", null));
            }

            User user = userOptional.get();

            if (tokenService.generateToken(user) == null) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Erro para criar magic link", "500", null));
            }

            String url = "http://localhost:3000/auth/magic";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Seu Magic Link");
            message.setText("Clique no link para fazer login: " + url);
            mailSender.send(message);

            Cookie cookie = new Cookie("user-id", String.valueOf(user.getId()));
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");

            return ResponseEntity.ok().body(new AuthResponseDTO(url, "200", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponseDTO("Erro para criar magic link", "500", null));
        }
    }


    public ResponseEntity<AuthResponseDTO> register(User user) {
        try {
            Optional<User> userAux = userRepository.findByEmail(user.getEmail());
            if (userAux.isPresent()) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Email já está sendo utilizado", "400", null));
            }

            Optional<Role> roleOptional = roleRepository.findById(2L);
            if (roleOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Role com ID 2 não encontrada", "400", null));
            }

            Role role = roleOptional.get();

            user.getRoles().add(role);


            if (tokenService.generateToken(user) == null) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Erro para criar token", "500", null));
            }

            User userSave = userRepository.save(user);

            Cookie cookie = new Cookie("user-id", String.valueOf(userSave.getId()));
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");

            return ResponseEntity.ok().body(new AuthResponseDTO("Registro feito com sucesso", "200", user));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponseDTO("Erro ao registrar usuário", "500", null));
        }
    }

    public ResponseEntity<AuthResponseDTO> logout() {
        try {
            Cookie cookieToken = WebUtils.getCookie(request, "accessToken");
            Cookie cookieId = WebUtils.getCookie(request, "userId");

            if (cookieToken == null || cookieId == null) {
                return ResponseEntity.badRequest().body(new AuthResponseDTO("Nenhum cookie encontrado", "400", null));
            }

            cookieToken.setValue(null);
            cookieToken.setMaxAge(0);
            cookieToken.setPath("/");

            cookieId.setValue(null);
            cookieId.setMaxAge(0);
            cookieId.setPath("/");

            ResponseEntity.ok().header("Set-Cookie", cookieToken.toString())
                    .header("Set-Cookie", cookieId.toString())
                    .build();

            return ResponseEntity.ok().body(new AuthResponseDTO("Logout realizado com sucesso", "200", null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponseDTO("Erro ao realizar o logout", "500", null));
        }
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
