package com.foodblog.service;

import com.foodblog.dto.RecipeDto;
import com.foodblog.dto.UserDto;
import com.foodblog.entity.Recipe;
import com.foodblog.entity.User;
import com.foodblog.exception.ResourceNotFoundException;
import com.foodblog.repository.RecipeRepository;
import com.foodblog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RecipeService recipeService;

    public UserDto getCurrentUserProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return mapToDto(user);
    }

    @Transactional
    public String toggleFavorite(Long recipeId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).get();
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));

        if (user.getFavoriteRecipes().contains(recipe)) {
            user.getFavoriteRecipes().remove(recipe);
            userRepository.save(user);
            return "Recipe removed from favorites";
        } else {
            user.getFavoriteRecipes().add(recipe);
            userRepository.save(user);
            return "Recipe added to favorites";
        }
    }

    private UserDto mapToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        userDto.setFavoriteRecipes(user.getFavoriteRecipes().stream()
                .map(recipeService::mapToDto).collect(Collectors.toSet()));
        userDto.setCreatedRecipes(user.getCreatedRecipes().stream()
                .map(recipeService::mapToDto).collect(Collectors.toSet()));
        return userDto;
    }
}
