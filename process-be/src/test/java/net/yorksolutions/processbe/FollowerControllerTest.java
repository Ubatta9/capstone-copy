package net.yorksolutions.processbe;

import net.yorksolutions.processbe.controllers.FollowerController;
import net.yorksolutions.processbe.entities.Choice;
import net.yorksolutions.processbe.entities.Process;
import net.yorksolutions.processbe.entities.Stage;
import net.yorksolutions.processbe.entities.StageResponse;
import net.yorksolutions.processbe.services.EditorService;
import net.yorksolutions.processbe.services.FollowerService;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FollowerControllerTest {

    @LocalServerPort
    int port;

    @InjectMocks
    @Autowired
    FollowerController followerController;

    @Mock
    EditorService editorService;

    @Mock
    FollowerService followerService;


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
        String url = "http://localhost:" + port + "/follower/getAllProcesses";

        final ResponseEntity<Process[]> response = rest.getForEntity(url, Process[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(list, Arrays.asList(response.getBody()));
    }


    @Test
    void itShouldAnswerStageSuccessfully() {


        ArgumentCaptor<String> tokenArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Long> stageIdCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<String> responseTextCaptor = ArgumentCaptor.forClass(String.class);
        doNothing().when(followerService).answerStage(tokenArgumentCaptor.capture(), stageIdCaptor.capture(), responseTextCaptor.capture());

        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/follower/answerAStage?token=abc&stageId=11&response=True";

        final ResponseEntity<Void> response = rest.postForEntity(url, null, Void.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals("abc", tokenArgumentCaptor.getValue());
        assertEquals(11, stageIdCaptor.getValue());
        assertEquals("True", responseTextCaptor.getValue());
    }

    @Test
    void itShouldCancelProcessFollowingSuccessfully() {

        ArgumentCaptor<String> tokenArgumentCaptor = ArgumentCaptor.forClass(String.class);
        doNothing().when(followerService).cancel(tokenArgumentCaptor.capture());

        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/follower/cancel?token=abc";

        rest.delete(url);

        assertEquals("abc", tokenArgumentCaptor.getValue());
    }

    @Test
    void itShouldStartAProcesses() {

        when(followerService.startProcess(any())).thenReturn("abcd");
        TestRestTemplate rest = new TestRestTemplate();
        String url = "http://localhost:" + port + "/follower/startProcess?processId=10";

        final ResponseEntity<String> response = rest.getForEntity(url, String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals("abcd", response.getBody());
    }

}
