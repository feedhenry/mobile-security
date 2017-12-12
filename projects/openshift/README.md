Use the files in this folder to create the projects on https://security.skunkhenry.com:8443.

1. Login to security.skunkhenry.com.
   ```
   oc login https://security.skunkhenry.com:8443
   ```
2. Run `openshift.sh` and wait for it to complete. This will create a project called `mobile-security` and it will create Keycloak and a NodeJS app in that project. However, the routes will use self-signed certs.
3. To use the CA signed certificate, download the `security.feedhenry.org-wildcar.zip` file from this [JIRA ticket](https://issues.jboss.org/browse/FHOPS-3384). Extract the private key, certs and configure the routes to use the valid certs.
4. To enable client certificate authenticaton, follow the instructions in [this file](../client-certificate-authentication/openshift/README.md).
