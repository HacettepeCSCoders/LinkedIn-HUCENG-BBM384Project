package amr22.linkedinhuceng.backend.service.user;

import amr22.linkedinhuceng.backend.domain.model.user.Admin;
import amr22.linkedinhuceng.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public void createAdmin(Admin admin) {
        admin.setPassword(this.passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
    }

    public List<Admin> getAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getById(String id) {
        return Optional.ofNullable(adminRepository.findById(Long.valueOf(id)).orElseThrow(IllegalStateException::new));
    }

    @Transactional
    public void updateAdmin(String id, Admin admin) {

        Admin adminToUpdate = adminRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalStateException("Admin cannot be found"));

        adminToUpdate.setName(admin.getName() == null ? adminToUpdate.getName() : admin.getName());
        adminToUpdate.setSurname(admin.getSurname() == null ? adminToUpdate.getSurname() : admin.getSurname());
        adminToUpdate.setDate_of_birth(
                admin.getDate_of_birth() == null ? adminToUpdate.getDate_of_birth() : admin.getDate_of_birth());
        if (admin.getPassword() != null) {
            adminToUpdate.setPassword(this.passwordEncoder.encode(admin.getPassword()));
        }
        adminRepository.save(adminToUpdate);
    }

    public void deleteAdmin(String id) {
        if (adminRepository.existsById(Long.valueOf(id)))
            adminRepository.deleteById(Long.valueOf(id));
        else
            throw new IllegalStateException("Admin cannot be found");

    }

    public Optional<Admin> getByUsername(String username) {
        return Optional.ofNullable(adminRepository.findByUsername(username).orElseThrow(IllegalStateException::new));
    }

}
