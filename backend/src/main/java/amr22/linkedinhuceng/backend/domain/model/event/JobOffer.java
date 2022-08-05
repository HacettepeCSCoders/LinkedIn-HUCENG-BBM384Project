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
@Document(collection = "jobOffers")
public class JobOffer {

    @Id
    @Indexed(unique = true)
    private String id;

    private Long publisherId;

    private String companyName;

    private String jobTitle;

    private String aboutJob;

    private String jobLocation;

    private String jobType;

    private List<String> appliedUserIds;

    private Boolean isEdited;

    private LocalDateTime created;

    public JobOffer(Long publisherId, String companyName, String jobTitle, String aboutJob, String jobLocation) {
        this.publisherId = publisherId;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.aboutJob = aboutJob;
        this.jobLocation = jobLocation;
        this.appliedUserIds = new ArrayList<>();
        this.isEdited = false;
    }

    public void addAppliedUser(String appliedUserId) {
        this.appliedUserIds.add(appliedUserId);
    }

    public void removeAppliedUser(String appliedUserId) {
        this.appliedUserIds.remove(appliedUserId);
    }

}
