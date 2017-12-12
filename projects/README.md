# Run

## Local Development

```bash
docker-compose build
docker-compose start

# The api server will be running on localhost:8080, and Keycloak will be running on localhost:9090
curl http://localhost:8080/note # Should get "Access Denied" error
```

## On OpenShift (security.skunkhenry.com)

See [this file](./openshift/README.md).