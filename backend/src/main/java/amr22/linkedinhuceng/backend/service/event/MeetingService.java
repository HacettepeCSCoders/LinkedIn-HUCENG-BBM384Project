package amr22.linkedinhuceng.backend.service.event;

import amr22.linkedinhuceng.backend.domain.model.event.Meeting;
import amr22.linkedinhuceng.backend.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingService {

	private final MeetingRepository meetingRepository;

	@Autowired
	public MeetingService(MeetingRepository meetingRepository) {
		this.meetingRepository = meetingRepository;
	}

	public void save(Meeting meeting) {
		meetingRepository.save(meeting);
	}

}
