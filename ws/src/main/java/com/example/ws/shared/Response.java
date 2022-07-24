package com.example.ws.shared;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@Data
public class Response {
    private String name;
    private HashMap<String, String> errors;
}
