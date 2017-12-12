#!/bin/bash
export PROJECT_NAME=mobile-security

# Create the project & services
oc new-project $PROJECT_NAME
oc new-app -f ./api-server.json
sleep 1

# Wait for Keycloak to run to import realm data
KEYCLOAK_ROUTE=`oc get routes -l app=keycloak-openshift -o jsonpath={.items[0].spec.host}`
echo "Keycloak route is $KEYCLOAK_ROUTE"
KEYCLOAK_AUTH_URL="https://${KEYCLOAK_ROUTE}/auth/"
NEXT_WAIT_TIME=0
echo "Waiting for Keycloak to return 200"
until $(curl --output /dev/null --silent --head --fail -k $KEYCLOAK_AUTH_URL) || [ $NEXT_WAIT_TIME -eq 120 ]; do
  oc get po
  echo "Still waiting for Keycloak to return 200"
  ((NEXT_WAIT_TIME++))
  sleep 5 # sleep 5 seconds for a max of 120 times (600 seconds = 10 minutes)
done

KEYCLOAK_POD_NAME=`oc get pods -l app=keycloak-openshift -o jsonpath={.items[0].metadata.name}`
echo "Keycloak pod name is $KEYCLOAK_POD_NAME"

echo "Read Keycloak admin username and password"
KEYCLOAK_ADMIN_USERNAME=`oc env pods/$KEYCLOAK_POD_NAME --list | grep KEYCLOAK_USER | cut -d"=" -f2`
KEYCLOAK_ADMIN_PASSWORD=`oc env pods/$KEYCLOAK_POD_NAME --list | grep KEYCLOAK_PASSWORD | cut -d"=" -f2`

echo "Importing Keycloak realm file"
# Sync the data file
oc rsync ./keycloak $KEYCLOAK_POD_NAME:/tmp/

# Do import
oc exec $KEYCLOAK_POD_NAME -- /opt/jboss/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user $KEYCLOAK_ADMIN_USERNAME --password $KEYCLOAK_ADMIN_PASSWORD --config /tmp/kcadm.config
oc exec $KEYCLOAK_POD_NAME -- /opt/jboss/keycloak/bin/kcadm.sh create realms -f /tmp/keycloak/secure-app-realm.json --config /tmp/kcadm.config

echo "Keycloak realm created"


