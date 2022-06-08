package net.yorksolutions.processbe.repositories;

import net.yorksolutions.processbe.entities.Process;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessRepository extends CrudRepository<Process, Long> {
    List<Process> findAll();
}
