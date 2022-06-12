package net.yorksolutions.processbe.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    public String name;
    public String type;

    @Column(name = "stage_order")
    public int order;

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "stage_id")
    public List<Choice> choices;

    public Stage(String name,int order, String type, List choices) {
        this.order = order;
        this.name = name;
        this.type = type;
        this.choices = choices;
    }

    public Stage() {

    }

    public List<Choice> getChoices() {
        return choices;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public void setName(String stageDescription) {
        this.name = stageDescription;
    }

    public void setType(String responseType) {
        this.type = responseType;
    }

    public void setChoices(List<Choice> choiceList) {
        this.choices = choiceList;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
