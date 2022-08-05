package amr22.linkedinhuceng.backend.domain.model.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "graduate")
public class Graduate {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name", nullable = false)
    @Size(min = 3, max = 255)
    private String name;

    @Column(name = "username", nullable = false)
    @Size(min = 3, max = 255)
    private String username;

    @Column(name = "surname", nullable = false)
    @Size(min = 3, max = 255)
    private String surname;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate date_of_birth;

    @Column(name = "password", nullable = false)
    @Size(min = 8, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;

    @Column(name = "company_name", nullable = false)
    private String company_name;

    @Column(name = "is_approved")
    private Boolean is_approved = false;

    public Graduate(String name, String username, String surname, LocalDate parse, String password,
                    String companyName) {
        this.name = name;
        this.username = username;
        this.surname = surname;
        this.date_of_birth = parse;
        this.password = password;
        this.company_name = companyName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
            return false;
        Graduate graduate = (Graduate) o;
        return id != null && Objects.equals(id, graduate.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
