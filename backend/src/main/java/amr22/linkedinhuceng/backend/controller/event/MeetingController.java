package amr22.linkedinhuceng.backend.controller.event;

import amr22.linkedinhuceng.backend.domain.model.event.Meeting;
import amr22.linkedinhuceng.backend.service.event.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeetingController {

	private final MeetingService meetingService;

	@Autowired
	public MeetingController(MeetingService meetingService) {
		this.meetingService = meetingService;
	}

	// post mapping yapılacak
	// response status kurulacak
	// generic response oluşturulabilir
	// MethodArgumentNotValidException handle unutma

	public void createMeeting(@RequestBody Meeting meeting) {
		meetingService.save(meeting);
	}

}
