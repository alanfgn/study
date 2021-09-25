package dev.alanfgn.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InitialPage {

    @GetMapping("/")
    public String home(){
        return "Olá";
    }
}
