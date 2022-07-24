package com.example.ws.user;

import com.example.ws.meeting.Meeting;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Member {
    @Id
    @SequenceGenerator(
            name = "member_sequence",
            sequenceName = "member_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "member_sequence"
    )
    private Long id;

    private String name;
    private String username;

    @JsonIgnore
    private String password;

    private Role role;
    private boolean isEnabled;

    @OneToMany(mappedBy = "creatorMember")
    @JsonIgnore
    private Set<Meeting> createdMeetings = new HashSet<>();

    @ManyToMany(mappedBy = "joinedMembers")
    @JsonIgnore
    private Set<Meeting> joinedMeetings = new HashSet<>();

    public Member(String name, String username, String password, String role) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = Role.getRole(role);
        this.isEnabled = true;
    }
}
