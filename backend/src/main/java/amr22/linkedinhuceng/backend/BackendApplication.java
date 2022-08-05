package amr22.linkedinhuceng.backend;

import amr22.linkedinhuceng.backend.domain.model.event.Post;
import amr22.linkedinhuceng.backend.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDateTime;

@SpringBootApplication
@ComponentScan(basePackages = { "amr22.linkedinhuceng.backend.*" })
@EnableJpaRepositories("amr22.linkedinhuceng.backend.*")
@EntityScan("amr22.linkedinhuceng.backend.*")
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
