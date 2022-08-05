package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.event.Meeting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {

    List<Meeting> findMeetingsByPublisherId(Long publisherId);

}
