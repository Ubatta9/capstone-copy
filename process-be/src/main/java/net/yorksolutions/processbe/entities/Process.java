package net.yorksolutions.processbe.entities;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Process {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "process_id")
    public List<Stage> stageList;

    public String title;

    public Process(String title, List stageList) {
        this.title = title;
        this.stageList = stageList;
    }

    public Process() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public List<Stage> getStageList() {
        return stageList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Process)) return false;
        Process process = (Process) o;
        return Objects.equals(getId(), process.getId()) && Objects.equals(getTitle(), process.getTitle());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle());
    }
}
