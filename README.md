# microservice-arch


## Getting started

Installing dependencies:
```
yarn
```

Running locally:
```
yarn dev
```

## Deploying to Heroku

The following is to deploy the single auth service

Create a heroku service:
```
heroku app:create service-auth
```

In your heroku dashboard you must specify what microservice you wish to execute by setting a ```SERVICE``` environment variable. To run the auth service, we will set it to ```auth```.

Rename the remote to something more appropriate
```
git remote rename heroku heroku-auth
```

Stage commit your changes then run the following to publish
```
git push heroku-auth master
```
