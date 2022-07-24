package com.example.ws.admin;

import com.example.ws.user.dto.MemberToClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/1.0/admin")
public class AdminController {

    @Autowired
    AdminService adminService;


    @DeleteMapping("/{username}")
    public ResponseEntity<?> disableUser(@PathVariable("username") String username){
        return adminService.disableUser(username);
    }

    @PutMapping("/{username}")
    public ResponseEntity<?> enableUser(@PathVariable("username") String username){
        return adminService.enableUser(username);
    }
    @GetMapping("/getDisabled")
    public List<MemberToClientDTO> getDisabledMembers(){
        return adminService.getMembers(false);
    }


    @GetMapping("/enabledUsers")
    public List<MemberToClientDTO> getEnabledMembers(){return  adminService.getMembers(true);}



}
