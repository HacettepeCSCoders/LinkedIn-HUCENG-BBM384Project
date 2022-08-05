package amr22.linkedinhuceng.backend.domain.model.event;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@Document(collection = "meetings")
public class Meeting {

    @Id
    @Indexed(unique = true)
    private String id;

    private Long publisherId;

    private String content;

    private List<String> appliedUserIds;

    private String link;

    private Boolean isEdited;

    private LocalDateTime created;

    private String meetingTime;

    public Meeting(Long publisherId, String content, String link, String meetingTime) {
        this.publisherId = publisherId;
        this.content = content;
        this.link = link;
        this.meetingTime = meetingTime;
        this.isEdited = false;
        this.appliedUserIds = new ArrayList<>();
    }

    public void addAppliedUser(String appliedUserId) {
        this.appliedUserIds.add(appliedUserId);
    }

    public void removeAppliedUser(String appliedUserId) {
        this.appliedUserIds.remove(appliedUserId);
    }

}
