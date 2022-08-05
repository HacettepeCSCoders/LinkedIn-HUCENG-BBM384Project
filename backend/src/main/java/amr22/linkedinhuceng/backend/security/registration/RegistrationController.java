package amr22.linkedinhuceng.backend.security.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/registration")
@AllArgsConstructor
@CrossOrigin
public class RegistrationController {

    private RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

}
