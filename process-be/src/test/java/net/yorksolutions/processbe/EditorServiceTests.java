package net.yorksolutions.processbe;

import net.yorksolutions.processbe.entities.*;
import net.yorksolutions.processbe.entities.Process;
import net.yorksolutions.processbe.repositories.*;
import net.yorksolutions.processbe.services.EditorService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EditorServiceTests {
    @InjectMocks
    EditorService editorService;
    @Mock
    ProcessRepository processRepository;
    @Mock
    StageRepository stageRepository;
    @Mock
    ChoiceRepository choiceRepository;
    @Mock
    StageResponseRepository stageResponseRepository;
    @Mock
    ProcessTokenRepository processTokenRepository;

    @Test
    void itShouldReturnAllProcessesWhenGetAllProcessesCalled() {
        List<Process> expectedProcessList = new ArrayList<>();
        List<Choice> choiceList  = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();

        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc", 1,"multiple", choiceList));
        expectedProcessList.add(new Process("Test Process", stageList));


        when(processRepository.findAll()).thenReturn(expectedProcessList);
        List<Process> actualProcesses = editorService.getAllProcesses();
        assertEquals(expectedProcessList, actualProcesses);
    }
    @Test
    void itShouldReturnNullForNoProcessWhenGetAllProcessesCalled(){
        List<Process> expectedProcessList = new ArrayList<>();
        when(processRepository.findAll()).thenReturn(expectedProcessList);
        List<Process> actual = editorService.getAllProcesses();
        assertEquals(expectedProcessList,actual);
    }

    @Test
    void itShouldReturnProcessesIdWhenAddProcessesCalled() {
        List<Choice> choiceList  = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();

        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc",1, "multiple", choiceList));

        Process process = new Process("Test Process", stageList);
        process.setId(5L);

        ArgumentCaptor<Process> processArgumentCaptor = ArgumentCaptor.forClass(Process.class);
        when(processRepository.save(processArgumentCaptor.capture())).thenReturn(process);

        Long returnedProcessId = editorService.addProcess(process);
        assertEquals(5L, returnedProcessId);
        assertEquals(process, processArgumentCaptor.getValue());
    }
    @Test
    void itShouldUpdateProcessWhenAProcessIsEdited(){
        List<Choice> choiceList  = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();

        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc", 1,"multiple", choiceList));

        Process process = new Process("Test Process", stageList);
        process.setId(6L);

        when(processRepository.findById(6L)).thenReturn(Optional.of(process));

        Process updatedProcess = new Process("Updated Process Title", stageList);
        updatedProcess.setId(process.getId());

        when(processRepository.save(any())).thenReturn(updatedProcess);

        Optional<Process> actualProcessReturned = editorService.updateProcess(6L, updatedProcess);
        assertEquals(updatedProcess, actualProcessReturned.get());
    }
    @Test
    void itShouldDeleteAProcessWhenDeleteProcessIsCalled(){
        ArgumentCaptor<Long> argumentCaptor = ArgumentCaptor.forClass(Long.class);
        doNothing().when(processRepository).deleteById(argumentCaptor.capture());
        editorService.deleteProcess(10L);
        assertEquals(10L, argumentCaptor.getValue());

    }
    @Test
    void itShouldGiveAllFinishedProcessingsWhenAllFinishedProcessCalled(){
        List<Choice> choiceList  = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();
        List<StageResponse> stageResponse = new ArrayList<>();

        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc",1, "multiple", choiceList));
        Process process = new Process("Test Process", stageList);
        ProcessToken processToken = new ProcessToken("20L", process);
        StageResponse expectedstageResponse = new StageResponse(processToken, 20L, "any Response");
        stageResponse.add(expectedstageResponse);
        when(stageResponseRepository.findAllByProcessTokenIsFinished(anyBoolean())).thenReturn(stageResponse);

        List<StageResponse> actualResponse = editorService.getAllFinishedProcessFollowings();
        assertEquals(stageResponse, actualResponse);
    }

}
