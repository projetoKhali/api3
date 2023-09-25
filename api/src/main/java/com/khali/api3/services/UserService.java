package com.khali.api3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.user.User;
import com.khali.api3.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public User findUserByRegistration (String registration) {
        return userRepository.findByRegistration(registration);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public void deleteUserByRegistration (String registration) {
        User user = findUserByRegistration(registration);
        if (user != null) {
            deleteUser(user);
        } else{
            // Lida com o caso em que o cliente com o CNPJ especificado não foi encontrado
            throw new EntityNotFoundException("Usuário não encontrado com o registro: " + registration);
        }
    }

    public User getValidatedUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        return  (user.getPassword().equals(password)) ? user : null;
    }
    
}
