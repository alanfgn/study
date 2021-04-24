package dev.alan.user.service;

import dev.alan.shoppingclient.exception.UserNotFoundException;
import dev.alan.user.dto.DTOConverter;
import dev.alan.shoppingclient.dto.UserDTO;
import dev.alan.user.model.User;
import dev.alan.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDTO> getAll() {
        List<User> users = userRepository.findAll();
        return users.stream().map(DTOConverter::convertUserDTO).collect(Collectors.toList());
    }

    public UserDTO findById(long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            return DTOConverter.convertUserDTO(user.get());
        }
        return null;
    }

    public UserDTO save(UserDTO userDTO) {
        userDTO.setDataCadastro(new Date());
        userDTO.setKey(UUID.randomUUID().toString());

        User user = userRepository.save(User.convert(userDTO));
        return DTOConverter.convertUserDTO(user);
    }

    public boolean delete(long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return true;
        }
        return false;
    }

    public UserDTO findByCpfAndKey(String cpf, String key) {
        User user = userRepository.findByCpfAndKey(cpf, key);
        if(user != null) {
            return DTOConverter.convertUserDTO(user);
        }
        throw new UserNotFoundException();
    }

    public List<UserDTO> queryByName(String name) {
        List<User> users = userRepository.queryByNomeLike(name + "%");
        return users.stream().map(DTOConverter::convertUserDTO).collect(Collectors.toList());
    }

}
