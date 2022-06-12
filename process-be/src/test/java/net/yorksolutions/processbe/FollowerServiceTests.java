package net.yorksolutions.processbe;

import net.yorksolutions.processbe.entities.*;
import net.yorksolutions.processbe.entities.Process;
import net.yorksolutions.processbe.repositories.ProcessRepository;
import net.yorksolutions.processbe.repositories.ProcessTokenRepository;
import net.yorksolutions.processbe.repositories.StageResponseRepository;
import net.yorksolutions.processbe.services.FollowerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FollowerServiceTests {
    @InjectMocks
    FollowerService followerService;
    @Mock
    ProcessRepository processRepository;
    @Mock
    StageResponseRepository stageResponseRepository;
    @Mock
    ProcessTokenRepository processTokenRepository;
    @Test
    void itShouldReturnATtokenWhenStartProcessIsCalled(){
        List<Choice> choiceList  = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();

        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc",1, "multiple", choiceList));

        Process process = new Process("Test Process", stageList);
        process.setId(6L);


        when(processRepository.findById(6L)).thenReturn(Optional.of(process));
        ArgumentCaptor<ProcessToken> processTokenCaptor = ArgumentCaptor.forClass(ProcessToken.class);

        when(processTokenRepository.save(processTokenCaptor.capture())).thenReturn(null);

        String actualToken = followerService.startProcess(6L);

        assertNotNull(actualToken);
        assertEquals(processTokenCaptor.getValue().getToken(), actualToken);


    }

    @Test
    void itShouldAnswerStageSuccessfully() {
        String token = "any random token";
        Long stageId = 2L;
        String response = "test response";

        List<Choice> choiceList  = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();
        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc", 1,"multiple", choiceList));
        Process process = new Process("Test Process", stageList);
        process.setId(6L);
        List<StageResponse> stageResponseList = new ArrayList<>();

        ProcessToken processToken = new ProcessToken(token,process);
        stageResponseList.add(new StageResponse(processToken,stageId,response));
        when(processTokenRepository.findByToken(token)).thenReturn(processToken);
        ArgumentCaptor<StageResponse> stageResponseArgumentCaptor = ArgumentCaptor.forClass(StageResponse.class);
        when(stageResponseRepository.save(stageResponseArgumentCaptor.capture())).thenReturn(null);

        when(processRepository.findById(any())).thenReturn(Optional.of(process));
        ArgumentCaptor<ProcessToken> processTokenArgumentCaptor = ArgumentCaptor.forClass(ProcessToken.class);
        when(processTokenRepository.save(processTokenArgumentCaptor.capture())).thenReturn(null);
        when(stageResponseRepository.findAllByStageIdIn(any())).thenReturn(stageResponseList);
        followerService.answerStage(token, stageId, response);

        assertEquals(token, stageResponseArgumentCaptor.getValue().getProcessToken().getToken());
        assertEquals(stageId, stageResponseArgumentCaptor.getValue().getStageId());
        assertEquals(response, stageResponseArgumentCaptor.getValue().getResponseText());

    }


}
