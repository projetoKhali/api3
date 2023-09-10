package com.khali.api3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.repositories.ResultCenterRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ResultCenterService {

    @Autowired
    private ResultCenterRepository resultCenterRepository;

    public ResultCenter saveResultCenter (ResultCenter resultCenter) {
        return resultCenterRepository.save(resultCenter);
    }

    public ResultCenter findResultCenterByCode (String code) {
        return resultCenterRepository.findByCode(code);
    }

    public void deleteResultCenter (ResultCenter resultCenter) {
        resultCenterRepository.delete(resultCenter);

    }

    public void deleteResultCenterByCode (String code) {
        ResultCenter resultCenter = findResultCenterByCode(code);
        if (resultCenter != null) {
            deleteResultCenter(resultCenter);
        } else {
            // Lida com o caso em que o cliente com o CNPJ especificado não foi encontrado
            throw new EntityNotFoundException("Centro de Resultado não encontrado com o codigo: " + code);
        }
    }

    
    
}
