package com.feedhenry.securenativeandroidtemplate.authenticate;

/**
 * Created by weili on 04/09/2017.
 */

public interface AuthenticateProvider {

    /**
     * Perform the authentication request synchronously
     * @param username
     * @param password
     * @return
     */
    public AuthenticateResult authenticateWithUsernameAndPassword(String username, String password);
}
