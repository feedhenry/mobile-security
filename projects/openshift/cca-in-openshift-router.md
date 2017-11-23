# Support Client Certificate Authentication in OpenShift Routers

By default, the OpenShift router doesn't support Client Certificate Authentication (CCA), however, it is possible to add support for it using the customised template. Here are the steps:

1. Copy this [template file](https://gist.github.com/wei-lee/1dc94ec67fa2a30115a416614dcce750) locally.
2. Create a mapping file that is similar to [this](https://gist.github.com/wei-lee/756e6afcb4f3778df016d6c56e81206f). For each line, the first part should be a regular expression to match the hostname of the route, and the second part should be the [namespace]:[appname]. You can have multiple lines in this file.
3. Export the CA certificate that can be used to verify the client certs into a PEM file.
4. Login as the `system:admin` user using `oc`, and use the `default` project
    ```
    oc login -u system:admin
    oc project default
    ```
5. Create some configmaps for the files created in step 1-3:
    ```
    oc create configmap ccaconfig --from-file=haproxy-config.template
    oc create configmap caaverifymap --from-file=os_sni_verify.map
    oc create configmap ccaca --from-file=ca.pem
    ```
6. Edit the deploy config for the router:
    ```
    oc edit dc/router
    ```
7. Add a new env var to the container to specify the template file path:
    ```
    ...
    - name: TEMPLATE_FILE
      value: /var/lib/haproxy/conf/custom/config/haproxy-config.template
    ...
    ```
8. Attache the configmaps created in step 5 as PVs to the container
    ```
    ...
    volumeMounts:
         - mountPath: /etc/pki/tls/private
           name: server-certificate
           readOnly: true
         - mountPath: /var/lib/haproxy/conf/custom/config
           name: config-volume
         - mountPath: /var/lib/haproxy/conf/custom/map
           name: map-volume
         - mountPath: /var/lib/haproxy/conf/custom/ca
           name: ca-volume
    ...
    volumes:
       - name: server-certificate
         secret:
           defaultMode: 420
           secretName: router-certs
       - configMap:
           defaultMode: 420
           name: ccaconfig
         name: config-volume
       - configMap:
           defaultMode: 420
           name: caaverifymap
         name: map-volume
       - configMap:
           defaultMode: 420
           name: ccaca
         name: ca-volume
    ```
    Full example can be found [here](https://gist.github.com/wei-lee/2143bb6d81a35f78c395f58e0e917aa1)
9. Redeploy the router
    ```
    oc rollout latest dc/router
    ```
10. Create a route in OpenShift as normal, and make sure the hostname is listed in the mapping file in step 2.
11. Navigate the browser to the route. If you have a valid cert, you will get prompted for it. Otherwise it will continue to progress as normal. However, if the value for `verify` in [this line](https://gist.github.com/wei-lee/1dc94ec67fa2a30115a416614dcce750#file-haproxy-config-template-L262) is set to `required`, you will see the connection will failed because you don't have a valid cert.

## Work with Keycloak

To work with Keycloak, you need to use this PR: https://github.com/keycloak/keycloak/pull/4546. This PR will make sure Keycloak can fetch the client cert info from a HTTP header, and then process the authentication/authorisation flow as normal.

To try it on OpenShift, you can use this docker image: weilee/keycloak-openshift:1.0. Make sure set a new env var `CERT_LOOKUP_PROVIDER` to `haproxy`.

