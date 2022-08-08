package amr22.linkedinhuceng.backend.controller.event;

import amr22.linkedinhuceng.backend.domain.model.event.Announcement;
import amr22.linkedinhuceng.backend.service.event.AnnouncementService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional; 

@RestController
@RequestMapping("/api/v1/announcements")
@AllArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    // post mapping yapılacak
    // response status kurulacak
    // generic response oluşturulabilir
    // MethodArgumentNotValidException handle unutma

    @PostMapping
    public void createAnnouncement(@RequestBody Announcement announcement) {
        announcementService.createAnnouncement(announcement);
    }

    @GetMapping
    public List<Announcement> getAllPosts() {
        return announcementService.getAllAnnouncements();
    }

    @GetMapping("/getByPublisher/{publisherId}")
    public List<Announcement> getAnnouncementsByPublisherId(@PathVariable String publisherId) {
        return announcementService.getAnnouncementsByPublisher(publisherId);
    }

    @GetMapping("/{id}")
    public Optional<Announcement> getAnnouncementById(@PathVariable String id) {
        return announcementService.getAnnouncementById(id);
    }

    @PutMapping("/{id}")
    public void updateAnnouncement(@PathVariable String id, @RequestBody Announcement announcement) {
        announcementService.updateAnnouncement(id, announcement);
    }

    @DeleteMapping("/{id}")
    public void deleteAnnouncement(@PathVariable String id) {
        announcementService.deleteAnnouncement(id);
    }

}
