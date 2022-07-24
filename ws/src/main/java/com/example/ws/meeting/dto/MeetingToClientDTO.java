package com.example.ws.meeting.dto;

import com.example.ws.meeting.Meeting;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MeetingToClientDTO {
    private List<Meeting> listOfMeetings;
}
