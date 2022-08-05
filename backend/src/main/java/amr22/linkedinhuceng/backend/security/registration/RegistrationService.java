package amr22.linkedinhuceng.backend.security.registration;

import amr22.linkedinhuceng.backend.domain.enums.AcademicianType;
import amr22.linkedinhuceng.backend.domain.enums.StudentType;
import amr22.linkedinhuceng.backend.domain.model.user.Academician;
import amr22.linkedinhuceng.backend.domain.model.user.Graduate;
import amr22.linkedinhuceng.backend.domain.model.user.Student;
import amr22.linkedinhuceng.backend.security.EmailValidator;
import amr22.linkedinhuceng.backend.security.appuser.AppUser;
import amr22.linkedinhuceng.backend.security.appuser.AppUserRole;
import amr22.linkedinhuceng.backend.security.appuser.AppUserService;
import amr22.linkedinhuceng.backend.service.user.AcademicianService;
import amr22.linkedinhuceng.backend.service.user.GraduateService;
import amr22.linkedinhuceng.backend.service.user.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;

@Service
@AllArgsConstructor
public class RegistrationService {

	private final AppUserService appUserService;

	private final StudentService studentService;

	private final GraduateService graduateService;

	private final AcademicianService academicianService;

	private final EmailValidator emailValidator;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	@Transactional
	public ResponseEntity<String> register(RegistrationRequest request) {
		AppUserRole appUserRole = null;
		boolean isValidEmail = emailValidator.test(request.getUsername());
		if (!isValidEmail) {
			return new ResponseEntity<>("not a valid email", HttpStatus.NOT_ACCEPTABLE);
		}

		if (!appUserService.userExists(request.getUsername())) {
			if (request.getUserType() == 1) {
				appUserRole = AppUserRole.ROLE_STUDENT;
			} else if (request.getUserType() == 2) {
				appUserRole = AppUserRole.ROLE_GRADUATE;
			} else if (request.getUserType() == 3) {
				appUserRole = AppUserRole.ROLE_ACADEMICIAN;
			}

			ResponseEntity responseEntity = appUserService
					.signUpUser(new AppUser(request.getUsername(), request.getPassword(), appUserRole, true, true));

			if (request.getUserType() == 1) {
				studentService.createStudent(new Student(request.getName(), request.getUsername(), request.getSurname(),
						LocalDate.parse(request.getDateOfBirth()), request.getPassword(), request.getStudentNumber(),
						(StudentType) Arrays.stream(StudentType.values()).toArray()[request.getStudentType()]));
			} else if (request.getUserType() == 2) {
				graduateService.createGraduate(new Graduate(request.getName(), request.getUsername(),
						request.getSurname(), LocalDate.parse(request.getDateOfBirth()), request.getPassword(),
						request.getCompanyName()));
			} else if (request.getUserType() == 3) {
				academicianService.createAcademician(new Academician(request.getName(), request.getUsername(),
						request.getSurname(), LocalDate.parse(request.getDateOfBirth()), request.getPassword(),
						(AcademicianType) Arrays.stream(AcademicianType.values()).toArray()[request
								.getAcademicianType()]));
			}
			return responseEntity;
		}
		return new ResponseEntity<>("email taken", HttpStatus.NOT_ACCEPTABLE);
	}

}
