## Martian
Core JavaScript API for MindTouch

[![travis-ci.org](https://travis-ci.org/MindTouch/martian.svg?branch=master)](https://travis-ci.org/MindTouch/martian)
[![codecov.io](https://codecov.io/github/MindTouch/martian/coverage.svg?branch=master)](https://codecov.io/github/MindTouch/martian?branch=master)

### Support
This Library is provided for and supported by the open source community. Supported MindTouch site owners may file bug reports via [GitHub](https://github.com/MindTouch/martian/issues), but support plans do not cover the usage of this library.

### Install

```sh
// jspm.io
$ npm install -g jspm
$ jspm install mindtouch-martian
```

### Usage
Use Plug to construct HTTP requests and handle responses as promises...

```javascript
import Plug from 'martian/plug';

let homePagePlug = new Plug().at('@api', 'deki', 'pages', 'home', 'contents');
homePagePlug.get().then(function(response) {

    // do something with the JSON response...
    return response.data;
}).then(function(data) {

    // do something else with it...
});

```

Use API objects to get business entities (user, page, file, etc)

```javascript
import User from 'martian/user';

let user = User.getCurrentUser();

// do something with user.username, user.fullname, user.email, etc..
```
