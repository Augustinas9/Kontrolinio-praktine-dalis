package lt.codecrusaders.backend.controllers;

import lt.codecrusaders.backend.model.entity.Task;
import lt.codecrusaders.backend.model.dto.TaskCreationDTO;

import lt.codecrusaders.backend.model.dto.CategoryCreationDTO;
import lt.codecrusaders.backend.model.entity.Category;
import lt.codecrusaders.backend.services.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/categories") // Changed endpoint from "/api/projects" to "/api/categories"
@Validated
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getCategories(
            @RequestParam(required = false, name = "search") String searchQuery,
            @RequestParam(required = false, name = "show") String showQuery,
            @RequestParam(required = false, name = "page") Integer page) {
        List<Category> categories;
        if (searchQuery != null && !searchQuery.isEmpty() || showQuery != null && !showQuery.isEmpty()) {
            categories = categoryService.findCategoriesByName(searchQuery, showQuery);
        } else {
            categories = categoryService.getAllCategories();
        }
        if (page != null && page > 0) {
            int categoriesPerPage = 8;
            int maxPages = (int)Math.ceil((double)categories.size() / categoriesPerPage);
            int startIndex = (page - 1) * categoriesPerPage;
            int endIndex = Math.min(startIndex + categoriesPerPage, categories.size());

            categories = categories.subList(startIndex, endIndex);

            return new ResponseEntity<>(categories, (page == maxPages ? HttpStatus.ACCEPTED : HttpStatus.OK));
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryCreationDTO categoryCreationDTO) {
        Category createdCategory = categoryService.createCategory(categoryCreationDTO);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        if (category != null) {
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id) {
        categoryService.deleteCategoryById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        if (updatedCategory != null) {
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Tasks (renamed to match Category's tasks)

    @PostMapping("/{id}/tasks")
    public ResponseEntity<Task> createCategoryTask(@PathVariable Long id, @RequestBody TaskCreationDTO taskCreationDTO) {
        Task createdTask = categoryService.createCategoryTask(id, taskCreationDTO);
        return new ResponseEntity<>(createdTask, (createdTask != null ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<Task>> getCategoryTasks(@PathVariable Long id, @RequestParam(required = false, name = "search") String searchQuery) {
        List<Task> tasks;
        if (searchQuery != null && !searchQuery.isEmpty()) {
            tasks = categoryService.findCategoryTasksByName(id, searchQuery);;
        } else {
            tasks = categoryService.getAllCategoryTasks(id);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/tasks/{taskID}")
    public ResponseEntity<Void> deleteCategoryTaskByID(@PathVariable Long id, @PathVariable Long taskID) {
        if (categoryService.deleteCategoryTask(id, taskID)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}/tasks/{taskID}")
    public ResponseEntity<Task> updateCategoryTaskByID(@PathVariable Long id, @PathVariable Long taskID, @RequestBody Task task) {
        Task updatedTask = categoryService.updateCategoryTask(id, taskID, task);
        if (updatedTask != null) {
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
