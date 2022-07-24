package com.example.ws.meeting;

import com.example.ws.meeting.dto.MeetingToClientDTO;
import com.example.ws.meeting.dto.MeetingToServerDTO;
import com.example.ws.shared.Response;
import com.example.ws.shared.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/1.0/meeting")
public class MeetingController {

    @Autowired
    MeetingService meetingService;

    @Autowired
    Validator validator;

    @GetMapping("/getAll")
    public ResponseEntity<MeetingToClientDTO> getMeetings(){
        return meetingService.getAll();
    }

    @GetMapping("/getAll/{username}")
    public ResponseEntity<MeetingToClientDTO> getUserMeetings(
            @PathVariable("username") String username
    ){
        MeetingToClientDTO meetingToClientDTO = meetingService.getUserMeetings(username);
        return new ResponseEntity<MeetingToClientDTO>(meetingToClientDTO, HttpStatus.OK);
    }

    @PostMapping("/in/createMeeting/{username}")
    public ResponseEntity<Response> createMeeting(@RequestBody MeetingToServerDTO meetingToServerDTO,
                                                  @PathVariable("username") String username){
        return meetingService.createMeeting(meetingToServerDTO.getContext(),
                meetingToServerDTO.getHeader(),
                username,
                meetingToServerDTO.getBeginDate(),
                meetingToServerDTO.getEndDate()
        );
    }

    @DeleteMapping("/in/deleteMeeting/{username}/{meetingID}")
    public ResponseEntity<Response> deleteMeeting(@PathVariable("username") String username,
                                                  @PathVariable("meetingID") Long meetingID){

        return meetingService.deleteMeeting(username, meetingID);
    }

    @PostMapping("/in/joinMeeting/{username}/{meetingID}")
    public ResponseEntity<Response> joinMeeting(@PathVariable("username") String username,
                                                @PathVariable("meetingID") Long meetingID){
        return meetingService.joinMeeting(username, meetingID);
    }

    @DeleteMapping("/in/unjoinMeeting/{username}/{meetingID}")
    public ResponseEntity<Response> unjoinMeeting(@PathVariable("username") String username,
                                                  @PathVariable("meetingID") Long meetingID){
        return meetingService.unjoinMeeting(username, meetingID);
    }

}
