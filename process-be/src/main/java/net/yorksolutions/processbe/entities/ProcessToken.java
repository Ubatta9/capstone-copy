package net.yorksolutions.processbe.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class ProcessToken {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    @JsonProperty("token")
    String token;

    @ManyToOne
    @JoinColumn(name = "process_id")
    Process process;
    boolean isFinished;

    public ProcessToken() {

    }

    public Process getProcess() {
        return process;
    }

    public ProcessToken(String token, Process process) {
        this.token = token;
        this.process = process;
        this.isFinished = false;
    }

    public String getToken() {
        return token;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }

}
