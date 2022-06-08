package net.yorksolutions.processbe.services;

import net.yorksolutions.processbe.entities.Stage;
import net.yorksolutions.processbe.repositories.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StageService {
    private StageRepository stageRepository;

    @Autowired
    public StageService(@NonNull StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public List<Stage> getAllStages(Long id) {
        return stageRepository.findAllById(id);
    }

    public void addStage(Long processId, Stage stage) {
        stageRepository.save(stage);
        //return "success";
    }

    public Stage updateStageWith(Stage oldStage, Stage newStage) {
        oldStage.stageDescription = newStage.stageDescription;
        oldStage.responseType = newStage.responseType;
        oldStage.choiceList = newStage.choiceList;
        return oldStage;
    }

    public Optional<Stage> updateStage(Long processId, Stage newStage) {
        return stageRepository.findById(processId)
                .map(oldStage -> {
                    Stage updatedStage = updateStageWith(oldStage, newStage);
                    return stageRepository.save(updatedStage);
                });
    }

}
