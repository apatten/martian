import Plug from './deki.plug';
import utility from './deki.utility';
import settings from './settings';
export default class PageHierarchy {
    constructor() {
        this.filterByArticleTypes = [];
        this._plug = new Plug(settings.get('baseHref') + '/').at('@api', 'deki', 'pages').withParam('dream.out.format', 'json');
    }
    getRoot(id) {
        var def = new $.Deferred();
        id = id || 'home';
        this._plug.at(id).get(function(response) {
            if(response.isSuccess()) {
                var info = JSON.parse(response.responseText);
                def.resolve(utility.makeArray(info));
            } else {
                def.reject(response.getStatusText());
            }
        });
        return def.promise();
    }
    getChildren(id) {
        var def = new $.Deferred();
        id = id || 'home';
        var subpagesPlug = this._plug.at(id, 'subpages');
        if(!_(this.filterByArticleTypes).isEmpty()) {
            subpagesPlug = subpagesPlug.withParam('article', this.filterByArticleTypes.join(','));
        }
        subpagesPlug.get(function(response) {
            if(response.isSuccess()) {
                var subpageData = JSON.parse(response.responseText);
                def.resolve(utility.makeArray(subpageData['page.subpage']));
            } else {
                def.reject(response.getStatusText());
            }
        });
        return def.promise();
    }
    getRootAndChildren(id) {
        var def = new $.Deferred();
        $.when(this.getRoot(id), this.getChildren(id)).done(function(root, children) {
            root[0]['@subpages'] = children.length > 0 ? 'true' : 'false';
            def.resolve(root);
        });
        return def.promise();
    }
}
