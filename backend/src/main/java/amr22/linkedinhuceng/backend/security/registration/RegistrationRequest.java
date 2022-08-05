package amr22.linkedinhuceng.backend.security.registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {

    private final Integer userType;

    private final String username;

    private final String name;

    private final String surname;

    private final String dateOfBirth;

    private final String password;

    private final Integer academicianType;

    private final String companyName;

    private final String studentNumber;

    private final Integer studentType;

}
