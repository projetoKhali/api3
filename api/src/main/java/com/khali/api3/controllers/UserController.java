package com.khali.api3.controllers;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.member.Member;
import com.khali.api3.domain.permission.Permission;
import com.khali.api3.domain.user.Cryptography;

// import com.khali.api3.domain.user.Cryptography;

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

    @GetMapping("/usertype/{userType}")
    public List<User> getByUserType(@PathVariable UserType userType) {
        // return userRepository.findByUserType(userType);
        return userRepository
            .findAll()
            .stream()
            .filter(user -> user.getUserType() == userType)
            .collect(Collectors.toList());
    }

    // @GetMapping("/{name}")
    // public String getUserIdByName(@PathVariable User user) {
    //     String userId = userRepository.findUserByName(user);
    //     return userId.getName();
    // }


    @GetMapping("/permissions/{id}")
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
                permissions.add(Permission.Config);
                for (Permission permission : permissions) System.out.println(permission);
            return permissions;
        } catch (Error e) {
            e.printStackTrace();
            return new ArrayList<Permission>();
        }
    }

    // @PostMapping
    // public User createUser(@RequestBody User user) {
    //     user.setPassword(Cryptography.crypt(user.getRegistration()));
    //     return userRepository.save(user);
    // }

    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setPassword(Cryptography.encode(user.getRegistration()));
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

        return userRepository.save(user);
    }
    @PutMapping("/{id}/updatePassword")
    public User updatePassword(@PathVariable Long id, @RequestBody String password) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        user.setPassword(password);

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
        user.setExpiredDate(null);
        List<Member> members = membersService.getMembersByUserId(id);
        membersService.alterMembersStatus(members,true);
        return userRepository.save(user);
    }

    // desativa usuário
    @PutMapping("/{id}/deactivate")
    public User deactivateUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        user.setExpiredDate(timestamp);
        List<Member> members = membersService.getMembersByUserId(id);
        membersService.alterMembersStatus(members,false);
        return userRepository.save(user);
    }

    @GetMapping("/login")
    public User getLogin(String email, String password) {
        return userService.getValidatedUser(email, Cryptography.encode(password));
    }
}
