package com.okta.developer.store.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import com.okta.developer.store.domain.enumeration.StoreStatus;

/**
 * A Store.
 */
@Document(collection = "store")
public class Store implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("address")
    private String address;

    @Field("status")
    private StoreStatus status;

    @NotNull
    @Field("create_timestamp")
    private Instant createTimestamp;

    @Field("update_timestamp")
    private Instant updateTimestamp;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Store name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Store address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public StoreStatus getStatus() {
        return status;
    }

    public Store status(StoreStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(StoreStatus status) {
        this.status = status;
    }

    public Instant getCreateTimestamp() {
        return createTimestamp;
    }

    public Store createTimestamp(Instant createTimestamp) {
        this.createTimestamp = createTimestamp;
        return this;
    }

    public void setCreateTimestamp(Instant createTimestamp) {
        this.createTimestamp = createTimestamp;
    }

    public Instant getUpdateTimestamp() {
        return updateTimestamp;
    }

    public Store updateTimestamp(Instant updateTimestamp) {
        this.updateTimestamp = updateTimestamp;
        return this;
    }

    public void setUpdateTimestamp(Instant updateTimestamp) {
        this.updateTimestamp = updateTimestamp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Store)) {
            return false;
        }
        return id != null && id.equals(((Store) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Store{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", status='" + getStatus() + "'" +
            ", createTimestamp='" + getCreateTimestamp() + "'" +
            ", updateTimestamp='" + getUpdateTimestamp() + "'" +
            "}";
    }
}
