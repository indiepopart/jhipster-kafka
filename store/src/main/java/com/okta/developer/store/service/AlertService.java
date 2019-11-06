package com.okta.developer.store.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.okta.developer.store.domain.Store;
import com.okta.developer.store.service.dto.StoreAlertDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AlertService {

    private final static Logger logger = LoggerFactory.getLogger(AlertService.class);

    private final StoreKafkaProducer storeKafkaProducer;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public AlertService(StoreKafkaProducer storeKafkaProducer){
        this.storeKafkaProducer = storeKafkaProducer;
    }

    public void alertStoreStatus(Store store){
        try {
            StoreAlertDTO storeAlertDTO = new StoreAlertDTO(store);
            String message = objectMapper.writeValueAsString(storeAlertDTO);
            storeKafkaProducer.send(message);
        } catch (JsonProcessingException e) {
            logger.error("Could not send store alert", e);
            throw new AlertServiceException(e);
        }
    }
}
