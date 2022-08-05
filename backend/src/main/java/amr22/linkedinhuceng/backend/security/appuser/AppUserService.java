package amr22.linkedinhuceng.backend.security.appuser;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND = "user with email %s not found";

    private final AppUserRepository appUserRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, username)));

        // Collection<SimpleGrantedAuthority> authorityCollection = new ArrayList<>();
        // authorityCollection.add(new
        // SimpleGrantedAuthority(appUser.getAppUserRole().name()));
        //
        // appUser.
    }

    public boolean userExists(String email) {
        return appUserRepository.findByUsername(email).isPresent();
    }

    public ResponseEntity signUpUser(AppUser appUser) {
        if (userExists(appUser.getUsername())) {
            return new ResponseEntity<>("Email already taken!", HttpStatus.NOT_ACCEPTABLE);
        }
        String encodedPsw = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPsw);
        appUserRepository.save(appUser);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
