## Martian
JavaScript API for interacting with MindTouch's Web Service API

### Support
This Library is provided for and supported by the open source community. Supported MindTouch site owners may file bug reports via [GitHub](https://github.com/MindTouch/martian/issues), but support plans do not cover the usage of this library.

### Install

```sh
$ npm install mindtouch-martian
```

### Usage
Use Plug to construct HTTP requests and handle responses as promises...

```javascript
import Plug from 'martian/plug';

let homePagePlug = new Plug().withHost('example.com').at('@api', 'deki', 'pages', 'home', 'contents');
homePagePlug.get().then(response) {

    // do something with the JSON response...
    return response.data;
}).then(data) {

    // do something else with it...
});

```

Use API objects to get business entities (user, page, file, etc)

```javascript
import User from 'martian/user';

let user = User.getCurrentUser();

// do something with user.username, user.fullname, user.email, etc..
```
