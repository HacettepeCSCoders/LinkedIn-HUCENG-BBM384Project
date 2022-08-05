package amr22.linkedinhuceng.backend.service.event;

import amr22.linkedinhuceng.backend.domain.model.event.Meeting;
import amr22.linkedinhuceng.backend.repository.MeetingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;

    public void createMeeting(Meeting meeting) {
        meeting.setCreated(LocalDateTime.now());

        meetingRepository.save(meeting);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Optional<Meeting> getMeetingById(String id) {
        return Optional.ofNullable(meetingRepository.findById(id).orElseThrow(IllegalAccessError::new));
    }

    public List<Meeting> getMeetingsByPublisher(String pubId) {
        return meetingRepository.findMeetingsByPublisherId(Long.valueOf(pubId));
    }

    public void updateMeeting(String id, Meeting meeting) {
        Meeting _meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Meeting does not exist"));
        _meeting.setContent(meeting.getContent());
        _meeting.setLink(meeting.getLink());
        _meeting.setMeetingTime(meeting.getMeetingTime());
        _meeting.setCreated(LocalDateTime.now());
        _meeting.setIsEdited(true);
        meetingRepository.save(_meeting);
    }

    public void deleteMeeting(String id) {
        meetingRepository.deleteById(id);
    }

    public void addAplliedUser(String id, String appliedUserId) {
        Meeting _meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Meeting or User ID does not exist"));
        _meeting.addAppliedUser(appliedUserId);
        meetingRepository.save(_meeting);
    }

    public void removeAppliedUser(String id, String appliedUserId) {
        Meeting _meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Meeting or User ID does not exist"));
        _meeting.removeAppliedUser(appliedUserId);
        meetingRepository.save(_meeting);
    }

    public List<String> getAppliedUserIds(String id) {
        Meeting _meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Meeting does not exist"));
        return _meeting.getAppliedUserIds();
    }

}
