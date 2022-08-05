package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.event.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

}
