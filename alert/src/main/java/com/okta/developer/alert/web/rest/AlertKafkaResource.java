package com.okta.developer.alert.web.rest;

import com.okta.developer.alert.service.AlertKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/alert-kafka")
public class AlertKafkaResource {

    private final Logger log = LoggerFactory.getLogger(AlertKafkaResource.class);

    private AlertKafkaProducer kafkaProducer;

    public AlertKafkaResource(AlertKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping("/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.send(message);
    }
}
