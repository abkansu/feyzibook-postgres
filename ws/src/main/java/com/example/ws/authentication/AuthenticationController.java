package com.example.ws.authentication;

import com.example.ws.shared.Response;
import com.example.ws.user.Member;
import com.example.ws.user.MemberRepository;
import com.example.ws.user.dto.MemberToClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Base64;

@RestController
public class AuthenticationController {

    @Autowired
    MemberRepository memberRepository;

    @PostMapping("api/1.0/auth")
    public ResponseEntity<MemberToClientDTO> authenticate(@RequestHeader(name="Authorization") String authorization){
        String base64 = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64));
        String[] parts = decoded.split(":");
        String username = parts[0];
        Member member = memberRepository.findMemberByUsername(username);
        MemberToClientDTO memberToClientDTO = new MemberToClientDTO(
                member.getName(),
                member.getUsername(),
                member.getJoinedMeetings(),
                member.getCreatedMeetings(),
                member.getRole()
        );
        return new ResponseEntity<MemberToClientDTO>(memberToClientDTO, HttpStatus.OK);
    }
}
