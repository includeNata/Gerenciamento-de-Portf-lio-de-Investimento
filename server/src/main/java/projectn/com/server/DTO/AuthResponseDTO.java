package projectn.com.server.DTO;

import projectn.com.server.entities.User;

public class AuthResponseDTO {
    private String message;
    private String status;
    private LoginDTO user;

    public AuthResponseDTO(String message, String status, LoginDTO user) {
        this.message = message;
        this.status = status;
        this.user = user;
    }

    // Getters e Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LoginDTO getUser() {
        return user;
    }

    public void setUser(LoginDTO user) {
        this.user = user;
    }
}
