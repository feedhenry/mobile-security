In this folder you can find sample CA key & cert that can be used to verify client certificate authentication.

To generate a new client cert for a user:

1. Request the ca.key file and it's password by emailing to weil@redhat.com
2. Generate a new client key & signing request for the user:
   ```
   openssl genrsa -out client.key 4096
   openssl req -new -key client.key -out client.req
   ```
3. Use the CA cert and key to sign the client cert. Make sure the value of cert's common name field is the user's username or email address.
   ```
   openssl x509 -req -in client.req -CA ca.cer -CAkey ca.key -set_serial <changeit> -extensions client -days 365 -outform PEM -out client.cer
   ```
4. Convert the client's key & cert into PKCS12 format, and remove the cert and key files:
   ```
   openssl pkcs12 -export -inkey client.key -in client.cer -out client.p12
   rm client.key client.cer client.req
   ```
5. Then distribute the public CA cert and the user's cert to user and install them on the device.