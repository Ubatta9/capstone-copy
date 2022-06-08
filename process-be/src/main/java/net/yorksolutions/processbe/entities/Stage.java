package net.yorksolutions.processbe.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    public String stageDescription;
    public String responseType;

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "stage_id")
    public List<Choice> choiceList;

    public Stage(String stageDescription, String responseType, List choiceList) {
        this.stageDescription = stageDescription;
        this.responseType = responseType;
        this.choiceList = choiceList;
    }

    public Stage() {

    }

    public List<Choice> getChoiceList() {
        return choiceList;
    }

    public Long getId() {
        return id;
    }

    public String getStageDescription() {
        return stageDescription;
    }

    public String getResponseType() {
        return responseType;
    }

    public void setStageDescription(String stageDescription) {
        this.stageDescription = stageDescription;
    }

    public void setResponseType(String responseType) {
        this.responseType = responseType;
    }

    public void setChoiceList(List<Choice> choiceList) {
        this.choiceList = choiceList;
    }
}
