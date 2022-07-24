package com.example.ws.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findMemberByName(String name);
    Member findMemberById(Long id);

    Member findMemberByUsername(String username);
    List<Member> findMembersByIsEnabled(boolean enabled);
}
