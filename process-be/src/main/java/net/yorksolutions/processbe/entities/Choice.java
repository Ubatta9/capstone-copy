package net.yorksolutions.processbe.entities;

import javax.persistence.*;

@Entity
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    String choiceText;

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
