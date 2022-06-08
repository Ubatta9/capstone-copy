package net.yorksolutions.processbe.controllers;

import net.yorksolutions.processbe.entities.Process;
import net.yorksolutions.processbe.entities.StageResponse;
import net.yorksolutions.processbe.services.EditorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/editor")
public class EditorController {
    private EditorService editorService;

    @Autowired
    public EditorController(@NonNull EditorService editorService) {
        this.editorService = editorService;
    }

    @GetMapping(value = "getAllProcesses", produces = "application/json")
    @CrossOrigin
    public List<Process> getAllProcesses() {

        return editorService.getAllProcesses();
    }

    @GetMapping(value = "getFinishedProcessFollowings", produces = "application/json")
    @CrossOrigin
    public List<StageResponse> getAllFinishedProcessFollowings() {
        return editorService.getAllFinishedProcessFollowings();
    }

    @PostMapping(value = "addProcess", produces = "application/json")
    @CrossOrigin
    public void addProcess(@RequestBody Process process) {
        editorService.addProcess(process);
    }

    @PutMapping(value = "editProcess", produces = "application/json")
    @CrossOrigin
    public Optional<Process> updateProcess(@RequestParam Long processId, @RequestBody Process newProcess) {
        return editorService.updateProcess(processId, newProcess);
    }

    @DeleteMapping(value = "deleteProcess")
    @CrossOrigin
    public void deleteProcess(@RequestParam Long processId) {
        editorService.deleteProcess(processId);
    }
}
