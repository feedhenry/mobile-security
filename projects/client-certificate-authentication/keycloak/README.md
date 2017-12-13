# Overview

Here you can find instructions on how to setup Client Certificate authentication using Keycloak locally.

In this setup, there is no reverse proxy server in front of the Keycloak server, and the Keycloak server itself is handling the SSL traffic.

For more details about how to configure Keycloak, please check [here](http://www.keycloak.org/docs/latest/server_admin/index.html#enable-x-509-client-certificate-user-authentication).

# Steps

## Step 1: Create a client certificate for the user

* Follow the steps in [client-certs/README.md](../client-certs/README.md) to generate a new client certificate. You can also use the ones that are already generated.

## Step 2: Start the Keycloak server

* If you have the Keycloak running before, make sure deleting the existing `secure-app` realm first.
* Run `docker-compose up` and wait for all the services to be up and running.
** The local Keycloak server us already configured to use SSL & enable client certificate authentication. The `trust.keystore` file already contains the CA cert that is used to sign the client certs in Step 1.

## Step 3: Setup a local DNS server using dnsmasq

The instructions here are for macOS only, but dnsmasq works on Linux as well.

* Install dnsmasq using homebrew

  ```
  brew install dnsmasq
  ```

* Edit the configuration file of dnsmasq (should be located here: `/usr/local/etc/dnsmasq.conf`) and add the following line:

  ```
  # Replace the ip address to the ip address of your local machine
  address=/rhdev.me/10.32.241.226
  ```

* Start dnsmasq

  ```
  sudo brew services start dnsmasq 
  ```

* Update the DNS server of your host machine to use the dnsmasq service. You can do this in `System Preferences -> Network -> Advanced -> DNS`. Add the ip address of your host machien as the first DNS server. 
* To verify, open a browser window and go to `https://www.rhdev.me:9443`. You should see the Keycloak landing page and the SSL certificate is trusted by the browser. You can login to Keycloak using the default credential `admin/admin`.
* Add dnsmasq as the DNS server on the device:
  * If you are using an Android emulator running on the same machine, you don't need to do anything if the host machine's DNS server entry is updated.
  * If you are using an Android device, you will need to change the the DNS settings by following the instructions [here](http://xslab.com/2013/08/how-to-change-dns-settings-on-android/). You also need to make sure the device and your local machine are using the same network.

## Step 4: Install the CA file and the user certificate on a Mobile device

### On an Android emulator

* Start the Android emulator, please make sure the Android emulator is created from a Google API target image (not Google Play images).
* In the Android Studio, select `Tools -> Android -> Android Device Monitor`
* Click on the `File Explorer` tab
* Select the `storage -> self -> primary` dir in the file tree, and then click on the `Push a file onto the device` button on the top right corner.
* Select the CA file in the first step to push it to the device
* Repeat and push the user certificate created in step 2 to the device
* In the emulator, click on `Settings -> Search`, type in certificate. You should see there is an option to `Install from SD card`. Select it and select it again.
* You can then open files from `Android SDK built for x86` folder. You should see the CA file and user certificate file we just uploaded. Click on them to import.

### On an Android device

* If you have an email account on the device, just email the CA file and the p12 file as attachments to the device. You can open them on the device, and you will be prompted to install them.
* Otherwise, you can copy the CA file and p12 to a SD card, and insert it into the device. On the device, click on `Settings -> Search`, type in certificate. You should see there is an option to `Install from SD card`. Use the option to install the certs.

### On an iOS Simulator

* Start the iOS simlator and then drag and drop the certificate file and user certificates onto the simulator. The simulator will download the files and prompt you to confirm installation.
* After the root cert is installed, go to "Settings -> General -> About -> Certificate Trust Settings" and enable the newly installed CA cert.

### On an iOS Device

* Send the certificates & p12 files as email attachments, or use services like Google Drive or Dropbox to sync the files on the device. Install them on the device.
* After the root cert is installed, go to "Settings -> General -> About -> Certificate Trust Settings" and enable the newly installed CA cert.

## Step 5: Verify you can access the Keycloak server from the emulator

* Go to the browser of the emulator and type in `https://www.rhdev.me:9443` in the address bar. You should see the Keycloak landing page and the certificate is valid.

## Step 6: Enable client certificate authentication in Keycloak

* From your local machine, login as the admin user to the Keycloak server.
* Select the `secure-app` realm and click on `Authentication`
* Click on `Bindings` tab. In the drop down for `Browser Flow`, choose `X.509 browser` flow and then save.

## Step 7: Run the sample app and perform authentication

* Run the sample Android app. Perform authentication.
* When the system browser is loaded, you should be see that the certificate is loaded into the browser automatically.
* Continue and you should logged in succesfully from the app.









