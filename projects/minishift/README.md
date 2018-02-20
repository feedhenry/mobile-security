## Minishift Deployment Guide

Use the files in this folder to create the applications using Minishift.

- Ensure that you have configured Minishift to have enough memory. You can set the memory resources using:

  `$ minishift config set memory 9000`

- Once this is set, you can start Minishift using the following command:

  `$ minishift start`

- If `minishift start` ran successfully, you will be provided with the server URL in the command output, similar to the following:

  ```
  OpenShift server started.

  The server is accessible via web console at:
      https://192.168.42.115:8443

  You are logged in as:
      User:     developer
      Password: <any value>

  To login as administrator:
      oc login -u system:admin

  ```

- You can now login as admin using the `oc login <Server_URL>` command.

   `$ oc login https://192.168.42.115:8443`

- You'll be asked to enter credentials one at a time. `admin` and `admin` can be used for the username and password.

- You can specify a project name using the following name, or use the default `mobile-security` naming scheme.

  `$ oc new-project <project_name>`

- The last step before creating the projects in Openshift is to update the `minishift.json` file to ensure that the routes for the Keycloak and API Server as exposed on your Openshift instance. You will need to update the following `192.168.x.x` address to match your server URL provided above.

  ```
    Line 43: "host": "keycloak.192.168.42.115.nip.io"
    Line 307: "host": "api.192.168.42.115.nip.io"
    Line 364: "value": "https://keycloak.192.168.42.115.nip.io:8080/auth"
  ```

- Once this is done, run `$ ./minishift.sh` and wait for it to complete. This will create a project called `mobile-security` (or the project you created) and it will create both a Keycloak and a NodeJS API Server app in that project. The `secure-app` realm will be created automatically in the Keycloak server also.

- The credentials for the Keycloak server will be available under the `Environment` tab in the Keycloak deployment in Openshift. It will also be printed to the console like the following:

```
--> Deploying template "mobile-security/api-server" for "./minishift.json" to project mobile-security

     * With parameters:
        * Keycloak admin username=admin
        * Keycloak admin password=XXXXXXXX # generated
        * Mongodb username=secure-app
        * Mongodb password=XXXXXXXX # generated
        * Mongodb database name=secure-app
        * Mongodb admin password=XXXXXXXX # generated
```
