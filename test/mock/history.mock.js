window.Mocks = window.Mocks || {};
Mocks.userActivityEmpty = `{
    "@count":"0",
    "@upto":"eb5cff2e-fd9b-11e4-ae3f-d421f411f250",
    "@since":"daaf75d0-fd9b-11e4-90b5-7d8c11a788c9"
}`;
Mocks.userActivitySingle = `{
    "@count":"3",
    "@upto":"eb5cff2e-fd9b-11e4-ae3f-d421f411f250",
    "@since":"daaf75d0-fd9b-11e4-90b5-7d8c11a788c9",
    "event":{
        "@id":"eb5cff2e-fd9b-11e4-ae3f-d421f411f250",
        "@datetime":"Mon, 18 May 2015 20:24:43 GMT",
        "@type":"page:view",
        "@journaled":"false",
        "@version":"2",
        "data":{"_uri.host":"marsdev.mindtouch.dev","_uri.query":"","_uri.scheme":"https"},
        "page":{
            "@id":"361",
            "@draft.state":"active",
            "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/361?redirects=0",
            "@deleted":"false",
            "date.created":"Wed, 01 Apr 2015 21:24:12 GMT",
            "language":"en-US",
            "namespace":"main",
            "path":{"@seo":"true","#text":"Category_1/Guide_4/Page_Title_3"},
            "path.original":"Category_1/Guide_4/Page_Title_3",
            "title":"Page Title 3",
            "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_4/Page_Title_3"
        },
        "request":{"@id":"eb5cff2e-fd9b-11e4-ae3f-d7734efeb7bb"}
    }
}`;
Mocks.userActivity = `{
    "@count":"3",
    "@upto":"eb5cff2e-fd9b-11e4-ae3f-d421f411f250",
    "@since":"daaf75d0-fd9b-11e4-90b5-7d8c11a788c9",
    "event":[
        {
            "@id":"eb5cff2e-fd9b-11e4-ae3f-d421f411f250",
            "@datetime":"Mon, 18 May 2015 20:24:43 GMT",
            "@type":"page:view",
            "@journaled":"false",
            "@version":"2",
            "data":{"_uri.host":"marsdev.mindtouch.dev","_uri.query":"","_uri.scheme":"https"},
            "page":{
                "@id":"361",
                "@draft.state":"active",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/361?redirects=0",
                "@deleted":"false",
                "date.created":"Wed, 01 Apr 2015 21:24:12 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","#text":"Category_1/Guide_4/Page_Title_3"},
                "path.original":"Category_1/Guide_4/Page_Title_3",
                "title":"Page Title 3",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_4/Page_Title_3"
            },
            "request":{"@id":"eb5cff2e-fd9b-11e4-ae3f-d7734efeb7bb"}
        },
        {
            "@id":"e8e51952-fd9b-11e4-9259-c0b9b9e9894c",
            "@datetime":"Mon, 18 May 2015 20:24:39 GMT",
            "@type":"page:view",
            "@journaled":"false",
            "@version":"2",
            "data":{"_uri.host":"marsdev.mindtouch.dev","_uri.query":"","_uri.scheme":"https"},
            "page":{
                "@id":"361",
                "@draft.state":"active",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/361?redirects=0",
                "@deleted":"false",
                "date.created":"Wed, 01 Apr 2015 21:24:12 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","#text":"Category_1/Guide_4/Page_Title_3"},
                "path.original":"Category_1/Guide_4/Page_Title_3",
                "title":"Page Title 3",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1/Guide_4/Page_Title_3"
            },
            "request":{"@id":"e8e51952-fd9b-11e4-9259-4cb756ea5bf5"}
        },
        {
            "@id":"d61d022a-ea36-11e5-aa42-395b15e44541",
            "@datetime":"Mon, 14 Mar 2016 22:48:14 GMT",
            "@type":"user:search",
            "@language":"en-US",
            "@journaled":"false",
            "@version":"2",
            "data":{
                "constraint":"+(+namespace:main)",
                "limit":"11",
                "path":"/",
                "qid":"3075",
                "query":"page",
                "totalrecommended":"1",
                "totalresults":"38"
            },
            "request":{"@id":"d61d022a-ea36-11e5-aa42-cb143372ce7f"},
            "user":{"@id":"6"}
        }
    ]
}`;
