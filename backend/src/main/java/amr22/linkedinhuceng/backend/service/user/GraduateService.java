package amr22.linkedinhuceng.backend.service.user;

import amr22.linkedinhuceng.backend.domain.model.user.Graduate;
import amr22.linkedinhuceng.backend.repository.GraduateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GraduateService {

	private final GraduateRepository graduateRepository;

	private final PasswordEncoder passwordEncoder;

	@Autowired
	public GraduateService(GraduateRepository graduateRepository) {
		this.graduateRepository = graduateRepository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	@Transactional
	public void createGraduate(Graduate graduate) {
		graduate.setPassword(this.passwordEncoder.encode(graduate.getPassword()));
		graduateRepository.save(graduate);
	}

	public List<Graduate> getGraduates() {
		return graduateRepository.findAll();
	}

	public Optional<Graduate> getById(String id) {
		return Optional
				.ofNullable(graduateRepository.findById(Long.valueOf(id)).orElseThrow(IllegalStateException::new));
	}

	public List<Graduate> getApprovedGraduates() {
        return graduateRepository.findApprovedGraduates();
    }

    public List<Graduate> getNonApprovedGraduates() {
        return graduateRepository.findNonApprovedGraduates();
    }

	@Transactional
	public void updateGraduate(String id, Graduate graduate) {

		Graduate graduateToUpdate = graduateRepository.findById(Long.valueOf(id))
				.orElseThrow(() -> new IllegalStateException("Graduate cannot be found"));

		graduateToUpdate.setName(graduate.getName() == null ? graduateToUpdate.getName() : graduate.getName());
		graduateToUpdate
				.setSurname(graduate.getSurname() == null ? graduateToUpdate.getSurname() : graduate.getSurname());
		graduateToUpdate.setDate_of_birth(graduate.getDate_of_birth() == null ? graduateToUpdate.getDate_of_birth()
				: graduate.getDate_of_birth());

		if (graduate.getPassword() != null) {
			graduateToUpdate.setPassword(this.passwordEncoder.encode(graduate.getPassword()));
		}

		graduateToUpdate.setIs_approved(
				graduate.getIs_approved() == null ? graduateToUpdate.getIs_approved() : graduate.getIs_approved());
		graduateToUpdate.setCompany_name(
				graduate.getCompany_name() == null ? graduateToUpdate.getCompany_name() : graduate.getCompany_name());
		graduateToUpdate.setIs_approved(
				graduate.getIs_approved() == null ? graduateToUpdate.getIs_approved() : graduate.getIs_approved());

		graduateRepository.save(graduateToUpdate);
	}

	public void deleteGraduate(String id) {
        if (graduateRepository.existsById(Long.valueOf(id)))
            graduateRepository.deleteById(Long.valueOf(id));
        else
            throw new IllegalStateException("Graduate cannot be found");
    }

}
