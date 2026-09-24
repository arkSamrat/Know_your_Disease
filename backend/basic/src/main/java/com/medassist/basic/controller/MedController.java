package com.medassist.basic.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medassist.basic.dto.Query;
import com.medassist.basic.service.MedicineService;

@RestController 
@RequestMapping("/api")
public class MedController {
    

    // @GetMapping("/medassist")
    // public void medassist()
    // {
        
    // }

    private final MedicineService medicineService;

    MedController(MedicineService medicineService)
    {
        this.medicineService = medicineService;
    }
    
    @PostMapping("/medicine/recommend")
    public String medassist(@RequestBody Query q)
    {
        
        String result = medicineService.getMedicine(q.getQuery());
        System.out.println(result);
        return result;
    }
    
    
    @PostMapping("/disease/predict")
    public String disease(@RequestBody Query q)
    {
        System.out.println(q.getQuery());
        String result = medicineService.aboutDisease(q.getQuery());
       
        return result;
    }
}
