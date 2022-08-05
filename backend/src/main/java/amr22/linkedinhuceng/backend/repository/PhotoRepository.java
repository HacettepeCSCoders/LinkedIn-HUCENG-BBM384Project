package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.event.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhotoRepository extends MongoRepository<Photo, String> {

}
