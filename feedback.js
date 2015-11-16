import Plug from './deki.plug';
import utility from './deki.utility';
import settings from './settings';
var feedback = {
    _plug: new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'workflow', 'submit-feedback').withParam('dream.out.format', 'json'),
    submit: function(options) {
        var def = new $.Deferred();
        var path = options.path || _(window.location.pathname).ltrim('/');
        var userEmail = options.userEmail;
        var pageTitle = options.pageTitle;
        var siteUrl = options.siteUrl;
        var request = JSON.stringify({
            _path: encodeURIComponent(path),
            userEmail: userEmail,
            pageTitle: pageTitle,
            siteUrl: siteUrl,
            content: options.content,
            contactAllowed: options.contactAllowed
        });
        this._plug.post(request, utility.jsonRequestType, function(response) {
            if(response.isSuccess()) {
                var responseData = JSON.parse(response.responseText);
                def.resolve(responseData);
            } else {
                def.reject(response.getStatusText());
            }
        });
        return def.promise();
    },
    getRatingsForPages: function(pageIds) {
        var def = new $.Deferred();
        var ratingsPlug = new Plug(settings.get('baseHref') + '/')
            .at('@api', 'deki', 'pages', 'ratings')
            .withParam('dream.out.format', 'json')
            .withParams({ pageids: pageIds.join(',') });
        ratingsPlug.get(function(response) {
            if(response.isSuccess()) {
                var data = response.getJson();
                if('@count' in data && parseInt(data['@count'], 10) > 0) {
                    def.resolve(utility.makeArray(data.page));
                } else {
                    def.resolve([]);
                }
            } else {
                def.reject();
            }
        });
        return def.promise();
    }
};
export default feedback;
