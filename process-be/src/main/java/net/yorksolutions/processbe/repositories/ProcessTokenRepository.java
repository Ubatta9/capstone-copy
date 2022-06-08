package net.yorksolutions.processbe.repositories;

import net.yorksolutions.processbe.entities.ProcessToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessTokenRepository extends CrudRepository<ProcessToken, Long> {

    ProcessToken findByToken(String token);

    List<ProcessToken> findAllByIsFinished(boolean isFinished);
}
