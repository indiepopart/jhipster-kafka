package com.okta.developer.store.service.dto;

import com.okta.developer.store.domain.Store;

public class StoreAlertDTO {

    private String storeName;
    private String storeStatus;

    public StoreAlertDTO(Store store){
        this.storeName = store.getName();
        this.storeStatus = store.getStatus().name();
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getStoreStatus() {
        return storeStatus;
    }

    public void setStoreStatus(String storeStatus) {
        this.storeStatus = storeStatus;
    }

}
