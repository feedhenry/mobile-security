package com.feedhenry.securenativeandroidtemplate.authenticate;

/**
 * Created by weili on 04/09/2017.
 */

public class AuthenticateProviderImpl implements AuthenticateProvider {

    @Override
    public AuthenticateResult authenticateWithUsernameAndPassword(String username, String password) {
        try {
            // Simulate network access.
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            return null;
        }
        return new AuthenticateResult();
    }
}
