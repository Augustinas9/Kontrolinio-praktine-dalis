package lt.codecrusaders.backend.repositories;

import lt.codecrusaders.backend.model.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.category.id = ?1 AND LOWER(t.name) LIKE LOWER(CONCAT('%', ?2, '%'))")
    List<Task> findByCategoryIdAndNameContaining(Long categoryId, String name);

}