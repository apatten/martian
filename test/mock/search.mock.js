
/**
 * MindTouch Core JS API
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
Mocks.search = `{
    "@ranking":"adaptive",
    "@queryid":"13",
    "@querycount":"2",
    "@count.recommendations":"0",
    "@count":"2",
    "result": [
        {
            "author":"admin",
            "content":"Full listing of all available containers in Responsive. Includes variables and mixins for primary, secondary, tertiary, and dynamic listings.",
            "date.modified":"Mon, 17 Aug 2015 18:21:42 GMT",
            "id":"297",
            "mime":"application/vnd.deki1410+xml",
            "page":{
                "path": "Documentation/Branding_with_LESS/Advanced_LESS/Containers",
                "rating": "",
                "title": "Containers",
                "uri.ui": "https://responsive.mindtouch.dev/Documentation/Branding_with_LESS/Advanced_LESS/Containers"
            },
            "rank":"1",
            "title":"Containers",
            "type":"page",
            "uri":"https://responsive.mindtouch.dev/Documentation/Branding_with_LESS/Advanced_LESS/Containers",
            "uri.track":"https://responsive.mindtouch.dev/@api/deki/site/query/13?pageid=297&rank=1&type=page&position=1"
        },
        {
            "author":"admin",
            "content":"The MindTouch custom home page allows site owners to brand their site faster. This article contains the LESS variables and mixin associated with the custom home template.",
            "date.modified":"Mon, 17 Aug 2015 18:20:57 GMT",
            "id":"295",
            "mime":"application/vnd.deki1410+xml",
            "page":{
                "path":"Documentation/Branding_with_LESS/Advanced_LESS/Custom_Home",
                "rating":"",
                "title":"Custom Home",
                "uri.ui":"https://responsive.mindtouch.dev/Documentation/Branding_with_LESS/Advanced_LESS/Custom_Home"
            },
            "rank":"0",
            "title":"Custom Home",
            "type":"page",
            "uri":"https://responsive.mindtouch.dev/Documentation/Branding_with_LESS/Advanced_LESS/Custom_Home",
            "uri.track":"https://responsive.mindtouch.dev/@api/deki/site/query/13?pageid=295&rank=0&type=page&position=2"
        }
    ],
    "summary":{
        "@path":"",
        "results":{
            "@path":"documentation",
            "@count":"2",
            "@title":"Documentation"
        }
    }
}`;
Mocks.searchSingle = `{
    "@ranking":"adaptive",
    "@queryid":"2521",
    "@querycount":"1",
    "@count.recommendations":"0",
    "@count":"1",
    "parsedQuery":"+(content:(eiuriueiueiueieuieuieueiueiueee) title:(eiuriueiueiueieuieuieueiueiueee)^10 path.title:(eiuriueiueiueieuieuieueiueiueee)^4 description:(eiuriueiueiueieuieuieueiueiueee)^3 tag:(eiuriueiueiueieuieuieueiueiueee)^2 filename:(eiuriueiueiueieuieuieueiueiueee)^10 filetitle:(eiuriueiueiueieuieuieueiueiueee) keywords:(eiuriueiueiueieuieuieueiueiueee)^10 ) +type:(wiki document image binary)",
    "result":{
        "author":"admin",
        "date.modified":"Wed, 02 Dec 2015 22:35:30 GMT",
        "id":"419",
        "mime":"application/vnd.deki1410+xml",
        "page":{
            "path":"132",
            "rating":"",
            "title":"132",
            "uri.ui":"https://marsdev.mindtouch.dev/132"
        },
        "rank":"1",
        "tag":"article:topic-category",
        "title":"132",
        "type":"page",
        "uri":"https://marsdev.mindtouch.dev/132",
        "uri.track":"https://marsdev.mindtouch.dev/@api/deki/site/query/2521?pageid=419&rank=1&type=page&position=1"
    }
}`;
Mocks.searchEmpty = `{
    "@ranking":"adaptive",
    "@queryid":"2518",
    "@querycount":"0",
    "@count.recommendations":"0",
    "@count":"0",
    "parsedQuery":"+(content:(3347sadoflhjsd) title:(3347sadoflhjsd)^10 path.title:(3347sadoflhjsd)^4 description:(3347sadoflhjsd)^3 tag:(3347sadoflhjsd)^2 filename:(3347sadoflhjsd)^10 filetitle:(3347sadoflhjsd) keywords:(3347sadoflhjsd)^10 ) +type:(wiki document image binary)"
}`;
