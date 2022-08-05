package amr22.linkedinhuceng.backend.service.event;

import amr22.linkedinhuceng.backend.domain.model.event.JobOffer;
import amr22.linkedinhuceng.backend.repository.JobOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobOfferService {

	private final JobOfferRepository jobOfferRepository;

	@Autowired
	public JobOfferService(JobOfferRepository jobOfferRepository) {
		this.jobOfferRepository = jobOfferRepository;
	}

	public void save(JobOffer jobOffer) {
		jobOfferRepository.save(jobOffer);
	}

}
