package amr22.linkedinhuceng.backend.controller.user;

import amr22.linkedinhuceng.backend.domain.model.user.Graduate;
import amr22.linkedinhuceng.backend.service.user.GraduateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/graduates")
public class GraduateController {

    private final GraduateService graduateService;

    @Autowired
    public GraduateController(GraduateService graduateService) {
        this.graduateService = graduateService;
    }

    // post mapping yapılacak
    // response status kurulacak
    // generic response oluşturulabilir
    // MethodArgumentNotValidException handle unutma

    @PostMapping
    public void createGraduate(@RequestBody Graduate graduate) {
        graduateService.createGraduate(graduate);
    }

    @GetMapping("/getAllGraduates")
    public List<Graduate> getAll() {
        return graduateService.getGraduates();
    }

    @GetMapping("/{id}")
    public Optional<Graduate> getById(@PathVariable String id) {
        return graduateService.getById(id);
    }

    @GetMapping("/approved")
    public List<Graduate> getApprovedGraduates() {
        return graduateService.getApprovedGraduates();
    }

    @GetMapping("/nonapproved")
    public List<Graduate> getNonApprovedGraduates() {
        return graduateService.getNonApprovedGraduates();
    }

    @PutMapping("/{id}")
    public void updateGraduate(@PathVariable String id, @RequestBody Graduate graduate) {
        graduateService.updateGraduate(id, graduate);
    }

    @DeleteMapping("/{id}")
    public void deleteGraduate(@PathVariable String id) {
        graduateService.deleteGraduate(id);
    }

    @GetMapping("/getByUsername/{username}")
    public Optional<Graduate> getByUsername(@PathVariable String username) {
        return graduateService.getByUsername(username);
    }

}
