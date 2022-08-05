package amr22.linkedinhuceng.backend.service.event;

import amr22.linkedinhuceng.backend.domain.model.event.JobOffer;
import amr22.linkedinhuceng.backend.repository.JobOfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class JobOfferService {

    private final JobOfferRepository jobOfferRepository;

    public void createJobOffer(JobOffer jobOffer) {
        jobOffer.setCreated(LocalDateTime.now());
        jobOfferRepository.save(jobOffer);
    }

    public List<JobOffer> getAllJobOffers() {
        return jobOfferRepository.findAll();
    }

    public Optional<JobOffer> getJobOfferById(String id) {
        return Optional.ofNullable(jobOfferRepository.findById(id).orElseThrow(IllegalArgumentException::new));
    }

    public List<JobOffer> getJobOffersByPublisher(String pubId) {
        return jobOfferRepository.findJobOffersByPublisherId(Long.valueOf(pubId));
    }

    public void updateJobOffer(String id, JobOffer jobOffer) {
        JobOffer _jobOffer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Job Offer does not exist"));
        _jobOffer.setCompanyName(jobOffer.getCompanyName());
        _jobOffer.setJobTitle(jobOffer.getJobTitle());
        _jobOffer.setAboutJob(jobOffer.getAboutJob());
        _jobOffer.setJobLocation(jobOffer.getJobLocation());
        _jobOffer.setJobType(jobOffer.getJobType());
        _jobOffer.setCreated(LocalDateTime.now());
        _jobOffer.setIsEdited(true);
        jobOfferRepository.save(_jobOffer);
    }

    public void deleteJobOffer(String id) {
        jobOfferRepository.deleteById(id);
    }

    public void addAppliedUser(String id, String appliedUserId) {
        JobOffer _jobOffer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Job Offer does not exist"));
        _jobOffer.addAppliedUser(appliedUserId);
        jobOfferRepository.save(_jobOffer);
    }

    public void removeAppliedUser(String id, String appliedUserId) {
        JobOffer _jobOffer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Job Offer does not exist"));
        _jobOffer.removeAppliedUser(appliedUserId);
        jobOfferRepository.save(_jobOffer);
    }

    public List<String> getAppliedUserIds(String id) {
        JobOffer _jobOffer = jobOfferRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Job Offer does not exist"));
        return _jobOffer.getAppliedUserIds();
    }

}
