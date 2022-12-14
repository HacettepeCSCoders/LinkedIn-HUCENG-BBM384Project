package amr22.linkedinhuceng.backend.domain.model.event;

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
@Document(collection = "posts")
public class Post {

    @Id
    @Indexed(unique = true)
    private String id;

    private LocalDateTime created;

    private String content;

    private boolean isEdited;

    private String photoId;

    @Field("PublisherId")
    private Long publisherId;

    public Post(String content, Long publisherId, String photoId) {
        this.content = content;
        this.publisherId = publisherId;
        this.isEdited = false;
        this.photoId = photoId;
    }

}
