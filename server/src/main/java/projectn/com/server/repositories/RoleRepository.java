package projectn.com.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projectn.com.server.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
}
