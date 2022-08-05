package amr22.linkedinhuceng.backend.service.event;

import amr22.linkedinhuceng.backend.domain.model.event.Announcement;
import amr22.linkedinhuceng.backend.repository.AnnouncementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AnnouncementService {

	private final AnnouncementRepository announcementRepository;

    public void createAnnouncement(Announcement announcement) {
        announcement.setCreated(LocalDateTime.now());
        announcementRepository.save(announcement);
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public Optional<Announcement> getAnnouncementById(String id) {
        return Optional.ofNullable(announcementRepository.findById(id).orElseThrow(IllegalStateException::new));
    }

    public List<Announcement> getAnnouncementsByPublisher(String publisherId) {
        return announcementRepository.findAnnouncementsByPublisherId(Long.valueOf(publisherId));
    }

    public void updateAnnouncement(String id, Announcement announcement) {
        Announcement _announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Announcement does not exist"));
        _announcement.setContent(announcement.getContent());
        _announcement.setCreated(LocalDateTime.now());
        _announcement.setEdited(true);
        _announcement.setRelatedType(announcement.getRelatedType());
        announcementRepository.save(_announcement);
    }

    public void deleteAnnouncement(String id) {
        announcementRepository.deleteById(id);
    }

}
