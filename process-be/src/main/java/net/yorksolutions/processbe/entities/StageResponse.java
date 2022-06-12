package net.yorksolutions.processbe.entities;

import javax.persistence.*;
import java.util.Objects;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StageResponse)) return false;
        StageResponse that = (StageResponse) o;
        return Objects.equals(id, that.id) && Objects.equals(getProcessToken(), that.getProcessToken()) && Objects.equals(getStageId(), that.getStageId()) && Objects.equals(getResponseText(), that.getResponseText());
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
