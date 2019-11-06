package com.okta.developer.alert.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A StoreAlert.
 */
@Entity
@Table(name = "store_alert")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StoreAlert implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "store_name", nullable = false)
    private String storeName;

    @NotNull
    @Column(name = "store_status", nullable = false)
    private String storeStatus;

    @NotNull
    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStoreName() {
        return storeName;
    }

    public StoreAlert storeName(String storeName) {
        this.storeName = storeName;
        return this;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getStoreStatus() {
        return storeStatus;
    }

    public StoreAlert storeStatus(String storeStatus) {
        this.storeStatus = storeStatus;
        return this;
    }

    public void setStoreStatus(String storeStatus) {
        this.storeStatus = storeStatus;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public StoreAlert timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StoreAlert)) {
            return false;
        }
        return id != null && id.equals(((StoreAlert) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StoreAlert{" +
            "id=" + getId() +
            ", storeName='" + getStoreName() + "'" +
            ", storeStatus='" + getStoreStatus() + "'" +
            ", timestamp='" + getTimestamp() + "'" +
            "}";
    }
}
