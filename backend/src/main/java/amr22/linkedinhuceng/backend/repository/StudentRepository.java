package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s WHERE s.is_approved=true")
    List<Student> findApprovedStudents();

    @Query("SELECT s FROM Student s WHERE s.is_approved=false")
    List<Student> findNonApprovedStudents();

}
