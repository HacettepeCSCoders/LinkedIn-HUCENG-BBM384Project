package amr22.linkedinhuceng.backend.config;

import amr22.linkedinhuceng.backend.filter.CustomAuthenticationFilter;
import amr22.linkedinhuceng.backend.filter.CustomAuthorizationFilter;
import amr22.linkedinhuceng.backend.security.appuser.AppUserRepository;
import amr22.linkedinhuceng.backend.security.appuser.AppUserService;
import amr22.linkedinhuceng.backend.service.user.AcademicianService;
import amr22.linkedinhuceng.backend.service.user.AdminService;
import amr22.linkedinhuceng.backend.service.user.GraduateService;
import amr22.linkedinhuceng.backend.service.user.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AppUserService appUserService;
    private final AppUserRepository appUserRepository;
    private final StudentService studentService;

    private final AdminService adminService;

    private final GraduateService graduateService;

    private final AcademicianService academicianService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(HttpSecurity security) throws Exception {
        security.cors().configurationSource(corsConfigurationSource());
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(
                authenticationManagerBean(), studentService, adminService, graduateService, academicianService);
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");

        security.csrf().disable();

        security.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        security.authorizeRequests().antMatchers("/api/v1/registration/**", "/api/login/**").permitAll();
        security.authorizeRequests().antMatchers("/api/v1/announcements/getAnnouncementById/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_STUDENT");
        security.authorizeRequests().antMatchers("/api/v1/announcements/createAnnouncement")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_GRADUATE", "ROLE_ACADEMICIAN");
        security.authorizeRequests().antMatchers("/api/v1/announcements/getAllAnnouncements")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_STUDENT");
//        security.authorizeRequests().antMatchers("/api/v1/posts/createPost").hasAnyAuthority("ROLE_ADMIN",
//                "ROLE_GRADUATE", "ROLE_ACADEMICIAN");
//        security.authorizeRequests().antMatchers("/api/v1/posts/getAllPosts").hasAnyAuthority("ROLE_ADMIN",
//                "ROLE_STUDENT", "ROLE_GRADUATE", "ROLE_ACADEMICIAN");
//        security.authorizeRequests().antMatchers("/api/v1/students/getAllStudents").hasAnyAuthority("ROLE_ADMIN",
//                "ROLE_GRADUATE", "ROLE_ACADEMICIAN");
//        security.authorizeRequests().antMatchers("/api/v1/graduates/getAllGraduates").hasAnyAuthority("ROLE_ADMIN",
//                "ROLE_GRADUATE", "ROLE_ACADEMICIAN");
//        security.authorizeRequests().antMatchers("/api/v1/academicians/getAllAcademicians")
//                .hasAnyAuthority("ROLE_ADMIN", "ROLE_GRADUATE", "ROLE_ACADEMICIAN");
        // security.authorizeRequests().antMatchers("/api/v1/posts/**").hasAnyAuthority("ROLE_ADMIN");
        // security.authorizeRequests().antMatchers("/api/v1/announcements/**").hasAnyAuthority("ROLE_ADMIN");
        // security.authorizeRequests().antMatchers("/api/v1/graduates/**").hasAnyAuthority("ROLE_ADMIN");
        // security.authorizeRequests().antMatchers("/api/v1/students/**").hasAnyAuthority("ROLE_ADMIN");
        // security.authorizeRequests().antMatchers("/api/v1/academicians/**").hasAnyAuthority("ROLE_ADMIN");
        // security.authorizeRequests().antMatchers("/api/v1/admins/**").hasAnyAuthority("ROLE_ADMIN");
        security.authorizeRequests().anyRequest().authenticated();
        security.addFilter(customAuthenticationFilter);
        security.addFilterBefore(new CustomAuthorizationFilter(appUserRepository), UsernamePasswordAuthenticationFilter.class);

        // security.authorizeRequests().anyRequest().permitAll();

        // security.csrf().disable().authorizeRequests().anyRequest().permitAll(); //
        // Works for GET, POST, PUT, DELETE

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("X-Auth-Token", "Authorization", "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}