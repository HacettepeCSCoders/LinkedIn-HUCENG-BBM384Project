package amr22.linkedinhuceng.backend.controller.event;

import amr22.linkedinhuceng.backend.domain.model.event.JobOffer;
import amr22.linkedinhuceng.backend.service.event.JobOfferService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/jobOffers")
@AllArgsConstructor
public class JobOfferController {

    private final JobOfferService jobOfferService;

    @PostMapping
    public void createJobOffer(@RequestBody JobOffer jobOffer) {
        jobOfferService.createJobOffer(jobOffer);
    }

    @GetMapping
    public List<JobOffer> getAllJobOffers() {
        return jobOfferService.getAllJobOffers();
    }

    @GetMapping("/{id}")
    public Optional<JobOffer> getJobOfferById(@PathVariable String id) {
        return jobOfferService.getJobOfferById(id);
    }

    @GetMapping("/getByPublisher/{publisherId}")
    public List<JobOffer> getJobOffersByPublisherId(@PathVariable String publisherId) {
        return jobOfferService.getJobOffersByPublisher(publisherId);
    }

    @PutMapping("/updateJobOffer/{id}")
    public void updateJobOffer(@PathVariable String id, @RequestBody JobOffer jobOffer) {
        jobOfferService.updateJobOffer(id, jobOffer);
    }

    @RequestMapping(value = "/addAppliedUser/{id}", method = {RequestMethod.GET, RequestMethod.PUT})
    public void addAppliedUser(@PathVariable String id, @RequestBody String appliedUserId) {
        jobOfferService.addAppliedUser(id, appliedUserId);
    }

    @PutMapping("/removeAppliedUser/{id}")
    public void removeAppliedUser(@PathVariable String id, @RequestBody String appliedUserId) {
        jobOfferService.removeAppliedUser(id, appliedUserId);
    }

    @GetMapping("/getAppliedUserIds/{id}")
    public List<String> getAppliedUserIds(@PathVariable String id) {
        return jobOfferService.getAppliedUserIds(id);
    }

    @DeleteMapping("/deleteJobOffer/{id}")
    public void deleteJobOffer(@PathVariable String id) {
        jobOfferService.deleteJobOffer(id);
    }

}
