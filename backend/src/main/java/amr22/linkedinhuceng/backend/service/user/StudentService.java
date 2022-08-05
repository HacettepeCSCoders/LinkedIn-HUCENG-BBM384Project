package amr22.linkedinhuceng.backend.service.user;

import amr22.linkedinhuceng.backend.domain.model.user.Student;
import amr22.linkedinhuceng.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public void createStudent(Student student) {
        student.setPassword(this.passwordEncoder.encode(student.getPassword()));
        studentRepository.save(student);
    }

    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getById(String id) {
        return Optional
                .ofNullable(studentRepository.findById(Long.valueOf(id)).orElseThrow(IllegalStateException::new));
    }

    public List<Student> getApprovedStudents() {
        return studentRepository.findApprovedStudents();
    }

    public List<Student> getNonApprovedStudents() {
        return studentRepository.findNonApprovedStudents();
    }

    @Transactional
    public void updateStudent(String id, Student student) {

        Student studentToUpdate = studentRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalStateException("Student cannot be found"));

        studentToUpdate.setName(student.getName() == null ? studentToUpdate.getName() : student.getName());
        studentToUpdate.setSurname(student.getSurname() == null ? studentToUpdate.getSurname() : student.getSurname());
        studentToUpdate.setDate_of_birth(
                student.getDate_of_birth() == null ? studentToUpdate.getDate_of_birth() : student.getDate_of_birth());
        if (student.getPassword() != null) {
            studentToUpdate.setPassword(this.passwordEncoder.encode(student.getPassword()));
        }
        studentToUpdate.setStudent_number(student.getStudent_number() == null ? studentToUpdate.getStudent_number()
                : student.getStudent_number());
        studentToUpdate.setType(student.getType() == null ? studentToUpdate.getType() : student.getType());
        studentToUpdate.setIs_student_representative(student.getIs_student_representative() == null
                ? studentToUpdate.getIs_student_representative() : student.getIs_student_representative());
        studentToUpdate.setIs_approved(
                student.getIs_approved() == null ? studentToUpdate.getIs_approved() : student.getIs_approved());

        studentRepository.save(studentToUpdate);
    }

    public void deleteStudent(String id) {
        if (studentRepository.existsById(Long.valueOf(id)))
            studentRepository.deleteById(Long.valueOf(id));
        else
            throw new IllegalStateException("Student cannot be found");
    }

}
