package lt.codecrusaders.backend.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryCreationDTO {
    @NotEmpty
    @Size(min = 1, max = 50, message = "Name must be between 1 and 50 characters")
    private String name;
}
