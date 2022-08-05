package amr22.linkedinhuceng.backend.controller.event;

import amr22.linkedinhuceng.backend.domain.model.event.Photo;
import amr22.linkedinhuceng.backend.service.event.PhotoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/photos")
@AllArgsConstructor
public class PhotoController {

    private final PhotoService photoService;

    @PostMapping("/add")
    public String addPhoto(@RequestParam("file") MultipartFile image, String title) throws IOException {
        return photoService.addPhoto(image, title);
    }

    @GetMapping("/{id}")
    public Photo getPhoto(@PathVariable String id) {
        return photoService.getPhoto(id);
    }

}
