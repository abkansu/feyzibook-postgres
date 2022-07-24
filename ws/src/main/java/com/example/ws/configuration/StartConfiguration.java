package com.example.ws.configuration;

import com.example.ws.meeting.Meeting;
import com.example.ws.meeting.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.example.ws.user.Member;
import com.example.ws.user.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class StartConfiguration {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner commandLineRunner(MemberRepository memberRepository, MeetingRepository meetingRepository) {
        return args -> {
            for (int i = 0; i < 10; i++){
                Member member = new Member("user" + i,
                        "__user__" + i,
                        passwordEncoder.encode("1234"),
                        "USER");
                memberRepository.save(member);
                for (int j = 0; j < 3; j++){
                    Meeting meeting = new Meeting(member,
                            "Lorem Ipsum",
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet dui eros. " +
                                    "Nulla tempus ipsum a ultrices auctor. Sed eu lacus pellentesque, dapibus lorem sed," +
                                    "Context number --> " + j, "10/07/2021", "15/10/2022");
                    meetingRepository.save(meeting);
                }
            }
            Member member = new Member("admin",
                    "admin",
                    passwordEncoder.encode("1234"),
                    "ADMIN");
            memberRepository.save(member);

        };
    }
}
