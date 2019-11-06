package com.okta.developer.store.web.rest;

import com.okta.developer.store.service.StoreKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/store-kafka")
public class StoreKafkaResource {

    private final Logger log = LoggerFactory.getLogger(StoreKafkaResource.class);

    private StoreKafkaProducer kafkaProducer;

    public StoreKafkaResource(StoreKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping("/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.send(message);
    }
}
