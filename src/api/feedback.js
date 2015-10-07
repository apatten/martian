import Plug from 'lib/plug';
import utility from 'lib/utility';
import pageRatingsModel from 'models/pageRatings.model';
let feedback = {
    submit: function(options) {
        let path = options.path || utility.leftTrim(window.location.pathname, '/');
        let request = JSON.stringify({
            _path: encodeURIComponent(path),
            userEmail: options.userEmail,
            pageTitle: options.pageTitle,
            siteUrl: options.siteUrl,
            content: options.content,
            contactAllowed: options.contactAllowed
        });
        let plug = new Plug().at('@api', 'deki', 'workflow', 'submit-feedback');
        return plug.post(request, utility.jsonRequestType);
    },
    getRatingsForPages: function(pageIds) {
        var ratingsPlug = new Plug().at('@api', 'deki', 'pages', 'ratings').withParams({ pageids: pageIds.join(',') });
        return ratingsPlug.get().then(pageRatingsModel.parse);
    }
};
export default feedback;
