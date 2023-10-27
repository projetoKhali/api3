package com.khali.api3.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.domain.user.User;
import com.khali.api3.repositories.ResultCenterRepository;
import com.khali.api3.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ResultCenterService {

    @Autowired
    private ResultCenterRepository resultCenterRepository;
    @Autowired
    private UserRepository userRepository;

    public void deleteResultCenterByCode (Integer code) {
        ResultCenter resultCenter = resultCenterRepository.findByCode(code);
        if (resultCenter != null) {
            resultCenterRepository.delete(resultCenter);
        } else {
            // Lida com o caso em que o cliente com o CNPJ especificado não foi encontrado
            throw new EntityNotFoundException("Centro de Resultado não encontrado com o codigo: " + code);
        }
    }

    // ao passar como parametro o id do gestor logado, retorna uma lista de Result Centers geridas pelo gestor
    public List<ResultCenter> findByGestorID(Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            User gestor = user.get();
            return resultCenterRepository.findByGestor(gestor);
        }else{throw new EntityNotFoundException("Gestor não encontrado com o id: " + id);}
    }
}
