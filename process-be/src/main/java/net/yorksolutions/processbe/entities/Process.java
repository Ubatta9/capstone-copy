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
    public List<Stage> stages;

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "process_id")
    public List<ProcessToken> processTokenList;

    public String title;

    public Process(String title, List stages) {
        this.title = title;
        this.stages = stages;
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

    public List<Stage> getStages() {
        return stages;
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

    public void setId(Long id) {
        this.id = id;
    }
}
