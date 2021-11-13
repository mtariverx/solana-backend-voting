## Get started

Install the dependencies...

```bash
cd back-end
npm install
```


```bash
node server.js
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Project Detail

This is for backend of node server.
This backed mainly consists of 4 parts: nodejs, express, mysql and sequelize.

Here are one database (testdb) and two tables (tutorials and voters).
Tutorials table contains information of wind proposer.
Voters table contains information of wind voters.

