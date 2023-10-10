package com.khali.api3.controllers;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.permission.Permission;
import com.khali.api3.domain.user.User;
import com.khali.api3.domain.user.UserType;
import com.khali.api3.repositories.UserRepository;
import com.khali.api3.services.MembersService;
import com.khali.api3.services.ResultCenterService;
import com.khali.api3.services.UserService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    @Autowired private final MembersService membersService;
    @Autowired private final ResultCenterService resultCenterService;
    @Autowired private final UserService userService;

    public UserController(
        UserRepository userRepository,
        MembersService membersService,
        ResultCenterService resultCenterService,
        UserService userService
    ) {
        this.userRepository = userRepository;
        this.membersService = membersService;
        this.resultCenterService = resultCenterService;
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    // @GetMapping("/{name}")
    // public String getUserIdByName(@PathVariable User user) {
    //     String userId = userRepository.findUserByName(user);
    //     return userId.getName();
    // }


    @GetMapping("/{id}/permissions")
    public List<Permission> getUserPermissions(@PathVariable Long id) {
        try {
            List<Permission> permissions = new ArrayList<Permission>();
            User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
            if (user.getUserType().equals(UserType.Admin)) {
                permissions.add(Permission.FullAccess);
                permissions.add(Permission.Register);
                permissions.add(Permission.Report);
            }
            if (membersService.getMembersByUser(user).size() > 0) permissions.add(Permission.Appoint);
            if (resultCenterService.findByGestorID(id).size() > 0) permissions.add(Permission.Validate);
            for (Permission permission : permissions) System.out.println(permission);
            return permissions;
        } catch (Error e) {
            e.printStackTrace();
            return new ArrayList<Permission>();
        }
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setActive(true);
        return userRepository.save(user);
    }

    @PutMapping("/{id}/update")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        user.setRegistration(userDetails.getRegistration());
        user.setName(userDetails.getName());
        user.setUserType(userDetails.getUserType());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setActive(userDetails.getActive());

        return userRepository.save(user);
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    //     userRepository.deleteById(id);
    //     return ResponseEntity.ok().build();
    // }

    // ativa usuário
    @PutMapping("/{id}/activate")
    public User activateUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        user.setActive(true);
        user.setExpiredDate(null);
        return userRepository.save(user);
    }
    
    // desativa usuário
    @PutMapping("/{id}/desactivate")
    public User deactivateUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        user.setActive(false);
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        user.setExpiredDate(timestamp);
        return userRepository.save(user);
    }

    public User getLogin(String email, String password) {
        return userService.getValidatedUser(email, password);
    }
}
