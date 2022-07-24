package com.example.ws.meeting;

import com.example.ws.user.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Meeting {
    @Id
    @SequenceGenerator(
            name = "Meeting_sequence",
            sequenceName = "Meeting_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Meeting_sequence"
    )
    private Long id;

    @ManyToOne
    private Member creatorMember;

    @ManyToMany
    @JoinTable(
            name = "meeters",
            joinColumns = @JoinColumn(name = "meeting_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private Set<Member> joinedMembers = new HashSet<>();

    private String header;
    private String context;
    private String beginDate;
    private String endDate;
    private String date = ""
            + String.format("%02d" ,Calendar.getInstance().get(Calendar.DAY_OF_MONTH)) + "/"
            + String.format("%02d" , (Calendar.getInstance().get(Calendar.MONTH) + 1)) + "/"
            + Calendar.getInstance().get(Calendar.YEAR) + "   -   "
            + String.format("%02d" ,Calendar.getInstance().get(Calendar.HOUR_OF_DAY)) + "."
            + String.format("%02d" ,Calendar.getInstance().get(Calendar.MINUTE));

    public Meeting(Member creatorMember, String header, String context, String beginDate, String endDate){
        this.context = context;
        this.creatorMember = creatorMember;
        this.header = header;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }




}
