package lt.codecrusaders.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lt.codecrusaders.backend.model.dto.CategoryCreationDTO;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories") // Update table name to "categories"
@Data
public class Category {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    public Category(CategoryCreationDTO CategoryCreationDTO) {
        this.name = CategoryCreationDTO.getName();
        this.tasks = new ArrayList<>();
    }

    public Category() {
        // Default constructor
    }

    public void addTask(Task task) {
        tasks.add(task);
    }
}
