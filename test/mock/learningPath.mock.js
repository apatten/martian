window.Mocks = window.Mocks || {};
Mocks.learningPath = `{
    "@name": "foobar",
    "@editable": "true",
    "@revision": "5",
    "category": "baz",
    "edittime": "20160225000833",
    "summary": "foobar",
    "title": "foo",
    "uri.learningpath": "https://www.example.com/@lp/foobar",
    "pages": [
        {
            "@id": "123",
            "@draft.state": "inactive",
            "@href": "https://www.example.com/@api/deki/pages/123?redirects=0",
            "@deleted": "false",
            "article": "topic",
            "date.created": "Tue, 22 Dec 2015 16:07:37 GMT",
            "language": "en-US",
            "namespace": "main",
            "overview": "Every day that you don't have your MindTouch site available for your customers, is another day that they loose out on the value your content offers. Here at MindTouch, we've come up with a list of Best Practices that will get your site launched faster and deliver your company's value sooner.",
            "path": {
                "@seo": "true",
                "#text": "foo/bar"
            },
            "title": "bar",
            "uri.learningpath": "https://www.example.com/foo/bar?mt-learningpath=script-test",
            "uri.ui": "https://www.example.com/foo/bar"
        }
    ]
}`;

Mocks.learningPathNoPages = `{
    "@name": "foobar",
    "@editable": "true",
    "@revision": "5",
    "category": "baz",
    "edittime": "20160225000833",
    "summary": "foobar",
    "title": "foo",
    "uri.learningpath": "https://www.example.com/@lp/foobar",
    "pages": []
}`;

Mocks.learningPaths = `{
    learningpath: [
        ${Mocks.learningPath}
    ]
}`;
