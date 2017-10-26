# Use Client Certificate Authentication

Here are the steps to perform user authentication using X509 client certificate authentication on an Android emulator:

## Step 1: Import the self-signed CA file to the keychain of your local machine

* Double click on the `certificate.crt` file that is located in the `./projects/certs/ca` directory to import it into the keychain. Make sure the CA certificate is trusted.

## Step 2: Create user certificates and add it to the trust keystore

* Run the following commands to create the user certificate:

  ```
  cd ./projects/certs

  # Generate the client key & cert. You will be prompted for some questions about the certificate. Make sure the answer to `What is your first and last name` is the user's email address.
  keytool -genkey -alias client-alias -keyalg RSA -keypass changeit  -storepass changeit -keystore client_keystore.jks
  ```

* Export the user's certificate and add it to the trust store.

  ```
  # Export the user cert
  keytool -export -alias client-alias -storepass changeit -file client.cer -keystore client_keystore.jks

  # Import the user cert into the trust.keystore file. You should change the alias value to the user's name
  cd ../keycloak
  keytool -import -v -trustcacerts -alias user1 -file ../certs/client.cer -keystore trust.keystore -keypass Password1 -storepass Password1
  ```

* Distribute the client certificate

  To make it easier to distribute the client cert, we convert it to PKCS12 format first:

  ```
  cd ./projects/certs
  keytool -importkeystore -srckeystore client_keystore.jks -destkeystore client_keystore.p12 -deststoretype PKCS12
  ```

## Step 3: Start the Keycloak server

* If you have the Keycloak running before, make sure deleting the existing `secure-app` realm first.
* Run `docker-compose up` and wait for all the services to be up and running.
* Add the following entry to the `hosts` file:
```
127.0.0.1 www.rhdev.me rhdev.me
```
* Open a browser window and go to `https://www.rhdev.me:9443`. You should see the Keycloak landing page and the SSL certificate is trusted by the browser. You can login to Keycloak using the default credential `admin/admin`.

## Step 4: Install the CA file and the user certificate on the emulator

* Start the Android emulator, please make sure the Android emulator is created from a Google API target image (not Google Play images).
* In the Android Studio, select `Tools -> Android -> Android Device Monitor`
* Click on the `File Explorer` tab
* Select the `storage -> self -> primary` dir in the file tree, and then click on the `Push a file onto the device` button on the top right corner.
* Select the CA file in the first step to push it to the device
* Repeat and push the user certificate created in step 2 to the device
* In the emulator, click on `Settings -> Search`, type in certificate. You should see there is an option to `Install from SD card`. Select it and select it again.
* You can then open files from `Android SDK built for x86` folder. You should see the CA file and user certificate file we just uploaded. Click on them to import.

## Step 5: Update the host file of the emulator to add the DNS entry

* Restart the emulator to make sure it is writable:
  
  ```
  emulator -writable-system -netdelay none -netspeed full -avd <AVD name>
  adb root
  adb remount
  ```

* Then pull down the hosts file from the emulator
  
  ```
  adb pull /system/etc/hosts ./
  ```

* Edit the `hosts` file and add an entry to map `www.rhdev.me` to the IP address of your local machine, for example:
  
  ```
  10.201.82.212 www.rhdev.me
  ```

* Push the hosts file to the emulator again
  
  ```
  adb push ./hosts /system/etc
  ```

## Step 6: Verify you can access the Keycloak server from the emulator

* Go to the browser of the emulator and type in `https://www.rhdev.me:9443` in the address bar. You should see the Keycloak landing page and the certificate is valid.

## Step 7: Enable client certificate authentication in Keycloak

* From your local machine, login as the admin user to the Keycloak server.
* Selecte the `secure-app` realm and click on `Authentication`
* Click on `Bindings` tab. In the drop down for `Browser Flow`, choose `X.509 browser` flow and then save.

## Step 8: Run the sample app and perform authentication

* Run the sample Android app from the emulator. Perform authentication.
* When the system browser is loaded, you should be see that the certificate is loaded into the browser automatically.
* Continue and you should logged in succesfully from the app.









