package net.yorksolutions.processbe.entities;

import javax.persistence.*;

@Entity
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    String choiceText;

    public Choice(Long id, String choiceText) {
        this.id = id;
        this.choiceText = choiceText;
    }

    public Choice() {

    }

    public Long getId() {
        return id;
    }
    public String getChoiceText() {
        return choiceText;
    }

    public void setChoiceText(String choiceText) {
        this.choiceText = choiceText;
    }

}
