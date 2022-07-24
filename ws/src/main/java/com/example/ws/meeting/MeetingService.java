package com.example.ws.meeting;

import com.example.ws.meeting.dto.MeetingToClientDTO;
import com.example.ws.shared.Response;
import com.example.ws.shared.Validator;
import com.example.ws.user.Member;
import com.example.ws.user.MemberRepository;
import com.example.ws.user.MemberService;
import com.example.ws.user.dto.MemberToClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.*;

@Service
public class MeetingService {

    @Autowired
    MeetingRepository meetingRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    Validator validator;

    public ResponseEntity<MeetingToClientDTO> getAll() {
        List<Meeting> firstList = meetingRepository.findAll();
        List<Meeting> lastList = new ArrayList<>();
        for (Meeting meeting: firstList){
            if(meeting.getCreatorMember().isEnabled()){
                lastList.add(meeting);
            }
        }
        Collections.reverse(lastList);
        MeetingToClientDTO meetingToClientDTO = new MeetingToClientDTO(lastList);
        return new ResponseEntity<MeetingToClientDTO>(meetingToClientDTO, HttpStatus.OK);
    }

    public MeetingToClientDTO getUserMeetings(String username) {
//        if(!validator.validateMember(username)){
//            throw new RuntimeException("username not valid");
//        }
        if(memberRepository.findMemberByUsername(username) == null){
            throw new RuntimeException("username does not exist");
        }
        MeetingToClientDTO meetingToClientDTO = new MeetingToClientDTO();
        List<Meeting> meetingList = new ArrayList<>();
        List<Meeting> meetings = meetingRepository.findAll();
        Member member = memberRepository.findMemberByUsername(username);

        for (Meeting meeting: meetings){
            if (meeting.getCreatorMember().getUsername().equals(username)){
                meetingList.add(meeting);
            }else if (meeting.getJoinedMembers().contains(member)){
                meetingList.add(meeting);
            }
        }
        Collections.reverse(meetingList);
        meetingToClientDTO.setListOfMeetings(meetingList);
        return meetingToClientDTO;
    }

    public ResponseEntity<Response> createMeeting(String context, String header, String username, String beginDate, String endDate){
        if(!validator.validateMember(username)){
            throw new RuntimeException("username not valid");
        }
        Member member = memberRepository.findMemberByUsername(username);
        Meeting meeting = new Meeting(
                member,
                header,
                context,
                beginDate,
                endDate
        );
        meetingRepository.save(meeting);

        Set<Meeting> meetings = member.getCreatedMeetings();
        meetings.add(meeting);
        member.setCreatedMeetings(meetings);

        Response response = new Response();
        response.setName("meeting created successfully");
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

    public ResponseEntity<Response> joinMeeting(String username, Long meetingID) {
        if(!validator.validateMember(username)){
            throw new RuntimeException("username not valid");
        }
        if(validator.isParticipant(username, meetingID)){
            throw new RuntimeException("already joined the meeting");
        }
        if (validator.isCreator(username, meetingID)){
            throw new RuntimeException("creator of the meeting");
        }
        Meeting meeting = meetingRepository.findById(meetingID).get();
        Member member = memberRepository.findMemberByUsername(username);

        Set<Member> joinedMembers = meeting.getJoinedMembers();
        joinedMembers.add(member);
        meeting.setJoinedMembers(joinedMembers);

        Set<Meeting> joinedMeetings = member.getJoinedMeetings();
        joinedMeetings.add(meeting);
        member.setJoinedMeetings(joinedMeetings);

        meetingRepository.save(meeting);
        memberRepository.save(member);

        Response response = new Response();
        response.setName("joined meeting successfully");
        return new ResponseEntity<Response>(response, HttpStatus.OK);

    }

    public ResponseEntity<Response> unjoinMeeting(String username, Long meetingID) {
        if(!validator.isAdmin(username)){
            if(!validator.validateMember(username)){
                throw new RuntimeException("username not valid");
            }
            if(!validator.isParticipant(username, meetingID)){
                throw new RuntimeException("not joined the meeting yet");
            }
        }
        Meeting meeting = meetingRepository.findById(meetingID).get();
        Member member = memberRepository.findMemberByUsername(username);

        Set<Member> joinedMembers = meeting.getJoinedMembers();
        joinedMembers.remove(member);
        meeting.setJoinedMembers(joinedMembers);

        Set<Meeting> joinedMeetings = member.getJoinedMeetings();
        joinedMeetings.remove(meeting);
        member.setJoinedMeetings(joinedMeetings);

        meetingRepository.save(meeting);
        memberRepository.save(member);

        Response response = new Response();
        response.setName("unjoined meeting successfully");
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Response> deleteMeeting(String username, Long meetingID) {
        if(!validator.isAdmin(username)){
            if(!validator.validateMember(username)){
                throw new RuntimeException("username not valid");
            }
            if(!validator.isCreator(username, meetingID)){
                throw new RuntimeException("not creator of the meeting");
            }
        }
        Member creator = memberRepository.findMemberByUsername(username);
        Meeting meeting = meetingRepository.findById(meetingID).get();



        Set<Meeting> meetings = creator.getCreatedMeetings();
        meetings.remove(meeting);
        creator.setCreatedMeetings(meetings);

        Set<Member> members = meeting.getJoinedMembers();

        for (Member member: members){
            Set<Meeting> meetingSet = member.getJoinedMeetings();
            meetingSet.remove(meeting);
            member.setJoinedMeetings(meetingSet);
        }
        meetingRepository.delete(meeting);


        Response response = new Response();
        response.setName("meeting deleted successfully");
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }
}
