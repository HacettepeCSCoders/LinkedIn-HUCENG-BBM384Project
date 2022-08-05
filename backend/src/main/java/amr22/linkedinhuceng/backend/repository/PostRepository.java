package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.event.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    List<Post> findPostsByPublisherId(Long publisherId);

    Optional<Post> findPostByPhotoId(String photoId);

}
