package amr22.linkedinhuceng.backend.controller.event;

import amr22.linkedinhuceng.backend.domain.model.event.Post;
import amr22.linkedinhuceng.backend.service.event.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/posts")
@AllArgsConstructor
public class PostController {

	private final PostService postService;

	// post mapping yapılacak
	// response status kurulacak
	// generic response oluşturulabilir
	// MethodArgumentNotValidException handle unutma

	@PostMapping("/createPost")
	public void createPost(@RequestBody Post post) {
		postService.createPost(post);
	}

	@GetMapping("/getAllPosts")
	public List<Post> getAllPosts() {
		return postService.getAllPosts();
	}

	@GetMapping("/getByPublisher/{publisherId}")
	public List<Post> getPostsByPublisherId(@PathVariable String publisherId) {
		return postService.getPostsByPublisher(publisherId);
	}

	@GetMapping("/{id}")
	public Optional<Post> getPostsById(@PathVariable String id) {
		return postService.getPostById(id);
	}

	@PutMapping("/{id}")
	public void updatePost(@PathVariable String id, @RequestBody Post post) {
		postService.updatePost(id, post);
	}

	@DeleteMapping("/{id}")
	public void deletePost(@PathVariable String id) {
		postService.deletePost(id);
	}

}
