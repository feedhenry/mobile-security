# Overview

Here you can find instructions on how to add support for client certificate authentication using the OpenShift router.

By default, the OpenShift router doesn't support Client Certificate Authentication (CCA). In order to add support for it, we need to use the customised template. 

For more information about how to customise the OpenShift router template, please check [this document](https://docs.openshift.com/container-platform/3.6/install_config/router/customized_haproxy_router.html).

# Steps

## Prerequisites

* This is tested against OpenShift v3.6
* You need to have the OpenShift CLI tool (`oc`) installed locally. You also need the permission to access the `default` project and make changes to the `Router` deploy config. Normally that means you need to the `admin` user permission.

## Step 1

Update the content of [this mapping file](./os_sni_verify.map) to list all the hosts that requires CCA. 

For each line, the first part should be a regular expression to match the hostname of the route, and the second part should be the [namespace]:[appname]. You can have multiple lines in this file. 

This file is used by the router to check what host requires CCA.

## Step 2

Export the public certificate of the CA that is used to sign the client certificate to a PEM file and name it `ca.cer`. You can use [this one](../client-certs/ca.cer)

## Step 3

Run the following commands to configure the router:

```
# login as the admin user
oc login -u admin -p <adminpass>
oc project default

# create the config maps
oc create configmap ccaconfig --from-file=haproxy-config.template
oc create configmap caaverifymap --from-file=os_sni_verify.map
oc create configmap ccaca --from-file=ca.cer

# attach the configmap
oc set volume dc/router --add -t configmap --configmap-name=ccaconfig -m /var/lib/haproxy/conf/custom/config
oc set volume dc/router --add -t configmap --configmap-name=caaverifymap -m /var/lib/haproxy/conf/custom/map
oc set volume dc/router --add -t configmap --configmap-name=ccaca -m /var/lib/haproxy/conf/custom/ca

# update env of the router deployment config
oc set env dc/router TEMPLATE_FILE=/var/lib/haproxy/conf/custom/config/haproxy-config.template
```

Then wait for the router to be restarted.

## Step 4

Create a new route or edit an existing route. To enable CCA for the route, make sure add the following annotations to the route:

```
clientCertificateAuthEnabled: 'true'
clientCertificateAuthSNIPort: '10445'
```

The value for `clientCertificateAuthSNIPort` should be different for each route and it should start from '10445'.

## Step 5

After the route is deployed, view the route from a browser. If the client has certificated installed locally, the client should be prompted to choose the certificate before proceed.

# Work with Keycloak

To work with Keycloak, you need to use this PR: https://github.com/keycloak/keycloak/pull/4546. This PR will make sure Keycloak can fetch the client cert info from a HTTP header, and then process the authentication/authorisation flow as normal.

To try it on OpenShift, you can use this docker image: weilee/keycloak-openshift:1.0. Make sure set a new env var `CERT_LOOKUP_PROVIDER` to `haproxy`.

