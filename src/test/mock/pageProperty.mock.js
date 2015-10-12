/**
 * MindTouch martian
 * Copyright (C) 2006-2015 MindTouch, Inc.
 * www.mindtouch.com  oss@mindtouch.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.Mocks = window.Mocks || {};
Mocks.pageProperties = `{
    "@count":"1",
    "@href":"https://www.example.com/@api/deki/pages/231/properties",
    "property":[
        {
            "@revision":"2",
            "@resid":"300",
            "@name":"mindtouch.import#info",
            "@href":"https://www.example.com/@api/deki/pages/231/properties/mindtouch.import%2523info/info",
            "@etag":"300.r2_ts2013-07-01T22:35:35Z",
            "@resource-is-deleted":"false",
            "@resource-rev-is-deleted":"false",
            "change-description":"updated import at revision 8",
            "contents":{
                "@type":"application/xml; charset=utf-8",
                "@size":"123",
                "@href":"https://www.example.com/@api/deki/pages/231/properties/mindtouch.import%2523info",
                "last-import":{
                    "date.modified":"Wed, 22 May 2013 20:33:25 GMT",
                    "etag":"e1ada6d2a260c76a70a571c2c71cc303"
                }
            },
            "date.modified":"Mon, 01 Jul 2013 22:35:35 GMT"
        },
        {
            "@revision":"2",
            "@resid":"300",
            "@name":"property2",
            "@href":"https://www.example.com/@api/deki/pages/231/properties/mindtouch.import%2523info/info",
            "@etag":"300.r2_ts2013-07-01T22:35:35Z",
            "@resource-is-deleted":"false",
            "@resource-rev-is-deleted":"false",
            "change-description":"updated import at revision 8",
            "contents":{
                "@type":"application/xml; charset=utf-8",
                "@size":"123",
                "@href":"https://www.example.com/@api/deki/pages/231/properties/mindtouch.import%2523info",
                "last-import":{
                    "date.modified":"Wed, 22 May 2013 20:33:25 GMT",
                    "etag":"e1ada6d2a260c76a70a571c2c71cc303"
                }
            },
            "date.modified":"Mon, 01 Jul 2013 22:35:35 GMT"
        }
    ]
}`;
Mocks.pagePropertiesSingle = `{
    "@count":"1",
    "@href":"https://www.example.com/@api/deki/pages/231/properties",
    "property":{
        "@revision":"2",
        "@resid":"300",
        "@name":"mindtouch.import#info",
        "@href":"https://www.example.com/@api/deki/pages/231/properties/mindtouch.import%2523info/info",
        "@etag":"300.r2_ts2013-07-01T22:35:35Z",
        "@resource-is-deleted":"false",
        "@resource-rev-is-deleted":"false",
        "change-description":"updated import at revision 8",
        "contents":{
            "@type":"application/xml; charset=utf-8",
            "@size":"123",
            "@href":"https://www.example.com/@api/deki/pages/231/properties/mindtouch.import%2523info",
            "last-import":{
                "date.modified":"Wed, 22 May 2013 20:33:25 GMT",
                "etag":"e1ada6d2a260c76a70a571c2c71cc303"
            }
        },
        "date.modified":"Mon, 01 Jul 2013 22:35:35 GMT"
    }
}`;
Mocks.pageProperty = `{
    "@revision":"2",
    "@resid":"300",
    "@name":"mindtouch.import#info",
    "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/231/properties/mindtouch.import%2523info/info",
    "@etag":"300.r2_ts2013-07-01T22:35:35Z",
    "@resource-is-deleted":"false",
    "@resource-rev-is-deleted":"false",
    "change-description":"updated import at revision 8",
    "contents":{
        "@type":"application/xml; charset=utf-8",
        "@size":"123",
        "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/231/properties/mindtouch.import%2523info",
        "last-import":{
            "date.modified":"Wed, 22 May 2013 20:33:25 GMT","etag":"e1ada6d2a260c76a70a571c2c71cc303"
        }
    },
    "date.modified":"Mon, 01 Jul 2013 22:35:35 GMT"
}`;
Mocks.childrenProperties = `{
    "@count":"2",
    "property":[
        {
            "@revision":"10",
            "@resid":"36071",
            "@name":"idn.facility#info",
            "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/3880/properties/idn.facility%2523info/info",
            "@etag":"36071.r10_ts2015-07-23T20:07:28Z",
            "@resource-is-deleted":"false",
            "@resource-rev-is-deleted":"false",
            "change-description":"",
            "contents":{
                "@type":"text/plain; charset=UTF-8",
                "@size":"1093",
                "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/3880/properties/idn.facility%2523info",
                "#text":"property contents"
            },
            "date.modified":"Thu, 23 Jul 2015 20:07:28 GMT",
            "page":{
                "@id":"3880",
                "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/3880?redirects=0",
                "@deleted":"false",
                "date.created":"Mon, 13 Jul 2015 15:36:55 GMT",
                "language":"en-US",
                "namespace":"main",
                "page.parent":{
                    "@id":"2091",
                    "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/2091?redirects=0",
                    "@deleted":"false",
                    "date.created":"Wed, 05 Mar 2014 22:44:24 GMT",
                    "language":"en-US",
                    "namespace":"main",
                    "path":"FI/Mountain",
                    "title":"Mountain",
                    "uri.ui":"https://hpgfos.mindtouch.us/FI/Mountain"
                },
                "path":"FI/Mountain/Alaska_Regional_Hospital",
                "title":"Alaska Regional Hospital",
                "uri.ui":"https://hpgfos.mindtouch.us/FI/Mountain/Alaska_Regional_Hospital"
            }
        },
        {
            "@revision":"1",
            "@resid":"35662",
            "@name":"idn.facility#info",
            "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/3836/properties/idn.facility%2523info/info",
            "@etag":"35662.r1_ts2015-06-15T17:29:34Z",
            "@resource-is-deleted":"false",
            "@resource-rev-is-deleted":"false",
            "change-description":"",
            "contents":{
                "@type":"text/plain; charset=UTF-8",
                "@size":"237",
                "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/3836/properties/idn.facility%2523info",
                "#text":"property contents"
            },
            "date.modified":"Mon, 15 Jun 2015 17:29:34 GMT",
            "page":{
                "@id":"3836",
                "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/3836?redirects=0",
                "@deleted":"false",
                "date.created":"Mon, 15 Jun 2015 17:29:33 GMT",
                "language":"en-US",
                "namespace":"main",
                "page.parent":{
                    "@id":"2091",
                    "@href":"https://hpgfos.mindtouch.us/@api/deki/pages/2091?redirects=0",
                    "@deleted":"false",
                    "date.created":"Wed, 05 Mar 2014 22:44:24 GMT",
                    "language":"en-US",
                    "namespace":"main",
                    "path":"FI/Mountain",
                    "title":"Mountain",
                    "uri.ui":"https://hpgfos.mindtouch.us/FI/Mountain"
                },
                "path":"FI/Mountain/Test_Facility",
                "title":"Test Facility",
                "uri.ui":"https://hpgfos.mindtouch.us/FI/Mountain/Test_Facility"
            }
        }
    ]
}`;
