package com.okta.developer.alert.web.rest;

import com.okta.developer.alert.AlertApp;
import com.okta.developer.alert.config.TestSecurityConfiguration;
import com.okta.developer.alert.domain.StoreAlert;
import com.okta.developer.alert.repository.StoreAlertRepository;
import com.okta.developer.alert.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.okta.developer.alert.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StoreAlertResource} REST controller.
 */
@SpringBootTest(classes = {AlertApp.class, TestSecurityConfiguration.class})
public class StoreAlertResourceIT {

    private static final String DEFAULT_STORE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STORE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STORE_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STORE_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private StoreAlertRepository storeAlertRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStoreAlertMockMvc;

    private StoreAlert storeAlert;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StoreAlertResource storeAlertResource = new StoreAlertResource(storeAlertRepository);
        this.restStoreAlertMockMvc = MockMvcBuilders.standaloneSetup(storeAlertResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StoreAlert createEntity(EntityManager em) {
        StoreAlert storeAlert = new StoreAlert()
            .storeName(DEFAULT_STORE_NAME)
            .storeStatus(DEFAULT_STORE_STATUS)
            .timestamp(DEFAULT_TIMESTAMP);
        return storeAlert;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StoreAlert createUpdatedEntity(EntityManager em) {
        StoreAlert storeAlert = new StoreAlert()
            .storeName(UPDATED_STORE_NAME)
            .storeStatus(UPDATED_STORE_STATUS)
            .timestamp(UPDATED_TIMESTAMP);
        return storeAlert;
    }

    @BeforeEach
    public void initTest() {
        storeAlert = createEntity(em);
    }

    @Test
    @Transactional
    public void createStoreAlert() throws Exception {
        int databaseSizeBeforeCreate = storeAlertRepository.findAll().size();

        // Create the StoreAlert
        restStoreAlertMockMvc.perform(post("/api/store-alerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeAlert)))
            .andExpect(status().isCreated());

        // Validate the StoreAlert in the database
        List<StoreAlert> storeAlertList = storeAlertRepository.findAll();
        assertThat(storeAlertList).hasSize(databaseSizeBeforeCreate + 1);
        StoreAlert testStoreAlert = storeAlertList.get(storeAlertList.size() - 1);
        assertThat(testStoreAlert.getStoreName()).isEqualTo(DEFAULT_STORE_NAME);
        assertThat(testStoreAlert.getStoreStatus()).isEqualTo(DEFAULT_STORE_STATUS);
        assertThat(testStoreAlert.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
    }

    @Test
    @Transactional
    public void createStoreAlertWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storeAlertRepository.findAll().size();

        // Create the StoreAlert with an existing ID
        storeAlert.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStoreAlertMockMvc.perform(post("/api/store-alerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeAlert)))
            .andExpect(status().isBadRequest());

        // Validate the StoreAlert in the database
        List<StoreAlert> storeAlertList = storeAlertRepository.findAll();
        assertThat(storeAlertList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStoreNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = storeAlertRepository.findAll().size();
        // set the field null
        storeAlert.setStoreName(null);

        // Create the StoreAlert, which fails.

        restStoreAlertMockMvc.perform(post("/api/store-alerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeAlert)))
            .andExpect(status().isBadRequest());

        List<StoreAlert> storeAlertList = storeAlertRepository.findAll();
        assertThat(storeAlertList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStoreStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = storeAlertRepository.findAll().size();
        // set the field null
        storeAlert.setStoreStatus(null);

        // Create the StoreAlert, which fails.

        restStoreAlertMockMvc.perform(post("/api/store-alerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeAlert)))
            .andExpect(status().isBadRequest());

        List<StoreAlert> storeAlertList = storeAlertRepository.findAll();
        assertThat(storeAlertList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimestampIsRequired() throws Exception {
        int databaseSizeBeforeTest = storeAlertRepository.findAll().size();
        // set the field null
        storeAlert.setTimestamp(null);

        // Create the StoreAlert, which fails.

        restStoreAlertMockMvc.perform(post("/api/store-alerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeAlert)))
            .andExpect(status().isBadRequest());

        List<StoreAlert> storeAlertList = storeAlertRepository.findAll();
        assertThat(storeAlertList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStoreAlerts() throws Exception {
        // Initialize the database
        storeAlertRepository.saveAndFlush(storeAlert);

        // Get all the storeAlertList
        restStoreAlertMockMvc.perform(get("/api/store-alerts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storeAlert.getId().intValue())))
            .andExpect(jsonPath("$.[*].storeName").value(hasItem(DEFAULT_STORE_NAME)))
            .andExpect(jsonPath("$.[*].storeStatus").value(hasItem(DEFAULT_STORE_STATUS)))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())));
    }
    
    @Test
    @Transactional
    public void getStoreAlert() throws Exception {
        // Initialize the database
        storeAlertRepository.saveAndFlush(storeAlert);

        // Get the storeAlert
        restStoreAlertMockMvc.perform(get("/api/store-alerts/{id}", storeAlert.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(storeAlert.getId().intValue()))
            .andExpect(jsonPath("$.storeName").value(DEFAULT_STORE_NAME))
            .andExpect(jsonPath("$.storeStatus").value(DEFAULT_STORE_STATUS))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStoreAlert() throws Exception {
        // Get the storeAlert
        restStoreAlertMockMvc.perform(get("/api/store-alerts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStoreAlert() throws Exception {
        // Initialize the database
        storeAlertRepository.saveAndFlush(storeAlert);

        int databaseSizeBeforeUpdate = storeAlertRepository.findAll().size();

        // Update the storeAlert
        StoreAlert updatedStoreAlert = storeAlertRepository.findById(storeAlert.getId()).get();
        // Disconnect from session so that the updates on updatedStoreAlert are not directly saved in db
        em.detach(updatedStoreAlert);
        updatedStoreAlert
            .storeName(UPDATED_STORE_NAME)
            .storeStatus(UPDATED_STORE_STATUS)
            .timestamp(UPDATED_TIMESTAMP);

        restStoreAlertMockMvc.perform(put("/api/store-alerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStoreAlert)))
            .andExpect(status().isOk());

        // Validate the StoreAlert in the database
        List<StoreAlert> storeAlertList = storeAlertRepository.findAll();
        assertThat(storeAlertList).hasSize(databaseSizeBeforeUpdate);
        StoreAlert testStoreAlert = storeAlertList.get(storeAlertList.size() - 1);
        assertThat(testStoreAlert.getStoreName()).isEqualTo(UPDATED_STORE_NAME);
        assertThat(testStoreAlert.getStoreStatus()).isEqualTo(UPDATED_STORE_STATUS);
        assertThat(testStoreAlert.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingStoreAlert() throws Exception {
        int databaseSizeBeforeUpdate = storeAlertRepository.findAll().size();

        // Create the StoreAlert

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStoreAlertMockMvc.perform(put("/api/store-alerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeAlert)))
            .andExpect(status().isBadRequest());

        // Validate the StoreAlert in the database
        List<StoreAlert> storeAlertList = storeAlertRepository.findAll();
        assertThat(storeAlertList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStoreAlert() throws Exception {
        // Initialize the database
        storeAlertRepository.saveAndFlush(storeAlert);

        int databaseSizeBeforeDelete = storeAlertRepository.findAll().size();

        // Delete the storeAlert
        restStoreAlertMockMvc.perform(delete("/api/store-alerts/{id}", storeAlert.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StoreAlert> storeAlertList = storeAlertRepository.findAll();
        assertThat(storeAlertList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
