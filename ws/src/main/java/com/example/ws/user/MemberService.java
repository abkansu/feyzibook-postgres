package com.example.ws.user;

import com.example.ws.meeting.Meeting;
import com.example.ws.meeting.MeetingService;
import com.example.ws.shared.Response;
import com.example.ws.shared.Validator;
import com.example.ws.user.dto.MemberToClientDTO;
import com.example.ws.user.dto.MemberToServerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final Validator validator;
    private final MeetingService meetingService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository, Validator validator, MeetingService meetingService) {
        this.memberRepository = memberRepository;
        this.validator = validator;
        this.meetingService = meetingService;
    }

    public ResponseEntity<Response> saveMember(MemberToServerDTO memberToServerDTO) {
        Response response = validator.validateNewMember(memberToServerDTO);
        if(response.getErrors().size() != 0){
            return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
        }
        Member member = new Member(memberToServerDTO.getName(),
                memberToServerDTO.getUsername(),
                passwordEncoder.encode(memberToServerDTO.getPassword()),
                "USER");
        memberRepository.save(member);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

    public String deleteMember(String username) {
        if(!validator.validateMember(username)){
            throw new RuntimeException("username not valid");
        }
        Member member = memberRepository.findMemberByUsername(username);

        List<Long> meetingIDs = new ArrayList<>();
        Iterator<Meeting> iteratorMeetings = member.getCreatedMeetings().iterator();
        for (Iterator<Meeting> it = iteratorMeetings; it.hasNext(); ) {
            Meeting meeting = it.next();
            meetingIDs.add(meeting.getId());
        }
        for (Long i : meetingIDs){
            meetingService.deleteMeeting(username, i);
        }

        List<Long> meetingIDS = new ArrayList<>();
        Iterator<Meeting> iteratorMeetingsToUnjoin = member.getJoinedMeetings().iterator();
        for (Iterator<Meeting> iterator = iteratorMeetingsToUnjoin; iterator.hasNext(); ) {
            Meeting meeting = iterator.next();
            meetingIDS.add(meeting.getId());
        }

        for (Long i : meetingIDS){
            meetingService.unjoinMeeting(username, i);
        }


        memberRepository.delete(member);
        return "deleted";
    }

    public MemberToClientDTO getMemberToClientDTO(String username) {
//        if(!validator.validateMember(username)){
//            throw new RuntimeException("username not valid");
//        }
        Member member = memberRepository.findMemberByUsername(username);
        return new MemberToClientDTO(member.getName(), member.getUsername(),
                member.getJoinedMeetings(), member.getCreatedMeetings(), member.getRole());
    }

    public Member getMember(String username) {
        return memberRepository.findMemberByUsername(username);
    }

    public ResponseEntity<Response> updateMember(MemberToServerDTO memberToServerDTO, String username) {
        Response response = validator.validateUpdate(memberToServerDTO, username);
        if(response.getErrors().size() != 0){
            return new ResponseEntity<Response>(response, HttpStatus.BAD_REQUEST);
        }
        Member member = memberRepository.findMemberByUsername(username);
        member.setUsername(memberToServerDTO.getUsername());
        member.setName(memberToServerDTO.getName());
        member.setPassword(passwordEncoder.encode(memberToServerDTO.getPassword()));
        memberRepository.save(member);
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }


}
