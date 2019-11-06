package com.okta.developer.alert.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.okta.developer.alert.config.KafkaProperties;
import com.okta.developer.alert.domain.StoreAlert;
import com.okta.developer.alert.repository.StoreAlertRepository;
import com.okta.developer.alert.service.dto.StoreAlertDTO;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.errors.WakeupException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class AlertKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(AlertKafkaConsumer.class);

    private final AtomicBoolean closed = new AtomicBoolean(false);

    public static final String TOPIC = "topic_alert";

    private final KafkaProperties kafkaProperties;

    private KafkaConsumer<String, String> kafkaConsumer;

    private StoreAlertRepository storeAlertRepository;

    private EmailService emailService;

    public AlertKafkaConsumer(KafkaProperties kafkaProperties, StoreAlertRepository storeAlertRepository, EmailService emailService) {
        this.kafkaProperties = kafkaProperties;
        this.storeAlertRepository = storeAlertRepository;
        this.emailService = emailService;
    }

    public void start() {
        log.info("Kafka consumer starting...");
        this.kafkaConsumer = new KafkaConsumer<>(kafkaProperties.getConsumerProps());
        Runtime.getRuntime().addShutdownHook(new Thread(this::shutdown));

        Thread consumerThread = new Thread(() -> {
            try {
                kafkaConsumer.subscribe(Collections.singletonList(TOPIC));
                log.info("Kafka consumer started");
                while (!closed.get()) {
                    ConsumerRecords<String, String> records = kafkaConsumer.poll(Duration.ofSeconds(3));
                    for (ConsumerRecord<String, String> record : records) {
                        log.info("Consumed message in {} : {}", TOPIC, record.value());
                        ObjectMapper objectMapper = new ObjectMapper();
                        StoreAlertDTO storeAlertDTO = objectMapper.readValue(record.value(), StoreAlertDTO.class);
                        StoreAlert storeAlert = new StoreAlert();
                        storeAlert.setStoreName(storeAlertDTO.getStoreName());
                        storeAlert.setStoreStatus(storeAlertDTO.getStoreStatus());
                        storeAlert.setTimestamp(Instant.now());
                        storeAlertRepository.save(storeAlert);

                        emailService.sendSimpleMessage(storeAlertDTO);
                    }
                }
                kafkaConsumer.commitSync();
            } catch (WakeupException e) {
                // Ignore exception if closing
                if (!closed.get()) throw e;
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            } finally {
                kafkaConsumer.close();
            }
        });
        consumerThread.start();
    }

    public KafkaConsumer<String, String> getKafkaConsumer() {
        return kafkaConsumer;
    }

    public void shutdown() {
        log.info("Shutdown Kafka consumer");
        closed.set(true);
        kafkaConsumer.wakeup();
    }
}
