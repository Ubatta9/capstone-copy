package net.yorksolutions.processbe.repositories;

import net.yorksolutions.processbe.entities.Choice;
import net.yorksolutions.processbe.entities.StageResponse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageResponseRepository extends CrudRepository<StageResponse, Long> {
    List<StageResponse> findAllByStageIdIn(List<Long> stageIds);

    List<StageResponse> findAllByProcessTokenIsFinished(boolean isFinished);
}
