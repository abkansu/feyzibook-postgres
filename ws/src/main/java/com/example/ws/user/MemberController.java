package com.example.ws.user;

import com.example.ws.meeting.MeetingService;
import com.example.ws.meeting.dto.MeetingToServerDTO;
import com.example.ws.shared.Response;
import com.example.ws.user.dto.MemberToClientDTO;
import com.example.ws.user.dto.MemberToServerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(path= "/api/1.0/member")
public class MemberController {

    private final MemberService memberService;
    private final MeetingService meetingService;

    @Autowired
    public MemberController(MemberService memberService, MeetingService meetingService) {
        this.memberService = memberService;
        this.meetingService = meetingService;
    }

    @PostMapping("/signup")
    ResponseEntity<Response> signupMember(@RequestBody MemberToServerDTO memberToServerDTO){
        return memberService.saveMember(memberToServerDTO);
    }

    @GetMapping("/{username}")
    MemberToClientDTO getMember(@PathVariable String username){
        return memberService.getMemberToClientDTO(username);
    }

    @DeleteMapping("/in/deleteMember/{username}")
    String deleteMember(@PathVariable String username){
        return memberService.deleteMember(username);
    }

    @PutMapping("/in/{username}")
    ResponseEntity<Response> updateMember(@RequestBody MemberToServerDTO memberToServerDTO,
                                          @PathVariable("username") String username){
        return memberService.updateMember(memberToServerDTO, username);
    }


}
