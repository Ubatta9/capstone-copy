package net.yorksolutions.processbe.repositories;

import net.yorksolutions.processbe.entities.Stage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageRepository extends CrudRepository<Stage, Long> {
    List<Stage> findAllById(Long id);
}
