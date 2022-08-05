package amr22.linkedinhuceng.backend.repository;

import amr22.linkedinhuceng.backend.domain.model.event.JobOffer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobOfferRepository extends MongoRepository<JobOffer, String> {

    List<JobOffer> findJobOffersByPublisherId(Long publisherId);

}
