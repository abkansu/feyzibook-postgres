package com.example.ws.admin;

import com.example.ws.shared.Validator;
import com.example.ws.user.Member;
import com.example.ws.user.MemberRepository;
import com.example.ws.user.dto.MemberToClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    Validator validator;

    public ResponseEntity<?> disableUser(String username) {
        if(!validator.isAdmin()){
            return new ResponseEntity<String>("unauthorized", HttpStatus.UNAUTHORIZED);
        }
        Member member = memberRepository.findMemberByUsername(username);
        member.setEnabled(false);
        memberRepository.save(member);
        return ResponseEntity.ok("disabled");
    }

    public List<MemberToClientDTO> getMembers(Boolean isEnabled) {
        if(!validator.isAdmin()){
            return null;
        }
        List<MemberToClientDTO> memberToClientDTOS = new ArrayList<>();
        List<Member> memberList = memberRepository.findMembersByIsEnabled(isEnabled);

        for ( Member member : memberList) {
            memberToClientDTOS.add( new MemberToClientDTO(
                    member.getName(),
                    member.getUsername(),
                    member.getJoinedMeetings(),
                    member.getCreatedMeetings(),
                    member.getRole())
            );
        }

        return memberToClientDTOS;
    }

    public ResponseEntity<?> enableUser(String username) {
        if(!validator.isAdmin()){
            return new ResponseEntity<String>("unauthorized", HttpStatus.UNAUTHORIZED);
        }
        Member member = memberRepository.findMemberByUsername(username);
        member.setEnabled(true);
        memberRepository.save(member);
        return ResponseEntity.ok("disabled");
    }

//    public List<MemberToClientDTO> getAllMembers() {
//        if(!validator.isAdmin()){
//            return null;
//        }
//        List<Member> memberList = memberRepository.findAll();
//        List<MemberToClientDTO> members = new ArrayList<>();
//
//        for (Member member: memberList){
//            members.add(new MemberToClientDTO(member.getName(), member.getUsername(), member.getJoinedMeetings(), member.getCreatedMeetings(), member.getRole()));
//
//        }
//        return members;
//    }
}
