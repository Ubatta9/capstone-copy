package net.yorksolutions.processbe.services;

import net.yorksolutions.processbe.entities.Process;
import net.yorksolutions.processbe.entities.StageResponse;
import net.yorksolutions.processbe.repositories.ProcessRepository;
import net.yorksolutions.processbe.repositories.ProcessTokenRepository;
import net.yorksolutions.processbe.repositories.StageResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EditorService {
    private ProcessRepository processRepository;
    private ProcessTokenRepository processTokenRepository;

    private StageResponseRepository stageResponseRepository;

    @Autowired
    public EditorService(@NonNull ProcessRepository processRepository,
                         ProcessTokenRepository processTokenRepository,
                         StageResponseRepository stageResponseRepository) {
        this.processRepository = processRepository;
        this.processTokenRepository = processTokenRepository;
        this.stageResponseRepository = stageResponseRepository;
    }

    public List<Process> getAllProcesses() {
        return processRepository.findAll();
    }

    public List<StageResponse> getAllFinishedProcessFollowings(){
        return stageResponseRepository.findAllByProcessTokenIsFinished(true);
    }

    public void addProcess(Process process) {
        processRepository.save(process);
    }

    private Process updateWith(Process oldProcess, Process newProcess) {
        oldProcess.title = newProcess.title;
        oldProcess.stageList = newProcess.stageList;
        return oldProcess;
    }

    public Optional<Process> updateProcess(Long processId, Process newProcess) {
        return processRepository.findById(processId).map(oldProcess -> {
            Process updateProcess = updateWith(oldProcess, newProcess);
            return processRepository.save(updateProcess);
        });
    }

    public void deleteProcess(Long processId) {
        processRepository.deleteById(processId);
    }
}
