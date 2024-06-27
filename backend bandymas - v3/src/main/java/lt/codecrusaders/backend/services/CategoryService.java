package lt.codecrusaders.backend.services;

import lt.codecrusaders.backend.model.dto.TaskCreationDTO;
import lt.codecrusaders.backend.model.dto.CategoryCreationDTO;
import lt.codecrusaders.backend.model.entity.Category;
import lt.codecrusaders.backend.model.entity.Task;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryCreationDTO categoryCreationDTO);
    Category getCategoryById(Long id);
    void deleteCategoryById(Long id);
    Category updateCategory(Long id, Category category);
    List<Category> getAllCategories();
    List<Category> findCategoriesByName(String name, String show);
    Task createCategoryTask(Long categoryId, TaskCreationDTO taskCreationDTO);
    boolean deleteCategoryTask(Long categoryId, Long taskId);
    Task updateCategoryTask(Long categoryId, Long taskId, Task task);
    List<Task> getAllCategoryTasks(Long categoryId);
    List<Task> findCategoryTasksByName(Long categoryId, String name);
}
