## Martian
Core JavaScript API for MindTouch

[![travis-ci.org](https://travis-ci.org/MindTouch/martian.svg?branch=master)](https://travis-ci.org/MindTouch/martian)
[![codecov.io](https://codecov.io/github/MindTouch/martian/coverage.svg?branch=master)](https://codecov.io/github/MindTouch/martian?branch=master)

### Support
This Library is provided for and supported by the open source community. Supported MindTouch site owners may file bug reports via [GitHub](https://github.com/MindTouch/martian/issues), but support plans do not cover the usage of this library.

### Usage
Martian provides a collection of JavaScript modules that can query a MindTouch site API. These modules can get or create business entities (user, page, file, etc). Martian can be installed in a Node.js environment, by using [yarn](https://yarnpkg.com).

```bash
yarn add mindtouch-martian
```

Martian modules can be loaded natively in a Node.js application, any ES2015 module-aware transpiling or bundling tools, or natively in web browsers that support ES2015 modules.

```javascript
import { UserManager } from 'mindtouch-martian/user.js';
import { Settings } from 'mindtouch-martian/lib/settings.js';
const settings = new Settings({

    // mindtouch site base URL
    host: 'https://success.mindtouch.com',

    // browser API token (https://success.mindtouch.com/Support/Extend/API_Documentation/About_the_MindTouch_API/Generate_a_browser_API_token)
    token: '12345'
});
const userManager = new UserManager(settings);
userManager.getCurrentUser().then((user) => {
    // do something with user.username, user.fullname, user.email, etc..
});
```
