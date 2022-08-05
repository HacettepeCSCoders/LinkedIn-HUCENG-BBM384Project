package amr22.linkedinhuceng.backend.filter;

import amr22.linkedinhuceng.backend.domain.model.user.Academician;
import amr22.linkedinhuceng.backend.domain.model.user.Admin;
import amr22.linkedinhuceng.backend.domain.model.user.Graduate;
import amr22.linkedinhuceng.backend.domain.model.user.Student;
import amr22.linkedinhuceng.backend.security.appuser.AppUser;
import amr22.linkedinhuceng.backend.service.user.AcademicianService;
import amr22.linkedinhuceng.backend.service.user.AdminService;
import amr22.linkedinhuceng.backend.service.user.GraduateService;
import amr22.linkedinhuceng.backend.service.user.StudentService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final StudentService studentService;

    private final AdminService adminService;

    private final GraduateService graduateService;

    private final AcademicianService academicianService;

    @Autowired
    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, StudentService studentService,
                                      AdminService adminService, GraduateService graduateService, AcademicianService academicianService) {
        this.authenticationManager = authenticationManager;
        this.studentService = studentService;
        this.adminService = adminService;
        this.graduateService = graduateService;
        this.academicianService = academicianService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
                password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authentication) throws IOException {

        AppUser appUser = (AppUser) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String access_token = JWT.create().withSubject(appUser.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 100 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString()).withClaim("role", appUser.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        String refresh_token = JWT.create().withSubject(appUser.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString()).sign(algorithm);
        // response.setHeader("access_token",access_token);
        // response.setHeader("refresh_token",refresh_token);
        Map<Object, Object> tokens = new HashMap<>();
        switch (appUser.getAppUserRole().name()) {
            case "ROLE_STUDENT":
                Student student = studentService.getByUsername(appUser.getUsername()).orElseThrow();
                student.setDate_of_birth(null);
                tokens.put("userDetails", student);
                break;
            case "ROLE_ADMIN":
                Admin admin = adminService.getByUsername(appUser.getUsername()).orElseThrow();
                admin.setDate_of_birth(null);
                tokens.put("userDetails", admin);
                break;
            case "ROLE_GRADUATE":
                Graduate graduate = graduateService.getByUsername(appUser.getUsername()).orElseThrow();
                graduate.setDate_of_birth(null);
                tokens.put("userDetails", graduate);
                break;
            case "ROLE_ACADEMICIAN":
                Academician academician = academicianService.getByUsername(appUser.getUsername()).orElseThrow();
                academician.setDate_of_birth(null);
                tokens.put("userDetails", academician);
                break;
        }
        tokens.put("is_banned", !appUser.getEnabled());
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

}
