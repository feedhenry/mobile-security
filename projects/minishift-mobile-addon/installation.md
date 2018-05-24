# Installation and Configuration Guide

## Overview

The mobile security project contains the following services and applications:

* Backend Services
  * Authentication/Authorisation serivce backed by [Keycloak](http://www.keycloak.org/)
  * [An API service](../api-server) protected by Keycloak
* Mobile Applications
  * [Android template app](https://github.com/aerogear/android-showcase-template)
  * [iOS template app](https://github.com/aerogear/ios-showcase-template)
  * [Cordova template app](https://github.com/aerogear/cordova-showcase-template)

This document outlines the required steps to install and configure these services and applications using Minishift with mobile core addon.

## Operational Environment

### Backend Services

[Minishift](https://github.com/minishift/minishift) is used to run the backend services. Please make sure your environment meets the [prerequisites](https://docs.openshift.org/latest/minishift/getting-started/installing.html#install-prerequisites) to run Minishift.

This document is using Minishift version v1.13.1.

### Mobile Applications

In order to build and run the mobile applications, please make sure your environment has the required toolchain installed.

* To build and run the Android template, please make sure [Android Studio and SDK](https://developer.android.com/studio/index.html) is installed.
* To build and run the iOS template, please make sure you have a Mac with [XCode](https://developer.apple.com/xcode/) installed.
* To build the Cordova template, you need to install [nodejs](https://nodejs.org/en/). Since it is a cross-platform application, you can build it against either Android or iOS. However, you need to make sure the corresponding build tools are installed based on the requirement above.

## Installion Guide for Backend Services

1. Install Minishift

    1.1 Download the right release from [Minishift release page](https://github.com/minishift/minishift/releases). Please ensure choose the right package for the operation system.

    1.2 Follow the [Minishift installation instructions](https://docs.openshift.org/latest/minishift/getting-started/installing.html) to install minishift.

2. Install OpenShift CLI

    2.1 Follow this [instructions](https://docs.openshift.org/latest/cli_reference/get_started_cli.html#installing-the-cli) to install the Openshift Cli tool and enable it.

3. Install Mobile Core Addon

    3.1 Clone [minishift-mobile-addon repo](https://github.com/aerogear/minishift-mobilecore-addon) from Github.

    3.2 Follow the Readme file to install and enable the mobile addon.

4. Start Minishift with Mobile Core enabled

    You can run this command to start Minishift with mobile core addon enabled:

    ```
    minishift start --openshift-version 3.7.0 --service-catalog
    ```

    This command will take a few minutes to run and it will print out messages about its progress. Wait until the command finish running. You should see something similar to this near the end of the output:

    ```
    OpenShift server started.

    The server is accessible via web console at:
    https://192.168.64.3.nip.io:8443

    You are logged in as:
    User:     developer
    Password: <any value>

    To login as administrator:
    oc login -u system:admin
    ```

    You should login to the Minishift console using this information.

5. Provision a Keycloak service

    5.1 After login to the Minishift console, you should see something like this:

    ![Project View](images/empty-project.png)

    5.2 Choose Keycloak from the mobile services catalog

    Click on the `Browse Catalog` button, and then choose the `Mobile` sub nav. Click on `Services`, you should see all the services that are available:

    ![Mobile Services](images/mobile-services.png)

    5.3 Provision Keycloak

    Select the `Keycloak` service, and follow the instructions on the screen. You do not need to change anything. At the end, click on `Create` and navigate back to the project overview.

    5.4 Ensure Keycloak is running

    You should see a service called `Keycloak` is being provisioned. Wait until it is ready. You should see something similar to this:

    ![Keycloak Service](images/keycloak-services.png)

6. Configure Keycloak

    6.1 Login to Keycloak

    Once Keycloak is running, you can click on the URL of Keycloak and login to the admin console using the username/password specified in the provision process (default value is admin/admin).

    6.2 Import the realm definition file

    After login, move the cursor to the top left corner and click on `Add Realm`. In the `Add Relam` view, click on `Select file` button and choose the [secure-app-realm.json file](../keycloak/secure-app-realm.json) in the `projects/keycloak` folder of this repo. Then click on `create` and it will create a new realm called `Secure-app`.

7. Create the API Backend Service

   7.1 Login using the OpenShift CLI

   We will use the OpenShift CLI to create the Backend API service. To do that, you first need to login using `oc` and use the right project:

   ```
   oc login https://192.168.64.3:8443 -u developer -p <password>
   oc project my-project
   ```

   Please make sure the right URL and user credential is being used.

   7.2 Create the backend service

   You need to use the `api-server.json` file in this folder and run the following command:

   ```
   oc process -f api-server.json -p API_SERVER_HOST=api.192.168.64.3.nip.io -p KEYCLOAK_URL=https://keycloak-myproject.192.168.64.3.nip.io | oc create -f -
   ```

   Please replace the hostname with the value that matches your own minishift instance.

   Go to Minishift web console and wait for the services to be ready. You should see something similar to this when everything is up and running:

   ![API Server](images/api-services.png)


Now the backend services are up and running. You can now configure and build the client applications.

## Configure and Build the Android Template App

1. Clone the [Android mobile security template](https://github.com/aerogear/android-showcase-template)
2. Follow the instructions in the README file of the repo and make necessary changes to make sure the app will work with services that are running on Minishift.
3. It is likely services running on Minishift use self-signed certificates. If this is the case you also need to follow the instructions in the README file to support it.
4. You can now build the app using Android Studio or the command line tool and install it onto a device or emulator. If you are running the app on a device or emulator that is not on the same machine as Minishift, please make sure the device or emulator can resolve the hostname of the backend services correctly.

## Configure and Build the iOS Template App

1. Clone the [iOS mobile security template](https://github.com/aerogear/ios-showcase-template)
2. Follow the instructions in the README file of the repo and make necessary changes to make sure the app will work with services that are running on Minishift.
3. It is likely services running on Minishift use self-signed certificates. If this is the case you also need to follow the instructions in the README file to support it.
4. You can now build and install the app onto devices using Xcode. If you are running the app on a device or emulator that is not on the same machine as Minishift, please make sure the device or emulator can resolve the hostname of the backend services correctly.

## Configure and Build the Cordova Template App

1. Clone the [Cordova mobile security template](https://github.com/aerogear/cordova-showcase-template)
2. Follow the instructions in the README file of the repo and make necessary changes to make sure the app will work with services that are running on Minishift.
3. It is likely services running on Minishift use self-signed certificates. If this is the case you also need to follow the instructions in the README file to support it.
4. You can now build and install the app onto devices using Xcode for iOS or Android Studio for Android. If you are running the app on a device or emulator that is not on the same machine as Minishift, please make sure the device or emulator can resolve the hostname of the backend services correctly.
