package amr22.linkedinhuceng.backend.domain.model.user;

import amr22.linkedinhuceng.backend.domain.enums.StudentType;
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
@Table(name = "student")
public class Student {

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

    @Column(name = "student_number", nullable = false)
    @Size(min = 8)
    private String student_number;

    @Column(name = "student_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private StudentType type;

    @Column(name = "is_student_representative")
    private Boolean is_student_representative;

    @Column(name = "is_approved")
    private Boolean is_approved = false;

    public Student(String name, String username, String surname, LocalDate parse, String password, String studentNumber,
                   StudentType studentType) {
        this.name = name;
        this.username = username;
        this.surname = surname;
        this.date_of_birth = parse;
        this.password = password;
        this.student_number = studentNumber;
        this.type = studentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
            return false;
        Student student = (Student) o;
        return id != null && Objects.equals(id, student.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
