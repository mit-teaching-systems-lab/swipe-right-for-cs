# swipe-right-for-cs
A game for teachers to practice empathizing with young people and authentically connecting their strengths and interests to computer science.

This uses a Postgres database; these `psql` commands will boostrap it for local development.


### To setup locally:
```
$ yarn install
$ yarn db-create swipe-right-db
```


### To develop locally:
```
$ yarn start
```

This will run the server and the create-react-app development server in parallel, writing the output of both to stdout.

Note that the site is responsive and will include a fake frame for an iPhone 5 running Safari at desktop resolution.

Running `yarn start` will also start a [storybook](https://github.com/storybooks/storybook) server on port 9001.  You can use this to create "stories" iterate on UI features.

To develop on device:
```
$ yarn run grok
```

Then open that URL on your phone.



### To run tests:
```
$ yarn test
```

If you want to run the tests, you should create a similar database called "swipe-right-db-test".

You can also run the linter and tests independently for the server or client code, see `package.json` for commands.
