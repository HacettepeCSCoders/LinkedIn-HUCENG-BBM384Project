package amr22.linkedinhuceng.backend.controller.event;

import amr22.linkedinhuceng.backend.domain.model.event.Meeting;
import amr22.linkedinhuceng.backend.service.event.MeetingService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/meetings")
@AllArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    @PostMapping
    public void createMeeting(@RequestBody Meeting meeting) {
        meetingService.createMeeting(meeting);
    }

    @GetMapping
    public List<Meeting> getAllMeetings() {
        return meetingService.getAllMeetings();
    }

    @GetMapping("/{id}")
    public Optional<Meeting> getMeetingById(@PathVariable String id) {
        return meetingService.getMeetingById(id);
    }

    @GetMapping("/getByPublisherId/{publisherId}")
    public List<Meeting> getMeetingsByPublisherId(@PathVariable String publisherId) {
        return meetingService.getMeetingsByPublisher(publisherId);
    }

    @PutMapping("/updateMeeting/{id}")
    public void updateMeeting(@PathVariable String id, @RequestBody Meeting meeting) {
        meetingService.updateMeeting(id, meeting);
    }

    @RequestMapping(value = "/addAppliedUser/{id}", method = {RequestMethod.GET, RequestMethod.PUT})
    public void addAppliedUser(@PathVariable String id, @RequestBody String appliedUserId) {
        meetingService.addAplliedUser(id, appliedUserId);
    }

    @PutMapping("/removeAppliedUser/{id}")
    public void removeAppliedUser(@PathVariable String id, @RequestBody String appliedUserId) {
        meetingService.removeAppliedUser(id, appliedUserId);
    }

    @DeleteMapping("/deleteMeeting/{id}")
    public void deleteMeeting(@PathVariable String id) {
        meetingService.deleteMeeting(id);
    }

    @GetMapping("/getAllAppliedUserIds/{id}")
    public List<String> getAppliedUserIds(@PathVariable String id) {
        return meetingService.getAppliedUserIds(id);
    }

}
