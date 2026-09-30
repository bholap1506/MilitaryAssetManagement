package com.bhola.backendmilitaryassetmanagement.service;

import com.bhola.backendmilitaryassetmanagement.model.Base;
import com.bhola.backendmilitaryassetmanagement.repository.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class BaseService {

    @Autowired
    private BaseRepository baseRepository;

    public List<Base> getAllBases() {
        return baseRepository.findAll();
    }

    public Base createBase(@RequestBody Base base) {
        return baseRepository.save(base);
    }
}
