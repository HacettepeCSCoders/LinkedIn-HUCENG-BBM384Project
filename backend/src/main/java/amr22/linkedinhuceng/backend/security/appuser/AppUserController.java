package amr22.linkedinhuceng.backend.security.appuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/appUsers")
public class AppUserController {

    private final AppUserRepository appUserRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AppUserController(AppUserRepository appUserRepository) {
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.appUserRepository = appUserRepository;
    }

    // post mapping yapılacak
    // response status kurulacak
    // generic response oluşturulabilir
    // MethodArgumentNotValidException handle unutma

    @GetMapping("/getAllBanned")
    public List<AppUser> getAll() {
        return appUserRepository.findAll().stream().filter(x -> !x.getEnabled()).collect(Collectors.toList());
    }

    @GetMapping("/isBannedById/{id}")
    public boolean getIsBannedById(@PathVariable String id) {
        AppUser appUser = appUserRepository.getById(Long.valueOf(id));
        return !appUser.getEnabled();
    }

    @GetMapping("/isBanned/{username}")
    public boolean getIsBannedByUsername(@PathVariable String username) {
        Optional<AppUser> appUser = appUserRepository.findByUsername(username);
        if (appUser.isPresent()) {
            return !appUser.get().getEnabled();
        } else {
            throw new NoSuchElementException("No user found with this username");
        }
    }

    @PutMapping("/banUser/{username}")
    public void banAppUser(@PathVariable String username) {
        Optional<AppUser> appUser = appUserRepository.findByUsername(username);
        appUser.get().setEnabled(false);
        appUserRepository.save(appUser.get());

    }

    @PutMapping("/unbanUser/{username}")
    public void unbanAppUser(@PathVariable String username) {
        Optional<AppUser> appUser = appUserRepository.findByUsername(username);
        appUser.get().setEnabled(true);
        appUserRepository.save(appUser.get());
    }

    @PutMapping("/resetPassword/{username}/{newPassword}")
    public void resetPassword(@PathVariable String username, @PathVariable String newPassword) {
        Optional<AppUser> appUser = appUserRepository.findByUsername(username);
        String encoded = passwordEncoder.encode(newPassword);
        appUser.get().setPassword(encoded);
        appUserRepository.save(appUser.get());

    }

}
