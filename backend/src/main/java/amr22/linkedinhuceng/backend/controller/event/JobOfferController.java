package amr22.linkedinhuceng.backend.controller.event;

import amr22.linkedinhuceng.backend.domain.model.event.JobOffer;
import amr22.linkedinhuceng.backend.service.event.JobOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JobOfferController {

	private final JobOfferService jobOfferService;

	@Autowired
	public JobOfferController(JobOfferService jobOfferService) {
		this.jobOfferService = jobOfferService;
	}

	// post mapping yapılacak
	// response status kurulacak
	// generic response oluşturulabilir
	// MethodArgumentNotValidException handle unutma

	public void createJobOffer(@RequestBody JobOffer jobOffer) {
		jobOfferService.save(jobOffer);
	}

}
