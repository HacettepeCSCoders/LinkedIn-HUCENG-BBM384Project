package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.user.Academician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademicianRepository extends JpaRepository<Academician, Long> {

    @Query("SELECT a FROM Academician a WHERE a.is_approved=true")
    List<Academician> findApprovedAcademicians();

    @Query("SELECT a FROM Academician a WHERE a.is_approved=false")
    List<Academician> findNonApprovedAcademicians();

}
