export let pageMock = {
    pageInfo: `{
        "@id":"123",
        "@href":"https://www.example.com/@api/deki/pages/123?redirects=0",
        "@deleted":"false",
        "@revision":"20",
        "date.created":"Wed, 24 Jun 2015 22:48:28 GMT",
        "language":"en-US",
        "namespace":"main",
        "path":"foo/bar",
        "title":"Foo Bar",
        "uri.ui":"https://www.example.com/foo/bar"
    }`,
    page: `{
        "@id":"123",
        "@draft.state":"inactive",
        "@href":"https://www.example.com/@api/deki/pages/123?redirects=0",
        "@deleted":"false",
        "@unpublish":"true",
        "@revision":"24",
        "aliases":{"@href":"https://www.example.com/@api/deki/pages/123/aliases"},
        "article":"topic",
        "comments":{"@count":"0","@href":"https://www.example.com/@api/deki/pages/123/comments"},
        "contents":{"@type":"application/vnd.deki1410+xml","@href":"https://www.example.com/@api/deki/pages/123/contents","@etag":"b62969c1359bec912e21cc05c7418c68"},
        "contents.alt":{"@type":"application/pdf","@href":"https://www.example.com/@api/deki/pages/123/pdf/Test%2bFor%2bAjax%2bSave.pdf"},
        "date.created":"Wed, 24 Jun 2015 22:48:28 GMT",
        "date.edited":"Fri, 26 Jun 2015 15:15:44 GMT",
        "date.modified":"Fri, 26 Jun 2015 15:15:44 GMT",
        "description":"10 words removed",
        "files":{"@count":"0","@href":"https://www.example.com/@api/deki/pages/123/files?redirects=0"},
        "inbound":{"@count":"0"},
        "language":["en-US","en-US"],
        "language.effective":"en-US",
        "metrics":{"metric.charcount":"55","metric.views":"88"},
        "namespace":"main",
        "outbound":{"@count":"0"},
        "page.parent":{"@id":"343","@href":"https://www.example.com/@api/deki/pages/343?redirects=0","@deleted":"false","article":"topic-guide","date.created":"Mon, 30 Mar 2015 21:08:37 GMT","language":"en-US","namespace":"main","page.parent":{"@id":"336","@href":"https://www.example.com/@api/deki/pages/336?redirects=0","@deleted":"false","article":"topic-category","date.created":"Mon, 23 Mar 2015 19:58:47 GMT","language":"en-US","namespace":"main","page.parent":{"@id":"1","@href":"https://www.example.com/@api/deki/pages/1?redirects=0","@deleted":"false","article":"topic-portfolio","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","language":"en-US","namespace":"main","path":{"@type":"fixed","#text":""},"title":"marsdev","uri.ui":"https://www.example.com/"},"path":"Category_1","title":"Category 1","uri.ui":"https://www.example.com/Category_1"},"path":"Category_1/Guide_1","title":"Guide 1","uri.ui":"https://www.example.com/Category_1/Guide_1"},
        "page.redirectedfrom":"",
        "path":"Category_1/Guide_1/Test_For_Ajax_Save",
        "properties":{"@count":"0","@href":"https://www.example.com/@api/deki/pages/123/properties"},
        "rating":{"@score":"","@count":"0","@seated.score":"","@seated.count":"0","@unseated.score":"","@unseated.count":"0"},
        "revisions":{"@count":"24","@href":"https://www.example.com/@api/deki/pages/123/revisions"},
        "revisions.archive":{"@count":"0","@deprecated":"true","@href":"https://www.example.com/@api/deki/archive/pages/=Category_1%252FGuide_1%252FTest_For_Ajax_Save/revisions"},
        "security":{"@href":"https://www.example.com/@api/deki/pages/123/security","grants":{"grant":[{"date.modified":"Wed, 24 Jun 2015 22:48:28 GMT","permissions":{"operations":{"@mask":"49215","#text":"LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DRAFT_UPDATE,DRAFT_CREATE"},"role":{"@id":"3","@href":"https://www.example.com/@api/deki/site/roles/3","#text":"Contributor"}},"user":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"},"user.modifiedby":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"}},{"date.modified":"Wed, 24 Jun 2015 22:48:28 GMT","permissions":{"operations":{"@mask":"49215","#text":"LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DRAFT_UPDATE,DRAFT_CREATE"},"role":{"@id":"3","@href":"https://www.example.com/@api/deki/site/roles/3","#text":"Contributor"}},"user":{"@id":"6","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/6","date.created":"Mon, 18 May 2015 20:23:08 GMT","date.lastlogin":"Mon, 18 May 2015 20:23:41 GMT","email":"lsdkjf@example.com","fullname":"","hash.email":"72f86b6d0d73b4708bf04ceacd066411","license.seat":"true","nick":"someuser","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/72f86b6d0d73b4708bf04ceacd066411.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/72f86b6d0d73b4708bf04ceacd066411.png?d=mm","username":"someuser"},"user.modifiedby":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"}}]},"permissions.effective":{"operations":{"@mask":"9223372036854895935","#text":"ADMIN,LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DELETE,CHANGEPERMISSIONS,UNSAFECONTENT,DRAFT_UPDATE,DRAFT_CREATE,DRAFT_DELETE"}},"permissions.page":{"operations":{"@mask":"18446744073709551615","#text":"ADMIN,LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DELETE,CHANGEPERMISSIONS,CONTROLPANEL,UNSAFECONTENT,USERHISTORY,DRAFT_UPDATE,DRAFT_CREATE,DRAFT_DELETE"},"restriction":{"@id":"1","#text":"Public"}},"permissions.revoked":""},
        "subpages":{"@href":"https://www.example.com/@api/deki/pages/123/subpages"},
        "summary":"",
        "tags":{"@count":"1","@href":"https://www.example.com/@api/deki/pages/123/tags","tag":{"@value":"article:topic","@id":"7","@href":"https://www.example.com/@api/deki/site/tags/7","title":"article:topic","type":"text","uri":"https://www.example.com/Special:Tags?tag=article:topic"}},
        "timeuuid":"36dd5000-1c16-11e5-8090-22dd028afb7c",
        "title":"Test For Ajax Save",
        "uri.ui":"https://www.example.com/Category_1/Guide_1/Test_For_Ajax_Save",
        "user.author":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"},
        "user.createdby":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"}
    }`,
    virtualPage: `{
        "@id":"0",
        "@virtual":"true",
        "@draft.state":"inactive",
        "@href":"https://editor.mindtouch.dev/@api/deki/pages/0?redirects=0",
        "@deleted":"false",
        "date.created":"Thu, 01 Jan 1970 00:00:00 GMT",
        "language":"en-US",
        "namespace":"main",
        "page.parent":{
            "@id":"1",
            "@draft.state":"inactive",
            "@href":"https://editor.mindtouch.dev/@api/deki/pages/1?redirects=0",
            "@deleted":"false",
            "date.created":"Mon, 31 Aug 2015 21:22:42 GMT",
            "language":"en-US",
            "namespace":"main",
            "path":{
                "@seo":"true",
                "@type":"fixed",
                "#text":""
            },
            "title":"Home",
            "uri.ui":"https://editor.mindtouch.dev/"
        },
        "path":{
            "@seo":"true",
            "#text":"Page_Title"
        },
        "security":{
            "@href":"https://editor.mindtouch.dev/@api/deki/pages/0/security",
            "permissions.effective":{
                "operations":{
                    "@mask":"9223372036854781247",
                    "#text":"ADMIN,LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DELETE,CHANGEPERMISSIONS,UNSAFECONTENT"
                }
            }
        },
        "title":"Page Title",
        "uri.ui":"https://editor.mindtouch.dev/Page_Title"
    }`,
    pageNoParent: `{
        "@id":"123",
        "@draft.state":"inactive",
        "@href":"https://www.example.com/@api/deki/pages/123?redirects=0",
        "@deleted":"false",
        "@unpublish":"true",
        "@revision":"24",
        "aliases":{"@href":"https://www.example.com/@api/deki/pages/123/aliases"},
        "article":"topic",
        "comments":{"@count":"0","@href":"https://www.example.com/@api/deki/pages/123/comments"},
        "contents":{"@type":"application/vnd.deki1410+xml","@href":"https://www.example.com/@api/deki/pages/123/contents","@etag":"b62969c1359bec912e21cc05c7418c68"},
        "contents.alt":{"@type":"application/pdf","@href":"https://www.example.com/@api/deki/pages/123/pdf/Test%2bFor%2bAjax%2bSave.pdf"},
        "date.created":"Wed, 24 Jun 2015 22:48:28 GMT",
        "date.edited":"Fri, 26 Jun 2015 15:15:44 GMT",
        "date.modified":"Fri, 26 Jun 2015 15:15:44 GMT",
        "description":"10 words removed",
        "files":{"@count":"0","@href":"https://www.example.com/@api/deki/pages/123/files?redirects=0"},
        "inbound":{"@count":"0"},
        "language":["en-US","en-US"],
        "language.effective":"en-US",
        "metrics":{"metric.charcount":"55","metric.views":"88"},
        "namespace":"main",
        "outbound":{"@count":"0"},
        "page.redirectedfrom":"",
        "path":"Category_1/Guide_1/Test_For_Ajax_Save",
        "properties":{"@count":"0","@href":"https://www.example.com/@api/deki/pages/123/properties"},
        "rating":{"@score":"","@count":"0","@seated.score":"","@seated.count":"0","@unseated.score":"","@unseated.count":"0"},
        "revisions":{"@count":"24","@href":"https://www.example.com/@api/deki/pages/123/revisions"},
        "revisions.archive":{"@count":"0","@deprecated":"true","@href":"https://www.example.com/@api/deki/archive/pages/=Category_1%252FGuide_1%252FTest_For_Ajax_Save/revisions"},
        "security":{"@href":"https://www.example.com/@api/deki/pages/123/security","grants":{"grant":[{"date.modified":"Wed, 24 Jun 2015 22:48:28 GMT","permissions":{"operations":{"@mask":"49215","#text":"LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DRAFT_UPDATE,DRAFT_CREATE"},"role":{"@id":"3","@href":"https://www.example.com/@api/deki/site/roles/3","#text":"Contributor"}},"user":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"},"user.modifiedby":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"}},{"date.modified":"Wed, 24 Jun 2015 22:48:28 GMT","permissions":{"operations":{"@mask":"49215","#text":"LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DRAFT_UPDATE,DRAFT_CREATE"},"role":{"@id":"3","@href":"https://www.example.com/@api/deki/site/roles/3","#text":"Contributor"}},"user":{"@id":"6","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/6","date.created":"Mon, 18 May 2015 20:23:08 GMT","date.lastlogin":"Mon, 18 May 2015 20:23:41 GMT","email":"lsdkjf@example.com","fullname":"","hash.email":"72f86b6d0d73b4708bf04ceacd066411","license.seat":"true","nick":"someuser","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/72f86b6d0d73b4708bf04ceacd066411.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/72f86b6d0d73b4708bf04ceacd066411.png?d=mm","username":"someuser"},"user.modifiedby":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"}}]},"permissions.effective":{"operations":{"@mask":"9223372036854895935","#text":"ADMIN,LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DELETE,CHANGEPERMISSIONS,UNSAFECONTENT,DRAFT_UPDATE,DRAFT_CREATE,DRAFT_DELETE"}},"permissions.page":{"operations":{"@mask":"18446744073709551615","#text":"ADMIN,LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DELETE,CHANGEPERMISSIONS,CONTROLPANEL,UNSAFECONTENT,USERHISTORY,DRAFT_UPDATE,DRAFT_CREATE,DRAFT_DELETE"},"restriction":{"@id":"1","#text":"Public"}},"permissions.revoked":""},
        "subpages":{"@href":"https://www.example.com/@api/deki/pages/123/subpages"},
        "summary":"",
        "tags":{"@count":"1","@href":"https://www.example.com/@api/deki/pages/123/tags","tag":{"@value":"article:topic","@id":"7","@href":"https://www.example.com/@api/deki/site/tags/7","title":"article:topic","type":"text","uri":"https://www.example.com/Special:Tags?tag=article:topic"}},
        "timeuuid":"36dd5000-1c16-11e5-8090-22dd028afb7c",
        "title":"Test For Ajax Save",
        "uri.ui":"https://www.example.com/Category_1/Guide_1/Test_For_Ajax_Save",
        "user.author":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"},
        "user.createdby":{"@id":"1","@wikiid":"site_1","@href":"https://www.example.com/@api/deki/users/1","date.created":"Mon, 23 Mar 2015 17:55:57 GMT","date.lastlogin":"Thu, 25 Jun 2015 16:48:14 GMT","email":"aaronm@mindtouch.com","fullname":"","hash.email":"f7362144f4ae25d0fee0101f597ef60a","license.seat":{"@owner":"true","#text":"true"},"nick":"admin","password":{"@exists":"true"},"status":"active","uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm","username":"admin"}
    }`,
    subpages: `{
        "@totalcount":"2",
        "@count":"2",
        "@href":"https://www.example.com/@api/deki/pages/123/subpages",
        "page.subpage":[
            {"@id": "456","@href": "https://www.example.com/@api/deki/pages/456?redirects=0", "path": "foo/bar/baz", "title": "Baz"},
            {"@id": "457","@href": "https://www.example.com/@api/deki/pages/457?redirects=0", "path": "foo/bar/title", "title": "Title"}
        ]
    }`,
    subpagesSingle: `{
        "@totalcount":"1",
        "@count":"1",
        "@href":"https://www.example.com/@api/deki/pages/123/subpages",
        "page.subpage":{"@id": "456","@href": "https://www.example.com/@api/deki/pages/456?redirects=0", "path": "foo/bar/baz", "title": "Baz"}
    }`,
    subpagesEmpty: `{
        "@totalcount":"0",
        "@count":"0",
        "@href":"https://www.example.com/@api/deki/pages/123/subpages"
    }`,
    pageContent: `{
        "@type":"text/html",
        "@title":"Test For Ajax Save",
        "@unsafe":"true",
        "body":[
            "<p>Sample Content</p>",
            {"@target":"toc","#text":"<em>No headers</em>"}
        ]
    }`,
    pageContentSimple: `{
        "@type":"text/html",
        "@title":"Community",
        "@unsafe":"true",
        "body":"<p>Sample Content</p>"
    }`,
    pageTree: `{
        "page":{
            "@id":"123",
            "@href":"https://www.example.com/@api/deki/pages/343?redirects=0",
            "@deleted":"false",
            "date.created":"Mon, 30 Mar 2015 21:08:37 GMT",
            "language":"en-US",
            "namespace":"main",
            "path":"Category_1/Guide_1",
            "subpages":{
                "page":[
                    {
                        "@id":"344",
                        "@href":"https://www.example.com/@api/deki/pages/344?redirects=0",
                        "@deleted":"false",
                        "date.created":"Mon, 30 Mar 2015 22:05:22 GMT",
                        "language":"en-US",
                        "namespace":"main",
                        "path":"Category_1/Guide_1/Page_Title",
                        "subpages":{
                            "page":[
                                {
                                    "@id":"346",
                                    "@href":"https://www.example.com/@api/deki/pages/346?redirects=0",
                                    "@deleted":"false",
                                    "date.created":"Tue, 31 Mar 2015 19:06:21 GMT",
                                    "language":"en-US",
                                    "namespace":"main",
                                    "path":"Category_1/Guide_1/Page_Title/BLANK!!",
                                    "subpages":"",
                                    "title":"BLANK!!",
                                    "uri.ui":"https://www.example.com/Category_1/Guide_1/Page_Title/BLANK!!"
                                },{
                                    "@id":"474",
                                    "@href":"https://www.example.com/@api/deki/pages/474?redirects=0",
                                    "@deleted":"false",
                                    "date.created":"Mon, 22 Jun 2015 16:02:46 GMT",
                                    "language":"en-US",
                                    "namespace":"main",
                                    "path":{"@type":"custom","#text":"Category_1/Guide_1/Page_Title/my//page//thing"},
                                    "subpages":"",
                                    "title":"my-page-thing",
                                    "uri.ui":"https://www.example.com/Category_1/Guide_1/Page_Title/my%2F%2Fpage%2F%2Fthing"
                                }
                            ]
                        },
                        "title":"Page Title",
                        "uri.ui":"https://www.example.com/Category_1/Guide_1/Page_Title"
                    },{
                        "@id":"485",
                        "@href":"https://www.example.com/@api/deki/pages/485?redirects=0",
                        "@deleted":"false",
                        "date.created":"Thu, 25 Jun 2015 15:23:46 GMT",
                        "language":"en-US",
                        "namespace":"main",
                        "path":"Category_1/Guide_1/Test_%232",
                        "subpages":"",
                        "title":"Test #2",
                        "uri.ui":"https://www.example.com/Category_1/Guide_1/Test_%232"
                    },{
                        "@id":"421",
                        "@href":"https://www.example.com/@api/deki/pages/421?redirects=0",
                        "@deleted":"false",
                        "date.created":"Thu, 30 Apr 2015 15:24:07 GMT",
                        "language":"en-US",
                        "namespace":"main",
                        "path":"Category_1/Guide_1/Topic_1",
                        "subpages":{
                            "page":{
                                "@id":"422",
                                "@href":"https://www.example.com/@api/deki/pages/422?redirects=0",
                                "@deleted":"false",
                                "date.created":"Thu, 30 Apr 2015 16:06:31 GMT",
                                "language":"en-US",
                                "namespace":"main",
                                "path":"Category_1/Guide_1/Topic_1/Guide_Under_Topic",
                                "subpages":"",
                                "title":"Guide Under Topic",
                                "uri.ui":"https://www.example.com/Category_1/Guide_1/Topic_1/Guide_Under_Topic"
                            }
                        },
                        "title":"Topic 1",
                        "uri.ui":"https://www.example.com/Category_1/Guide_1/Topic_1"
                    }
                ]
            },
            "title":"Guide 1",
            "uri.ui":"https://www.example.com/Category_1/Guide_1"
        }
    }`,
    pageTags: `{
        "@count":"2",
        "@href":"https://www.example.com/@api/deki/pages/422/tags",
        "tag":[
            {
                "@value":"article:topic-guide",
                "@id":"2",
                "@href":"https://www.example.com/@api/deki/site/tags/2",
                "title":"article:topic-guide",
                "type":"text",
                "uri":"https://www.example.com/Special:Tags?tag=article:topic-guide"
            },
            {
                "@value":"test:b",
                "@id":"31",
                "@href":"https://www.example.com/@api/deki/site/tags/31",
                "title":"test:b",
                "type":"text",
                "uri":"https://www.example.com/Special:Tags?tag=test:b"
            }
        ]
    }`,
    pageTagsSingle: `{
        "@count":"1",
        "@href":"https://www.example.com/@api/deki/pages/422/tags",
        "tag":{
            "@value":"article:topic-guide",
            "@id":"2",
            "@href":"https://www.example.com/@api/deki/site/tags/2",
            "title":"article:topic-guide",
            "type":"text",
            "uri":"https://www.example.com/Special:Tags?tag=article:topic-guide"
        }
    }`,
    pageTagsEmpty: `{
        "@count":"0",
        "@href":"https://www.example.com/@api/deki/pages/422/tags"
    }`,
    pageOverview: `{
        "@needsmigration":"false",
        "#text":"The page overview."
    }`,
    pageOverviewError: `{
        "@needsmigration":"false"
    }`,
    pageRating: `{
        "@score":"1",
        "@score.trend":"1",
        "@count":"1",
        "@date":"Fri, 26 Jun 2015 22:30:10 GMT",
        "@seated.score":"1",
        "@seated.score.trend":"1",
        "@seated.count":"1",
        "@unseated.score":"0",
        "@unseated.score.trend":"0",
        "@unseated.count":"0",
        "user.ratedby":{
            "@id":"1",
            "@score":"1",
            "@date":"Fri, 26 Jun 2015 22:30:10 GMT",
            "@href":"https://marsdev.mindtouch.dev/@api/deki/users/1",
            "@seated":"true"
        }
    }`,
    pageMove: `{
        "@count":"2",
        "page":[
            {
                "@id":"358","@href":"https://marsdev.mindtouch.dev/@api/deki/pages/358?redirects=0",
                "@deleted":"false",
                "date.created":"Wed, 01 Apr 2015 21:22:34 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":"Category_1/Guide_4",
                "title":"Guide 4",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_4"
            },
            {
                "@id":"359",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/359?redirects=0",
                "@deleted":"false",
                "date.created":"Wed, 01 Apr 2015 21:23:42 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":"Category_1/Guide_4/Page_Title",
                "title":"Page Title",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_4/Page_Title"
            }
        ]
    }`,
    pageMoveSingle: `{
        "@count":"1",
        "page":{
            "@id":"358","@href":"https://marsdev.mindtouch.dev/@api/deki/pages/358?redirects=0",
            "@deleted":"false",
            "date.created":"Wed, 01 Apr 2015 21:22:34 GMT",
            "language":"en-US",
            "namespace":"main",
            "path":"Category_1/Guide_4",
            "title":"Guide 4",
            "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_4"
        }
    }`,
    pageMoveEmpty: `{
        "@count":"0"
    }`,
    pageRatings: `{
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/ratings",
        "@count":"2",
        "page":[
            {
                "@id":"440",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/440?redirects=0",
                "@deleted":"false",
                "date.created":"Fri, 05 Jun 2015 02:31:20 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":"Category_2/Guide_3/Topic_2",
                "rating":{
                    "@score":"0",
                    "@score.trend":"0",
                    "@count":"1",
                    "@date":"Wed, 02 Sep 2015 17:32:06 GMT",
                    "@seated.score":"0",
                    "@seated.score.trend":"0",
                    "@seated.count":"1",
                    "@unseated.score":"0",
                    "@unseated.score.trend":"0",
                    "@unseated.count":"0",
                    "user.ratedby":{
                        "@id":"1",
                        "@score":"0",
                        "@date":"Wed, 02 Sep 2015 17:32:06 GMT",
                        "@href":"https://marsdev.mindtouch.dev/@api/deki/users/1",
                        "@seated":"true"
                    }
                },
                "title":"Topic 2",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_2/Guide_3/Topic_2"
            },
            {
                "@id":"441",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/441?redirects=0",
                "@deleted":"false",
                "date.created":"Fri, 05 Jun 2015 02:31:20 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":"Category_2/Guide_3/Topic_3",
                "rating":{
                    "@score":"1",
                    "@score.trend":"1",
                    "@count":"1",
                    "@date":"Wed, 02 Sep 2015 17:30:41 GMT",
                    "@seated.score":"1",
                    "@seated.score.trend":"1",
                    "@seated.count":"1",
                    "@unseated.score":"0",
                    "@unseated.score.trend":"0",
                    "@unseated.count":"0",
                    "user.ratedby":{
                        "@id":"1",
                        "@score":"1",
                        "@date":"Wed, 02 Sep 2015 17:30:41 GMT",
                        "@href":"https://marsdev.mindtouch.dev/@api/deki/users/1",
                        "@seated":"true"
                    }
                },
                "title":"Topic 3",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_2/Guide_3/Topic_3"
            }
        ]
    }`,
    pageRatingsSingle: `{
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/ratings",
        "@count":"1",
        "page":{
            "@id":"440",
            "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/440?redirects=0",
            "@deleted":"false",
            "date.created":"Fri, 05 Jun 2015 02:31:20 GMT",
            "language":"en-US",
            "namespace":"main",
            "path":"Category_2/Guide_3/Topic_2",
            "rating":{
                "@score":"0",
                "@score.trend":"0",
                "@count":"1",
                "@date":"Wed, 02 Sep 2015 17:32:06 GMT",
                "@seated.score":"0",
                "@seated.score.trend":"0",
                "@seated.count":"1",
                "@unseated.score":"0",
                "@unseated.score.trend":"0",
                "@unseated.count":"0",
                "user.ratedby":{
                    "@id":"1",
                    "@score":"0",
                    "@date":"Wed, 02 Sep 2015 17:32:06 GMT",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/users/1",
                    "@seated":"true"
                }
            },
            "title":"Topic 2",
            "uri.ui":"https://marsdev.mindtouch.dev/Category_2/Guide_3/Topic_2"
        }
    }`,
    pageRatingsEmpty: `{
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/ratings",
        "@count":"0"
    }`,
    pageFiles: `{
        "@count":"2",
        "@offset":"0",
        "@totalcount":"7",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/362/files",
        "file":[
            {
                "@id":"43",
                "@revision":"1",
                "@res-id":"221",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/files/43/info",
                "@res-is-head":"true",
                "@res-is-deleted":"false",
                "@res-rev-is-deleted":"false",
                "@res-contents-id":"1740",
                "contents":{
                    "@type":"image/jpeg",
                    "@size":"15628115",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/files/43/743348main_Timelapse_Sun_4k.jpg"
                },
                "date.created":"Mon, 13 Apr 2015 15:53:59 GMT",
                "description":"",
                "filename":"743348main_Timelapse_Sun_4k.jpg",
                "page.parent":{
                    "@id":"362",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/362?redirects=0",
                    "@deleted":"false",
                    "date.created":"Wed, 01 Apr 2015 21:25:05 GMT",
                    "language":"en-US",
                    "namespace":"main",
                    "path":"Category_1/Guide_3/Page_Title",
                    "title":"Page Title",
                    "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_3/Page_Title"
                },
                "revisions":{
                    "@count":"1",
                    "@totalcount":"1",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/files/43/revisions"
                },
                "user.createdby":{
                    "@id":"1",
                    "@wikiid":"site_1",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/users/1",
                    "date.created":"Mon, 23 Mar 2015 17:55:57 GMT",
                    "date.lastlogin":"Thu, 03 Sep 2015 20:10:01 GMT",
                    "email":"aaronm@mindtouch.com",
                    "fullname":"",
                    "hash.email":"f7362144f4ae25d0fee0101f597ef60a",
                    "license.seat":{"@owner":"true","#text":"true"},
                    "nick":"admin",
                    "password":{"@exists":"true"},
                    "status":"active",
                    "uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm",
                    "uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm",
                    "username":"admin"
                }
            },
            {
                "@id":"42",
                "@revision":"1",
                "@res-id":"220",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/files/42/info",
                "@res-is-head":"true",
                "@res-is-deleted":"false",
                "@res-rev-is-deleted":"false",
                "@res-contents-id":"1739",
                "contents":{
                    "@type":"image/jpeg",
                    "@size":"4523475",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/files/42/13-jan-01.jpg"
                },
                "date.created":"Mon, 13 Apr 2015 15:53:57 GMT",
                "description":"",
                "filename":"13-jan-01.jpg",
                "page.parent":{
                    "@id":"362",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/362?redirects=0",
                    "@deleted":"false",
                    "date.created":"Wed, 01 Apr 2015 21:25:05 GMT",
                    "language":"en-US",
                    "namespace":"main",
                    "path":"Category_1/Guide_3/Page_Title",
                    "title":"Page Title",
                    "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_3/Page_Title"
                },
                "revisions":{
                    "@count":"1",
                    "@totalcount":"1",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/files/42/revisions"
                },
                "user.createdby":{
                    "@id":"1",
                    "@wikiid":"site_1",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/users/1",
                    "date.created":"Mon, 23 Mar 2015 17:55:57 GMT",
                    "date.lastlogin":"Thu, 03 Sep 2015 20:10:01 GMT",
                    "email":"aaronm@mindtouch.com",
                    "fullname":"",
                    "hash.email":"f7362144f4ae25d0fee0101f597ef60a",
                    "license.seat":{"@owner":"true","#text":"true"},
                    "nick":"admin",
                    "password":{"@exists":"true"},
                    "status":"active",
                    "uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm",
                    "uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm",
                    "username":"admin"
                }
            }
        ]
    }`,
    pageFilesSingle: `{
        "@count":"1",
        "@offset":"0",
        "@totalcount":"7",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/362/files",
        "file":{
            "@id":"42",
            "@revision":"1",
            "@res-id":"220",
            "@href":"https://marsdev.mindtouch.dev/@api/deki/files/42/info",
            "@res-is-head":"true",
            "@res-is-deleted":"false",
            "@res-rev-is-deleted":"false",
            "@res-contents-id":"1739",
            "contents":{
                "@type":"image/jpeg",
                "@size":"4523475",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/files/42/13-jan-01.jpg"
            },
            "date.created":"Mon, 13 Apr 2015 15:53:57 GMT",
            "description":"",
            "filename":"13-jan-01.jpg",
            "page.parent":{
                "@id":"362",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/362?redirects=0",
                "@deleted":"false",
                "date.created":"Wed, 01 Apr 2015 21:25:05 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":"Category_1/Guide_3/Page_Title",
                "title":"Page Title",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_3/Page_Title"
            },
            "revisions":{
                "@count":"1",
                "@totalcount":"1",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/files/42/revisions"
            },
            "user.createdby":{
                "@id":"1",
                "@wikiid":"site_1",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/users/1",
                "date.created":"Mon, 23 Mar 2015 17:55:57 GMT",
                "date.lastlogin":"Thu, 03 Sep 2015 20:10:01 GMT",
                "email":"aaronm@mindtouch.com",
                "fullname":"",
                "hash.email":"f7362144f4ae25d0fee0101f597ef60a",
                "license.seat":{"@owner":"true","#text":"true"},
                "nick":"admin",
                "password":{"@exists":"true"},
                "status":"active",
                "uri.avatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm",
                "uri.gravatar":"https://gravatar.com/avatar/f7362144f4ae25d0fee0101f597ef60a.png?d=mm",
                "username":"admin"
            }
        }
    }`,
    pageFilesEmpty: `{
        "@count":"0",
        "@offset":"0",
        "@totalcount":"7",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/362/files"
    }`,
    pageSetContents: `{
        "@status":"success",
        "page":{
            "@id":"564",
            "@draft.state":"inactive",
            "@href":"http://marsdev.mindtouch.dev/@api/deki/pages/564?redirects=0",
            "@deleted":"false",
            "@revision":"2",
            "date.created":"Mon, 07 Dec 2015 21:34:55 GMT",
            "language":"en-US",
            "namespace":"main",
            "path":{
                "@seo":"true",
                "#text":"Category_1/Guide_1/Page_Title_2"
            },
            "title":"Page Title 2",
            "uri.ui":"http://marsdev.mindtouch.dev/Category_1/Guide_1/Page_Title_2"
        }
    }`,
    pageSetContentsConflict: `{
        "@status":"conflict",
        "page":{
            "@id":"310",
            "@draft.state":"inactive",
            "@href":"https://editor.mindtouch.dev/@api/deki/pages/310?redirects=0",
            "@deleted":"false",
            "@revision":"4",
            "date.created":"Mon, 21 Sep 2015 15:01:54 GMT",
            "language":"en-US",
            "namespace":"main",
            "path":{
                "@seo":"true",
                "#text":"Bugs/MTP/1000-1500/1105"
            },
            "title":"1105",
            "uri.ui":"https://editor.mindtouch.dev/Bugs/MTP/1000-1500/1105"
        },
        "page.base":{
            "@id":"310",
            "@draft.state":"inactive",
            "@deleted":"false",
            "@revision":"2",
            "@href":"https://editor.mindtouch.dev/@api/deki/pages/310/revisions?revision=2&redirects=0",
            "contents":{
                "@type":"application/vnd.deki1410+xml",
                "@href":"https://editor.mindtouch.dev/@api/deki/pages/310/contents?revision=2&redirects=0"
            },
            "date.created":"Mon, 21 Sep 2015 15:01:54 GMT",
            "date.edited":"Sun, 27 Sep 2015 18:08:26 GMT",
            "description":"1 words added",
            "language":"en-US",
            "namespace":"main",
            "path":{
                "@seo":"true",
                "#text":"Bugs/MTP/1000-1500/1105"
            },
            "timeuuid":"bf83c900-6542-11e5-8009-d9d90666343f",
            "title":"1105",
            "uri.ui":"https://editor.mindtouch.dev/Bugs/MTP/1000-1500/1105",
            "user.author":{
                "@id":"1",
                "@wikiid":"site_1",
                "@href":"https://editor.mindtouch.dev/@api/deki/users/1",
                "date.created":"Mon, 31 Aug 2015 21:22:42 GMT",
                "date.lastlogin":"Wed, 16 Dec 2015 14:32:00 GMT",
                "email":"karena@mindtouch.com",
                "fullname":"",
                "hash.email":"1ca3d810b8057bf39bdafb3fb445877b",
                "license.seat":{
                    "@owner":"true",
                    "#text":"true"
                },
                "nick":"admin",
                "password":{
                    "@exists":"true"
                },
                "status":"active",
                "uri.avatar":"https://gravatar.com/avatar/1ca3d810b8057bf39bdafb3fb445877b.png?d=mm",
                "uri.gravatar":"https://gravatar.com/avatar/1ca3d810b8057bf39bdafb3fb445877b.png?d=mm",
                "username":"admin"
            }
        },
        "page.overwritten":{
            "@id":"310",
            "@draft.state":"inactive",
            "@deleted":"false",
            "@revision":"3",
            "@href":"https://editor.mindtouch.dev/@api/deki/pages/310/revisions?revision=3&redirects=0",
            "contents":{
                "@type":"application/vnd.deki1410+xml",
                "@href":"https://editor.mindtouch.dev/@api/deki/pages/310/contents?revision=3&redirects=0"
            },
            "date.created":"Mon, 21 Sep 2015 15:01:54 GMT",
            "date.edited":"Fri, 18 Dec 2015 12:08:44 GMT",
            "description":"1 words removed",
            "language":"en-US",
            "namespace":"main",
            "path":{
                "@seo":"true",
                "#text":"Bugs/MTP/1000-1500/1105"
            },
            "timeuuid":"15836e00-a580-11e5-80ae-6fcc2cf7dfa5",
            "title":"1105",
            "uri.ui":"https://editor.mindtouch.dev/Bugs/MTP/1000-1500/1105",
            "user.author":{
                "@id":"1",
                "@wikiid":"site_1",
                "@href":"https://editor.mindtouch.dev/@api/deki/users/1",
                "date.created":"Mon, 31 Aug 2015 21:22:42 GMT",
                "date.lastlogin":"Wed, 16 Dec 2015 14:32:00 GMT",
                "email":"karena@mindtouch.com",
                "fullname":"",
                "hash.email":"1ca3d810b8057bf39bdafb3fb445877b",
                "license.seat":{
                    "@owner":"true",
                    "#text":"true"
                },
                "nick":"admin",
                "password":{
                    "@exists":"true"
                },
                "status":"active",
                "uri.avatar":"https://gravatar.com/avatar/1ca3d810b8057bf39bdafb3fb445877b.png?d=mm",
                "uri.gravatar":"https://gravatar.com/avatar/1ca3d810b8057bf39bdafb3fb445877b.png?d=mm",
                "username":"admin"
            }
        }
    }`,
    relatedPages: `{
        "@count":"14",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/507/related",
        "page":[
            {
                "@id":"337",
                "@draft.state":"inactive",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/337?redirects=0",
                "@deleted":"false",
                "article":"topic-category",
                "date.created":"Mon, 23 Mar 2015 19:59:17 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","#text":"Category_2"},
                "title":"Category 2",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_2"
            },
            {
                "@id":"346",
                "@draft.state":"active",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/346?redirects=0",
                "@deleted":"false",
                "article":"howto",
                "date.created":"Tue, 31 Mar 2015 19:06:21 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","#text":"Category_1/Guide_1/Page_Title/BLANK!!"},
                "title":"BLANK!!",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Page_Title/BLANK!!"
            }
        ]
    }`,
    relatedPagesSingle: `{
        "@count":"1",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/507/related",
        "page": {
            "@id":"337",
            "@draft.state":"inactive",
            "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/337?redirects=0",
            "@deleted":"false",
            "article":"topic-category",
            "date.created":"Mon, 23 Mar 2015 19:59:17 GMT",
            "language":"en-US",
            "namespace":"main",
            "path":{"@seo":"true","#text":"Category_2"},
            "title":"Category 2",
            "uri.ui":"https://marsdev.mindtouch.dev/Category_2"
        }
    }`
};
