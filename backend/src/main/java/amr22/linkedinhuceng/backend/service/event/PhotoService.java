package amr22.linkedinhuceng.backend.service.event;

import amr22.linkedinhuceng.backend.domain.model.event.Photo;
import amr22.linkedinhuceng.backend.repository.PhotoRepository;
import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@AllArgsConstructor
@Service
public class PhotoService {

    private final PhotoRepository photoRepository;

    public String addPhoto(MultipartFile file, String title) throws IOException {
        Photo photo = new Photo(title);
        photo.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = photoRepository.save(photo);
        return photo.getId();
    }

    public Photo getPhoto(String id) {
        return photoRepository.findById(id).get();
    }

}
