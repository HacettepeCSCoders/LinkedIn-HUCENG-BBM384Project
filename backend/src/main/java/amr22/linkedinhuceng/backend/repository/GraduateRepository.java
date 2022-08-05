package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.user.Graduate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GraduateRepository extends JpaRepository<Graduate, Long> {

    @Query("SELECT g FROM Graduate g WHERE g.is_approved=true")
    List<Graduate> findApprovedGraduates();

    @Query("SELECT g FROM Graduate g WHERE g.is_approved=false")
    List<Graduate> findNonApprovedGraduates();

    Optional<Graduate> findByUsername(String username);

}
