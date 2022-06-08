package net.yorksolutions.processbe.controllers;

import net.yorksolutions.processbe.entities.Stage;
import net.yorksolutions.processbe.services.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stage")
public class StageController {
    private StageService stageService;
    @Autowired
    public StageController(@NonNull StageService stageService){
        this.stageService = stageService;
    }

    @GetMapping(value="/update")
    @CrossOrigin
    public void updateStage(@RequestParam Long id, @RequestBody Stage stage){
        //return stageService.getAllStages(id);
    }
   // @PostMapping
}
