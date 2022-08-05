package amr22.linkedinhuceng.backend.domain.model.event;

import amr22.linkedinhuceng.backend.domain.enums.Roles;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Document(collection = "announcements")
public class Announcement {

    @Id
    @Indexed(unique = true)
    private String id;

    private LocalDateTime created;

    private String content;

    private boolean isEdited;

    @Field("RelatedType")
    private Roles relatedType;

    @Field("PublisherId")
    private Long publisherId;

    public Announcement(String content, Roles relatedType, Long publisherId) {
        this.content = content;
        this.relatedType = relatedType;
        this.publisherId = publisherId;
        this.isEdited = false;
    }

}
