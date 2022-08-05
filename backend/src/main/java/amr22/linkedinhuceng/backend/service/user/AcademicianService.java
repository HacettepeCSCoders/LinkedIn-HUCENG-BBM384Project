package amr22.linkedinhuceng.backend.service.user;

import amr22.linkedinhuceng.backend.domain.model.user.Academician;
import amr22.linkedinhuceng.backend.repository.AcademicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AcademicianService {

    private final AcademicianRepository academicianRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AcademicianService(AcademicianRepository academicianRepository) {
        this.academicianRepository = academicianRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public void createAcademician(Academician academician) {
        academician.setPassword(this.passwordEncoder.encode(academician.getPassword()));
        academicianRepository.save(academician);
    }

    public List<Academician> getAcademicians() {
        return academicianRepository.findAll();
    }

    public Optional<Academician> getById(String id) {
        return Optional
                .ofNullable(academicianRepository.findById(Long.valueOf(id)).orElseThrow(IllegalStateException::new));
    }

    public List<Academician> getApprovedAcademicians() {
        return academicianRepository.findApprovedAcademicians();
    }

    public List<Academician> getNonApprovedAcademicians() {
        return academicianRepository.findNonApprovedAcademicians();
    }

    @Transactional
    public void updateAcademician(String id, Academician academician) {

        Academician academicianToUpdate = academicianRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalStateException("Academician bulunamadı"));

        academicianToUpdate
                .setName(academician.getName() == null ? academicianToUpdate.getName() : academician.getName());
        academicianToUpdate.setSurname(
                academician.getSurname() == null ? academicianToUpdate.getSurname() : academician.getSurname());
        academicianToUpdate.setDate_of_birth(academician.getDate_of_birth() == null
                ? academicianToUpdate.getDate_of_birth() : academician.getDate_of_birth());
        if (academician.getPassword() != null) {
            academicianToUpdate.setPassword(this.passwordEncoder.encode(academician.getPassword()));
        }
        academicianToUpdate
                .setType(academician.getType() == null ? academicianToUpdate.getType() : academician.getType());
        academicianToUpdate.setIs_approved(academician.getIs_approved() == null ? academicianToUpdate.getIs_approved()
                : academician.getIs_approved());

        academicianRepository.save(academicianToUpdate);
    }

    public void deleteAcademician(String id) {

        if (academicianRepository.existsById(Long.valueOf(id)))
            academicianRepository.deleteById(Long.valueOf(id));
        else
            throw new IllegalStateException("Academician cannot be found");
    }

    public Optional<Academician> getByUsername(String username) {
        return Optional
                .ofNullable(academicianRepository.findByUsername(username).orElseThrow(IllegalStateException::new));
    }

}
