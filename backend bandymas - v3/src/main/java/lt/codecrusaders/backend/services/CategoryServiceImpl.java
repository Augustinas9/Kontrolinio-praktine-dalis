package lt.codecrusaders.backend.services;

import lt.codecrusaders.backend.model.dto.CategoryCreationDTO;

import lt.codecrusaders.backend.model.dto.TaskCreationDTO;
import lt.codecrusaders.backend.model.entity.*;
import lt.codecrusaders.backend.repositories.CategoryRepository;
import lt.codecrusaders.backend.repositories.TaskRepository;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final TaskRepository taskRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, TaskRepository taskRepository) {
        this.categoryRepository = categoryRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public Category createCategory(CategoryCreationDTO categoryCreationDTO) {
        Category category = new Category(categoryCreationDTO);
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category existingCategory = optionalCategory.get();
            existingCategory.setName(category.getName());
            return categoryRepository.save(existingCategory);
        } else {
            return null;
        }
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Category> findCategoriesByName(String name, String show) {
        // Since Category does not have status, only search by name
        return categoryRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public Task createCategoryTask(Long categoryId, TaskCreationDTO taskCreationDTO) {
        Category category = getCategoryById(categoryId);
        if (category == null) {
            return null;
        }
        Task categoryTask = new Task();
        Date currentDate = new Date();
        categoryTask.setName(taskCreationDTO.getName());
        categoryTask.setDescription(taskCreationDTO.getDescription());
        categoryTask.setCreated(currentDate);
        categoryTask.setEdited(currentDate);
        categoryTask.setCategory(category);
        category.addTask(categoryTask);
        categoryRepository.save(category);
        return categoryTask;
    }

    @Override
    public boolean deleteCategoryTask(Long CategoryId, Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            if (task.getCategory().getId() == CategoryId) {
                taskRepository.delete(task);
                return true;
            }
        }
        return false;
    }

    @Override
    public Task updateCategoryTask(Long id, Long taskId, Task task) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setName(task.getName());
            existingTask.setDescription(task.getDescription());
            existingTask.setEdited(new Date());
            return taskRepository.save(existingTask);
        }
        return null;
    }

    @Override
    public List<Task> getAllCategoryTasks(Long categoryId) {
        Category category = getCategoryById(categoryId);
        return category.getTasks();
    }

    @Override
    public List<Task> findCategoryTasksByName(Long categoryId, String name) {

        return taskRepository.findByCategoryIdAndNameContaining(categoryId, name);
    }
}
