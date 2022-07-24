package com.example.ws.shared;


import com.example.ws.meeting.Meeting;
import com.example.ws.meeting.MeetingRepository;
import com.example.ws.user.Member;
import com.example.ws.user.MemberRepository;
import com.example.ws.user.Role;
import com.example.ws.user.dto.MemberToServerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Component
public class Validator {

    private final MemberRepository memberRepository;
    private final MeetingRepository meetingRepository;

    @Autowired
    public Validator(MemberRepository memberRepository, MeetingRepository meetingRepository) {
        this.memberRepository = memberRepository;
        this.meetingRepository = meetingRepository;
    }

    public Response validateNewMember(MemberToServerDTO memberToServerDTO){
        Response response = new Response();
        response.setName("validationError");
        HashMap<String, String> errors = commonRules(memberToServerDTO);
        Member member = memberRepository.findMemberByUsername(memberToServerDTO.getUsername());
        if (member != null){
            errors.put("username", "username already exists");
        }
        response.setErrors(errors);
        if (errors.size() == 0){
            response.setName("successful operation");
        }
        return response;
    }

    public Response validateUpdate(MemberToServerDTO memberToServerDTO, String username){
        Response response = new Response();
        response.setName("validationErrors");
        HashMap<String, String> errors = commonRules(memberToServerDTO);
        Member possibleMember = memberRepository.findMemberByUsername(memberToServerDTO.getUsername());
        if (possibleMember != null && !Objects.equals(possibleMember.getUsername(), username)){
            errors.put("username", "username already exists");
        }
        Member member = memberRepository.findMemberByUsername(username);
        if (member == null){
            errors.put("user", "user does not exist");
        }
        response.setErrors(errors);
        if (errors.size() == 0){
            response.setName("successful operation");
        }
        return response;
    }

    private HashMap<String, String> commonRules(MemberToServerDTO memberToServerDTO){
        HashMap<String, String> errors = new HashMap<>();
        String name = memberToServerDTO.getName();
        String username = memberToServerDTO.getUsername();
        String password = memberToServerDTO.getPassword();
        String passwordRepeat = memberToServerDTO.getPasswordRepeat();


        if (name == null || name.length() > 255 || name.length() < 4){
            errors.put("name", "must be size between 4 and 255");
        }
        if (username == null || username.length() > 255 || username.length() < 4){
            errors.put("username", "must be size between 4 and 255");
        }
        if (password == null || !password.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")){
            errors.put("password", "password must contain one capital letter, one special character," +
                    " one number and must be of size at least 8");
        }
        if((password != null && passwordRepeat != null) && !password.matches(passwordRepeat)){
            errors.put("passwordRepeat", "passwords don't match");
        }

        return errors;
    }

    public boolean validateMember(String username){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            return Objects.equals(currentUserName, username);
        }
        return false;
    }

    public boolean isCreator(String username, Long meetingID){
        Member member = memberRepository.findMemberByUsername(username);
        Meeting meeting = meetingRepository.findById(meetingID).get();

        List<Meeting> meetings = meetingRepository.findMeetingsByCreatorMember(member);

        return meetings.contains(meeting);
    }

    public boolean isParticipant(String username, Long meetingID){
        Member member = memberRepository.findMemberByUsername(username);
        List<Meeting> meetingList = meetingRepository.findAll();
        for (Meeting meeting: meetingList){
            if (Objects.equals(meeting.getId(), meetingID)){
                Set<Member> memberList = meeting.getJoinedMembers();
                if (memberList.contains(member)){
                    return true;
                }
            }
        }
        return false;
    }

    public boolean isAdmin(String username){
        Member member = memberRepository.findMemberByUsername(username);
        return member.getRole() == Role.ADMIN;
    }

    public boolean isAdmin(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();
            Member member = memberRepository.findMemberByUsername(currentUserName);
            return member.getRole() == Role.ADMIN;
        }
        return false;
    }
}
