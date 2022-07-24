package com.example.ws.user;

public enum Role {
    ADMIN, USER;

    public static Role getRole(String role){
        if (role.equals("ADMIN")){
            return ADMIN;
        }else if(role.equals("USER")){
            return USER;
        }
        throw new RuntimeException();
    }
}
