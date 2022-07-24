package com.example.ws.user.dto;

import com.example.ws.meeting.Meeting;
import com.example.ws.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class MemberToClientDTO {
    private String name;
    private String username;
    private Set<Meeting> joinedMeetings;
    private Set<Meeting> createdMeetings;
    private Role role;
}
