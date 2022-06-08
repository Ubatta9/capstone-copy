package net.yorksolutions.processbe.entities;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class StageResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;


    @ManyToOne
    @JoinColumn(name = "process_token_token")
    ProcessToken processToken;

    Long stageId;

    String responseText;

    public StageResponse() {

    }

    public ProcessToken getProcessToken() {
        return processToken;
    }

    public void setProcessToken(ProcessToken processToken) {
        this.processToken = processToken;
    }

    public StageResponse(ProcessToken processToken, Long stageId, String responseText) {
        this.processToken = processToken;
        this.stageId = stageId;
        this.responseText = responseText;
    }

    public Long getStageId() {
        return stageId;
    }

    public String getResponseText() {
        return responseText;
    }
}
