export let groupMock = {
    groupListing: `{
        "@count":"3",
        "@querycount":"3",
        "@totalcount":"3",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/groups",
        "group":[
            {
                "@id":"2",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/groups/2",
                "groupname":"<script>alert('z')</script>",
                "permissions.group":{
                    "operations":{"@mask":"49215","#text":"LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DRAFT_UPDATE,DRAFT_CREATE"},
                    "role":{"@id":"3","@href":"https://marsdev.mindtouch.dev/@api/deki/site/roles/3","#text":"Contributor"}
                },
                "service.authentication":{"@id":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/site/services/1"},
                "users":{"@count":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/groups/2/users"}
            },
            {
                "@id":"3",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/groups/3",
                "groupname":"hooray",
                "permissions.group":{
                    "operations":{"@mask":"49215","#text":"LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DRAFT_UPDATE,DRAFT_CREATE"},
                    "role":{"@id":"3","@href":"https://marsdev.mindtouch.dev/@api/deki/site/roles/3","#text":"Contributor"}
                },
                "service.authentication":{"@id":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/site/services/1"},
                "users":{"@count":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/groups/3/users"}
            },
            {
                "@id":"4",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/groups/4",
                "groupname":"goodbye",
                "permissions.group":{
                    "operations":{"@mask":"15","#text":"LOGIN,BROWSE,READ,SUBSCRIBE"},
                    "role":{"@id":"2","@href":"https://marsdev.mindtouch.dev/@api/deki/site/roles/2","#text":"Viewer"}
                },
                "service.authentication":{"@id":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/site/services/1"},
                "users":{"@count":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/groups/4/users"}
            }
        ]
    }`,
    groupListingSingle: `{
        "@count":"1",
        "@querycount":"1",
        "@totalcount":"1",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/groups",
        "group":{
            "@id":"2",
            "@href":"https://marsdev.mindtouch.dev/@api/deki/groups/2",
            "groupname":"<script>alert('z')</script>",
            "permissions.group":{
                "operations":{"@mask":"49215","#text":"LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DRAFT_UPDATE,DRAFT_CREATE"},
                "role":{"@id":"3","@href":"https://marsdev.mindtouch.dev/@api/deki/site/roles/3","#text":"Contributor"}
            },
            "service.authentication":{"@id":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/site/services/1"},
            "users":{"@count":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/groups/2/users"}
        }
    }`,
    groupListingEmpty: `{
        "@count":"0",
        "@querycount":"0",
        "@totalcount":"0",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/groups"
    }`,
    group: `{
        "@id":"2",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/groups/2",
        "groupname":"<script>alert('z')</script>",
        "permissions.group":{
            "operations":{"@mask":"49215","#text":"LOGIN,BROWSE,READ,SUBSCRIBE,UPDATE,CREATE,DRAFT_UPDATE,DRAFT_CREATE"},
            "role":{"@id":"3","@href":"https://marsdev.mindtouch.dev/@api/deki/site/roles/3","#text":"Contributor"}
        },
        "service.authentication":{"@id":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/site/services/1"},
        "users":{"@count":"1","@href":"https://marsdev.mindtouch.dev/@api/deki/groups/2/users"}
    }`,
    groupUsers: `{
        "@count":"2",
        "@querycount":"2",
        "@totalcount":"2",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/groups/3/users",
        "user":[
            {
                "@id":"6",
                "@wikiid":"site_1",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/users/6",
                "date.created":"Mon, 18 May 2015 20:23:08 GMT",
                "date.lastlogin":"Mon, 18 May 2015 20:23:41 GMT",
                "email":"lsdkjf@example.com",
                "fullname":"",
                "hash.email":"72f86b6d0d73b4708bf04ceacd066411",
                "license.seat":"true",
                "nick":"someuser",
                "password":{"@exists":"true"},
                "status":"active",
                "uri.avatar":"https://gravatar.com/avatar/72f86b6d0d73b4708bf04ceacd066411.png?d=mm",
                "uri.gravatar":"https://gravatar.com/avatar/72f86b6d0d73b4708bf04ceacd066411.png?d=mm",
                "username":"someuser"
            },
            {
                "@id":"4",
                "@wikiid":"site_1",
                "@href":"https://marsdev.mindtouch.dev/@api/deki/users/4",
                "date.created":"Tue, 07 Apr 2015 23:02:45 GMT",
                "date.lastlogin":"Wed, 10 Jun 2015 15:20:34 GMT",
                "email":"editor@example.com",
                "fullname":"Mr. Editor",
                "hash.email":"3ec564d1f50ebaa304b1393eb7241f76",
                "license.seat":"true",
                "nick":"editor",
                "password":{"@exists":"true"},
                "status":"active",
                "uri.avatar":"https://gravatar.com/avatar/3ec564d1f50ebaa304b1393eb7241f76.png?d=mm",
                "uri.gravatar":"https://gravatar.com/avatar/3ec564d1f50ebaa304b1393eb7241f76.png?d=mm",
                "username":"editor"
            }
        ]
    }`,
    groupUsersSingle: `{
        "@count":"1",
        "@querycount":"1",
        "@totalcount":"1",
        "@href":"https://marsdev.mindtouch.dev/@api/deki/groups/3/users",
        "user":{
            "@id":"6",
            "@wikiid":"site_1",
            "@href":"https://marsdev.mindtouch.dev/@api/deki/users/6",
            "date.created":"Mon, 18 May 2015 20:23:08 GMT",
            "date.lastlogin":"Mon, 18 May 2015 20:23:41 GMT",
            "email":"lsdkjf@example.com",
            "fullname":"",
            "hash.email":"72f86b6d0d73b4708bf04ceacd066411",
            "license.seat":"true",
            "nick":"someuser",
            "password":{"@exists":"true"},
            "status":"active",
            "uri.avatar":"https://gravatar.com/avatar/72f86b6d0d73b4708bf04ceacd066411.png?d=mm",
            "uri.gravatar":"https://gravatar.com/avatar/72f86b6d0d73b4708bf04ceacd066411.png?d=mm",
            "username":"someuser"
        }
    }`
};
