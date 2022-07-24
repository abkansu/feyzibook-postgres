package com.example.ws.meeting.dto;

import lombok.Data;

@Data
public class MeetingToServerDTO {
    private String context;
    private String header;
    private String beginDate;
    private String endDate;
}
