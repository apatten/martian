window.Mocks = window.Mocks || {};
Mocks.contextIdDefinitions = `{
    "context":[
        {"description":"Foo description","id":"foo"},
        {"description":"","id":"sdf"}
    ]
}`;
Mocks.contextIdDefinitionsSingle = `{
    "context":{"description":"","id":"foo"}
}`;
Mocks.contextIdDefinitionsEmpty = '';
Mocks.contextIdDefinition = `{
    "description":"Description of foo",
    "id":"foo"
}`;
Mocks.contextMaps = `{
    "contextmap":[
        {
            "@default":"false",
            "@exists":"true",
            "description":"",
            "id":"bar",
            "language":"en-us",
            "page":{
                "@id":"336",
                "@draft.state":"inactive",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/336?redirects=0",
                "@deleted":"false",
                "date.created":"Mon, 23 Mar 2015 19:58:47 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","#text":"Category_1"},
                "title":"Category 1",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1"
            },
            "pageid":{"@page-status":"included","#text":"336"}
        },
        {
            "@default":"false",
            "@exists":"true",
            "description":"",
            "id":"bar",
            "language":"pt-br"
        },
        {
            "@default":"false",
            "@exists":"true",
            "description":"",
            "id":"dfsggf",
            "language":"en-us"
        },
        {
            "@default":"false",
            "@exists":"true",
            "description":"",
            "id":"dfsggf",
            "language":"pt-br"
        },
        {
            "@default":"false",
            "@exists":"true",
            "description":"Foo Descriptiondddd",
            "id":"foo",
            "language":"en-us"
        },
        {
            "@default":"false",
            "@exists":"true",
            "description":"Foo Descriptiondddd",
            "id":"foo",
            "language":"pt-br"
        }
    ],
    "languages":{
        "language":["en-us","pt-br"]
    }
}`;
Mocks.contextMapsSingleLanguage = `{
    "contextmap":[
        {
            "@default":"false",
            "@exists":"true",
            "description":"",
            "id":"bar",
            "language":"en-us",
            "page":{
                "@id":"336",
                "@draft.state":"inactive",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/336?redirects=0",
                "@deleted":"false",
                "date.created":"Mon, 23 Mar 2015 19:58:47 GMT",
                "language":"en-US",
                "namespace":"main",
                "path":{"@seo":"true","#text":"Category_1"},
                "title":"Category 1",
                "uri.ui":"https://marsdev.mindtouch.dev/Category_1"
            },
            "pageid":{"@page-status":"included","#text":"336"}
        },
        {
            "@default":"false",
            "@exists":"true",
            "description":"",
            "id":"dfsggf",
            "language":"en-us"
        },
        {
            "@default":"false",
            "@exists":"true",
            "description":"Foo Descriptiondddd",
            "id":"foo",
            "language":"en-us"
        }
    ],
    "languages":{"language":"en-us"}
}`;
Mocks.contextMapSingleSingle = `{
    "contextmap":{
        "@default":"false",
        "@exists":"true",
        "description":"",
        "id":"sdf",
        "language":"en-us"
    },
    "languages":{"language":"en-us"}
}`;
Mocks.contextMapsEmptySingleLanguage = `{
    "languages":{
        "language":"en-us"
    }
}`;
Mocks.contextMapsEmpty = `{
    "languages":{
        "language":["en-us","pt-br"]
    }
}`;
Mocks.contextMap = `{
    "@default":"false",
    "@exists":"true",
    "description":"Foo Description",
    "id":"foo",
    "language":"en-us",
    "pageid":"273"
}`;
Mocks.contextMapVerbose = `{
    "@default":"false",
    "@exists":"true",
    "description":"Foo Description",
    "id":"foo",
    "language":"en-us",
    "page":{
        "@id":"336",
        "@draft.state":"inactive",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/pages/336?redirects=0",
        "@deleted":"false",
        "@exists":"true",
        "date.created":"Mon, 23 Mar 2015 19:58:47 GMT",
        "language":"en-US",
        "namespace":"main",
        "path":{"@seo":"true","#text":"Category_1"},
        "title":"Category 1",
        "uri.ui":"https://marsdev.mindtouch.dev/Category_1"
    },
    "pageid":{"@page-status":"included","#text":"336"}
}`;

/* eslint-enable quotes */
