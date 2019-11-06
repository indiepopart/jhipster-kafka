package com.okta.developer.alert.service;

public class EmailServiceException extends RuntimeException {

    public EmailServiceException(Exception exception) {
        super(exception);
    }
}
