package com.example.ws.user.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberToServerDTO {
    private String name;
    private String username;
    private String password;
    private String passwordRepeat;
}
