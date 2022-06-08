package net.yorksolutions.processbe.controllers;

import net.yorksolutions.processbe.entities.Process;
import net.yorksolutions.processbe.services.EditorService;
import net.yorksolutions.processbe.services.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/follower")
public class FollowerController {
    private FollowerService followerService;
    private EditorService editorService;

    @Autowired
    public FollowerController(FollowerService followerService, EditorService editorService) {
        this.followerService = followerService;
        this.editorService = editorService;
    }

    @GetMapping(value = "getAllProcesses", produces = "application/json")
    @CrossOrigin
    public List<Process> getAllProcesses() {
        return editorService.getAllProcesses();
    }


    @PostMapping(value = "answerAStage", produces = "application/json")
    @CrossOrigin
    public void answerStage(@RequestParam String token, @RequestParam Long stageId, @RequestParam String response) {
        followerService.answerStage(token, stageId, response);
    }

    @DeleteMapping(value = "cancel")
    @CrossOrigin
    public void cancelProcess(@RequestParam String token) {
        followerService.cancel(token);
    }

    @GetMapping(value = "startProcess", produces = "application/json")
    @CrossOrigin
    public String startProcess(Long processId) {
        return followerService.startProcess(processId);
    }
}
