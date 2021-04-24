package dev.alan.user.dto;

import dev.alan.shoppingclient.dto.UserDTO;
import dev.alan.user.model.User;

public class DTOConverter {

    public static UserDTO convertUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setNome(user.getNome());
        userDTO.setEndereco(user.getEndereco());
        userDTO.setCpf(user.getCpf());
        userDTO.setEmail(user.getEmail());
        userDTO.setTelefone(user.getTelefone());
        userDTO.setDataCadastro(user.getDataCadastro());
        userDTO.setKey(user.getKey());

        return userDTO;
    }

}
