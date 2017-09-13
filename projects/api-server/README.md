[![CircleCI](https://circleci.com/gh/wei-lee/mobile-security.svg?style=svg)](https://circleci.com/gh/wei-lee/mobile-security)
[![Known Vulnerabilities](https://snyk.io/test/github/feedhenry/mobile-security/master%2Fprojects%2Fapi-server/badge.svg)](https://snyk.io/test/github/feedhenry/mobile-security/master%2Fprojects%2Fapi-server)

# Secure-backend

This is an example backend RESTFul API server. Requires nodejs >= 6.

The endpoints are protected by Keycloak. At the moment, users will need to login in order to perform any operations.

## Endpoints

* GET /note
* POST /note
* PUT /note/:id
* GET /note/:id
* DELETE /note/:id
