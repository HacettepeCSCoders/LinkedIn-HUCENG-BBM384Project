package amr22.linkedinhuceng.backend.service.event;

import amr22.linkedinhuceng.backend.domain.model.event.Post;
import amr22.linkedinhuceng.backend.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PostService {

	private final PostRepository postRepository;

    public void createPost(Post post) {
        post.setCreated(LocalDateTime.now());
        postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(String id) {
        return Optional.ofNullable(postRepository.findById(id).orElseThrow(IllegalStateException::new));
    }

    public List<Post> getPostsByPublisher(String pubId) {
        return postRepository.findPostsByPublisherId(Long.valueOf(pubId));
    }

    public void updatePost(String id, Post post) {

        Post _post = postRepository.findById(id).orElseThrow(() -> new IllegalStateException("Post does not exist"));
        _post.setContent(post.getContent());
        _post.setCreated(LocalDateTime.now());
        _post.setEdited(true);
        postRepository.save(_post);
    }

	public void deletePost(String id) {
		postRepository.deleteById(id);
	}

}
