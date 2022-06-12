package net.yorksolutions.processbe.services;

import net.yorksolutions.processbe.entities.Process;
import net.yorksolutions.processbe.entities.ProcessToken;
import net.yorksolutions.processbe.entities.Stage;
import net.yorksolutions.processbe.entities.StageResponse;
import net.yorksolutions.processbe.repositories.ProcessRepository;
import net.yorksolutions.processbe.repositories.ProcessTokenRepository;
import net.yorksolutions.processbe.repositories.StageResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FollowerService {

    private final ProcessRepository processRepository;

    private final StageResponseRepository stageResponseRepository;

    private final ProcessTokenRepository processTokenRepository;

    @Autowired
    public FollowerService( ProcessRepository processRepository
            , StageResponseRepository stageResponseRepository, ProcessTokenRepository processTokenRepository) {
        this.processRepository = processRepository;
        this.stageResponseRepository = stageResponseRepository;
        this.processTokenRepository = processTokenRepository;
    }


    public String startProcess(Long processId) {
        String token = UUID.randomUUID().toString();
        Process process = processRepository.findById(processId).get();

        processTokenRepository.save(new ProcessToken(token, process));
        return token;
    }


    public void cancel(String token) {

    }

    public void answerStage(String token, Long stageId, String response) {

        ProcessToken processToken = processTokenRepository.findByToken(token);

        stageResponseRepository.save(new StageResponse(processToken, stageId, response));


        List<Stage> stageList = processRepository.findById(processToken.getProcess().getId()).get().getStages();

        List<Long> stageIds = stageList.stream().map(stage -> stage.getId()).collect(Collectors.toList());

        List<StageResponse> stageResponseList = stageResponseRepository.findAllByStageIdIn(stageIds);

        if (stageList.size() == stageResponseList.size()) {
            finishProcessForToken(processToken);
        }


    }

    private void finishProcessForToken(ProcessToken processToken) {
        processToken.setFinished(true);
        processTokenRepository.save(processToken);
    }
}
