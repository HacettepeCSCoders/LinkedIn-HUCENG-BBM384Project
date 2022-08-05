package amr22.linkedinhuceng.backend.domain.model.event;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Getter
@Setter
@ToString
@Document(collection = "photos")
public class Photo {

    @Id
    @Indexed(unique = true)
    private String id;

    private String title;

    private Binary image;

    public Photo(String title) {
        this.title = title;
    }

}
