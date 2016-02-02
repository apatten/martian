window.Mocks = window.Mocks || {};
Mocks.draft = `{
    "@id":"301",
    "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301",
    "@state":"unpublished",
    "@publish":"true",
    "@deactivate":"false",
    "@revision":"1",
    "contents":{
        "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301/contents"
    },
    "date.edited":"Thu, 31 Dec 2015 14:17:49 GMT",
    "date.modified":"Thu, 31 Dec 2015 14:17:49 GMT",
    "files":{
        "@count":"0",
        "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301/files?redirects=0"
    },
    "page.parent":{
        "@id":"1",
        "@draft.state":"active",
        "@href":"https://editor2.mindtouch.dev/@api/deki/pages/1?redirects=0",
        "@deleted":"false",
        "article":"topic-category",
        "date.created":"Mon, 31 Aug 2015 21:24:13 GMT",
        "language":"en-US",
        "namespace":"main",
        "path":{
            "@seo":"true",
            "@type":"fixed",
            "#text":""
        },
        "title":"Home",
        "uri.ui":"https://editor2.mindtouch.dev/"
    },
    "properties":{
        "@count":"0",
        "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301/properties"
    },
    "timeuuid":"45436480-afc9-11e5-80a4-1c1090b42d1e",
    "title":"Category 3",
    "uri.ui":"https://editor2.mindtouch.dev/Category_3?mt-draft=true",
    "user.author":{
        "@id":"1",
        "@wikiid":"site_2",
        "@href":"https://editor2.mindtouch.dev/@api/deki/users/1",
        "date.created":"Mon, 31 Aug 2015 21:24:13 GMT",
        "date.lastlogin":"Tue, 22 Dec 2015 17:30:45 GMT",
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
    },
    "user.createdby":{
        "@id":"1",
        "@wikiid":"site_2",
        "@href":"https://editor2.mindtouch.dev/@api/deki/users/1",
        "date.created":"Mon, 31 Aug 2015 21:24:13 GMT",
        "date.lastlogin":"Tue, 22 Dec 2015 17:30:45 GMT",
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
}`;
Mocks.draftBasic = `{
    "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301",
    "@state":"unpublished",
    "@revision":"1",
    "contents":{
        "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301/contents"
    },
    "files":{
        "@count":"0",
        "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301/files?redirects=0"
    },
    "properties":{
        "@count":"0",
        "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301/properties"
    },
    "timeuuid":"45436480-afc9-11e5-80a4-1c1090b42d1e",
    "title":"Category 3",
    "uri.ui":"https://editor2.mindtouch.dev/Category_3?mt-draft=true"
}`;
Mocks.draftsWithTags = `{
    "pages":{
        "page":[
            {
                "@id":"474",
                "@draft.state":"active",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/474?redirects=0",
                "@deleted":"false",
                "date.created":"Mon, 22 Jun 2015 16:02:46 GMT",
                "draft":{
                    "@id":"474",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/drafts/474",
                    "@state":"active",
                    "@publish":"true",
                    "@deactivate":"true",
                    "title":"",
                    "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Page_Title/my%2F%2Fpage%2F%2Fthing?mt-draft=true"
                },
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","@type":"custom","#text":"Category_1/Guide_1/Page_Title/my//page//thing"},
                "tags":{"@count":"0"},
                "title":"my-page-thing",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Page_Title/my%2F%2Fpage%2F%2Fthing"
            },
            {
                "@id":"456",
                "@draft.state":"active",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/456?redirects=0",
                "@deleted":"false",
                "date.created":"Mon, 08 Jun 2015 20:01:19 GMT",
                "draft":{
                    "@id":"456",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/drafts/456",
                    "@state":"active",
                    "@publish":"true",
                    "@deactivate":"true",
                    "title":"",
                    "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Page_Title/Topic_2?mt-draft=true"
                },
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","#text":"Category_1/Guide_1/Page_Title/Topic_2"},
                "tags":{"@count":"2","tag":[{"@value":"article:topic","title":"article:topic","type":"text"},{"@value":"stage:draft","title":"stage:draft","type":"text"}]},
                "title":"Topic 2",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Page_Title/Topic_2"
            },
            {
                "@id":"472",
                "@draft.state":"active",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/472?redirects=0",
                "@deleted":"false",
                "date.created":"Mon, 15 Jun 2015 19:34:40 GMT",
                "draft":{
                    "@id":"472","@href":"https://marsdev.mindtouch.dev/@api/deki/drafts/472",
                    "@state":"active",
                    "@publish":"true",
                    "@deactivate":"true",
                    "title":"",
                    "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Test_Page_1?mt-draft=true"
                },
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","@type":"custom","#text":"Category_1/Guide_1/Test_Page_1"},
                "tags":{"@count":"0"},
                "title":"Test Page One",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Test_Page_1"
            },
            {
                "@id":"421",
                "@draft.state":"active",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/421?redirects=0",
                "@deleted":"false",
                "date.created":"Thu, 30 Apr 2015 15:24:07 GMT",
                "draft":{
                    "@id":"421",
                    "@href":"https://marsdev.mindtouch.dev/@api/deki/drafts/421",
                    "@state":"active",
                    "@publish":"true",
                    "@deactivate":"true",
                    "title":"Topic 1",
                    "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Topic_1?mt-draft=true"
                },
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","#text":"Category_1/Guide_1/Topic_1"},
                "tags":{"@count":"2","tag":[{"@value":"borborygmi","title":"borborygmi","type":"text"},{"@value":"foo","title":"foo","type":"text"}]},
                "title":"Topic 1",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_1/Topic_1"
            }
        ]
    }
}`;
Mocks.draftContent = `{
    "@type":"text/html",
    "@title":"Test For Ajax Save",
    "@draft":"true",
    "body":[
        "<p>Sample Content</p>",
        {"@target":"toc","#text":"<em>No headers</em>"}
    ]
}`;
Mocks.draftSetContents = `{
    "@status":"success",
    "draft":{
        "@id":"123",
        "@state":"unpublished",
        "@href":"https://editor2.mindtouch.dev/@api/deki/drafts/301",
        "@deactivate":"false",
        "@publish":"true",
        "@revision":"1",
        "title":"Page Title 2",
        "uri.ui":"http://marsdev.mindtouch.dev/Category_1/Guide_1/Page_Title_2"
    }
}`;
