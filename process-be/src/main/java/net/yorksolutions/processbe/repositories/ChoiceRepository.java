package net.yorksolutions.processbe.repositories;

import net.yorksolutions.processbe.entities.Choice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChoiceRepository extends CrudRepository<Choice, Long> {
    List<Choice> findAllById(Long id);
}
