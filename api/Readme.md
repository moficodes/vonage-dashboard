## Vonage Dashboard

This is a demo application for using the vonage api.

## Run

```
git clone git@github.com:moficodes/vonage-dashboard.git

cd vonage-dashboard

touch .env
touch private.key

npm install
```

We need the private key from vonage to use the sms api. We also need API_KEY and API_SECRET from vonage account. 

```
API_KEY=
API_SECRET=
```

Populate `.env` file with the two values. Populate `private.key` with the private key.

```
node server.mjs
```

In your browser go to `localhost:3000` to see the webpage. 

