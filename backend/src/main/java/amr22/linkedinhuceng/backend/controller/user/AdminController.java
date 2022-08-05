package amr22.linkedinhuceng.backend.controller.user;

import amr22.linkedinhuceng.backend.domain.model.user.Admin;
import amr22.linkedinhuceng.backend.service.user.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // post mapping yapılacak
    // response status kurulacak
    // generic response oluşturulabilir
    // MethodArgumentNotValidException handle unutma

    @PostMapping
    public void createAdmin(@RequestBody Admin admin) {
        adminService.createAdmin(admin);
    }

    @GetMapping
    public List<Admin> getAll() {
        return adminService.getAdmins();
    }

    @GetMapping("/{id}")
    public Optional<Admin> getById(@PathVariable String id) {
        return adminService.getById(id);
    }

    @PutMapping("/{id}")
    public void updateAdmin(@PathVariable String id, @RequestBody Admin admin) {
        adminService.updateAdmin(id, admin);
    }

    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable String id) {
        adminService.deleteAdmin(id);
    }

}
