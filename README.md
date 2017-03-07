## Martian
Core JavaScript API for MindTouch

[![travis-ci.org](https://travis-ci.org/MindTouch/martian.svg?branch=master)](https://travis-ci.org/MindTouch/martian)
[![codecov.io](https://codecov.io/github/MindTouch/martian/coverage.svg?branch=master)](https://codecov.io/github/MindTouch/martian?branch=master)

### Support
This Library is provided for and supported by the open source community. Supported MindTouch site owners may file bug reports via [GitHub](https://github.com/MindTouch/martian/issues), but support plans do not cover the usage of this library.

### Install

```sh
$ jspm install mindtouch-martian
```

### Usage
Use API objects to get business entities (user, page, file, etc)

```javascript
import { UserManager } from 'martian/user.js';
const userManager = new UserManager();
userManager.getCurrentUser().then((user) => {
    // do something with user.username, user.fullname, user.email, etc..
});
```
