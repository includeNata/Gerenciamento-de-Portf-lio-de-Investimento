package projectn.com.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import projectn.com.server.DTO.LoginDTO;
import projectn.com.server.security.JwtTokenProvider;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    public String login(LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDTO.email(),
                loginDTO.password()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }
}
