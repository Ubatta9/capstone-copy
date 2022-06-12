package net.yorksolutions.processbe;

import net.yorksolutions.processbe.controllers.EditorController;
import net.yorksolutions.processbe.entities.Choice;
import net.yorksolutions.processbe.entities.Process;
import net.yorksolutions.processbe.entities.Stage;
import net.yorksolutions.processbe.entities.StageResponse;
import net.yorksolutions.processbe.services.EditorService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EditorControllerTest {

    @LocalServerPort
    int port;

    @InjectMocks
    @Autowired
    EditorController editorController;

    @Mock
    EditorService editorService;



    @Test
    void itShouldAddProcessSuccessfully() {

        List<Choice> choiceList = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();

        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc", 1,"multiple", choiceList));

        Process process = new Process("Test Process", stageList);
        process.setId(5L);

        when(editorService.addProcess(any())).thenReturn(5L);

        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/addProcess";

        final ResponseEntity<Long> response = rest.postForEntity(url, process, Long.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(5L, response.getBody());
    }

    @Test
    void itShouldGetAllProcesses() {
        List<Choice> choiceList = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();

        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc", 1,"multiple", choiceList));

        Process process = new Process("Test Process", stageList);
        process.setId(5L);
        List<Process> list = new ArrayList<>();

        list.add(process);

        when(editorService.getAllProcesses()).thenReturn(list);

        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/getAllProcesses";

        final ResponseEntity<Process[]> response = rest.getForEntity(url, Process[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(list, Arrays.asList(response.getBody()));
    }

    @Test
    void itShouldGetAllFinishedProcessFollowings() {
        List<StageResponse> expected = new ArrayList<>();
        expected.add(new StageResponse());
        when(editorService.getAllFinishedProcessFollowings()).thenReturn(expected);


        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/getFinishedProcessFollowings";

        final ResponseEntity<StageResponse[]> response = rest.getForEntity(url, StageResponse[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(expected, Arrays.asList(response.getBody()));
    }

    @Test
    void itShouldUpdateProcessSuccessfully() {

        List<Choice> choiceList = new ArrayList<>();
        List<Stage> stageList = new ArrayList<>();

        choiceList.add(new Choice(1L, "testChoiceText"));
        stageList.add(new Stage("Test Stage Desc",1, "multiple", choiceList));

        Process process = new Process("Test Process Updated", stageList);
        process.setId(5L);

        Process updatedProcess = new Process("Updated Tile", stageList);
        updatedProcess.setId(process.getId());

        when(editorService.updateProcess(5L, process)).thenReturn(Optional.of(updatedProcess));

        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/editProcess?processId=5";

        final ResponseEntity<Process> response = rest.exchange(url, HttpMethod.PUT, new HttpEntity<>(process), Process.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(updatedProcess, response.getBody());
    }

    @Test
    void itShouldDeleteProcessSuccessfully() {

        ArgumentCaptor<Long> processIdCaptor = ArgumentCaptor.forClass(Long.class);
        doNothing().when(editorService).deleteProcess(processIdCaptor.capture());

        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/editor/deleteProcess?processId=5";

        rest.delete(url);

        assertEquals(5L, processIdCaptor.getValue());
    }

}
