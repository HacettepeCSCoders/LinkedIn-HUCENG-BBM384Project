package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.user.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

}
