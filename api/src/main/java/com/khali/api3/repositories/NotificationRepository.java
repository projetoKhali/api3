package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.notification.Notification;

// manipulação das tabelas
@RepositoryRestResource
public interface NotificationRepository extends JpaRepository<Notification, Long> {

}