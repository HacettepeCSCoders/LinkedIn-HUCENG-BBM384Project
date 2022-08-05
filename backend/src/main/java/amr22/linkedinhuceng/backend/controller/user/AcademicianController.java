package amr22.linkedinhuceng.backend.controller.user;

import amr22.linkedinhuceng.backend.domain.model.user.Academician;
import amr22.linkedinhuceng.backend.service.user.AcademicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/academicians")
public class AcademicianController {

    private final AcademicianService academicianService;

    @Autowired
    public AcademicianController(AcademicianService academicianService) {
        this.academicianService = academicianService;
    }

    // post mapping yapılacak
    // response status kurulacak
    // generic response oluşturulabilir
    // MethodArgumentNotValidException handle unutma

    @PostMapping
    public void createAcademician(@RequestBody Academician academician) {
        academicianService.createAcademician(academician);
    }

    @GetMapping("/getAllAcademicians")
    public List<Academician> getAll() {
        return academicianService.getAcademicians();
    }

    @GetMapping("/{id}")
    public Optional<Academician> getById(@PathVariable String id) {
        return academicianService.getById(id);
    }

    @GetMapping("/approved")
    public List<Academician> getApprovedAcademicians() {
        return academicianService.getApprovedAcademicians();
    }

    @GetMapping("/nonapproved")
    public List<Academician> getNonApprovedAcademicians() {
        return academicianService.getNonApprovedAcademicians();
    }

    @PutMapping("/{id}")
    public void updateAcademician(@PathVariable String id, @RequestBody Academician academician) {
        academicianService.updateAcademician(id, academician);
    }

    @DeleteMapping("/{id}")
    public void deleteAcademician(@PathVariable String id) {
        academicianService.deleteAcademician(id);
    }

    @GetMapping("/getByUsername/{username}")
    public Optional<Academician> getByUsername(@PathVariable String username) {
        return academicianService.getByUsername(username);
    }

}
