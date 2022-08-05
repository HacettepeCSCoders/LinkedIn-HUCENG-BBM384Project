package amr22.linkedinhuceng.backend.controller.user;

import amr22.linkedinhuceng.backend.domain.model.user.Student;
import amr22.linkedinhuceng.backend.service.user.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // post mapping yapılacak
    // response status kurulacak
    // generic response oluşturulabilir
    // MethodArgumentNotValidException handle unutma

    @PostMapping
    public void createStudent(@RequestBody Student student) {
        studentService.createStudent(student);
    }

    @GetMapping("/getAllStudents")
    public List<Student> getAll() {
        return studentService.getStudents();
    }

    @GetMapping("/{id}")
    public Optional<Student> getById(@PathVariable String id) {
        return studentService.getById(id);
    }

    @GetMapping("/approved")
    public List<Student> getApprovedStudents() {
        return studentService.getApprovedStudents();
    }

    @GetMapping("/nonapproved")
    public List<Student> getNonApprovedStudents() {
        return studentService.getNonApprovedStudents();
    }

    @PutMapping("/{id}")
    public void updateStudent(@PathVariable String id, @RequestBody Student student) {
        studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
    }

    @GetMapping("/getByUsername/{username}")
    public Optional<Student> getByUsername(@PathVariable String username) {
        return studentService.getByUsername(username);
    }

}
