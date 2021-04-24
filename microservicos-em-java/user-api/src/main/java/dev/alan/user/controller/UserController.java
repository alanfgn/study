package dev.alan.user.controller;

import dev.alan.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import dev.alan.shoppingclient.dto.UserDTO;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String getHome() {
        return  "Hello again spring";
    }

    @GetMapping("/users/")
    public List<UserDTO> getUsers(){
        List<UserDTO> users = userService.getAll();
        return users;
    }

    @GetMapping("/users/{id}")
    public UserDTO findByid(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/users/cpf/{cpf}")
    public UserDTO getUserFilter(
            @PathVariable String cpf,
            @RequestParam(name="key", required = true) String key) {
        return userService.findByCpfAndKey(cpf, key);
    }

    @PostMapping("/users")
    public UserDTO insertUser(@RequestBody UserDTO user){
        return userService.save(user);
    }

    @DeleteMapping("/users/{id}")
    public boolean deleteUser(@PathVariable Long id) {
        return userService.delete(id);
    }

    @GetMapping("/users/search")
    public List<UserDTO> queryByName(
            @RequestParam(name="nome", required = true) String name
    ) {
        return userService.queryByName(name);
    }

}
