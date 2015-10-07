import Plug from 'lib/plug';
import pageModel from 'models/page.model';
import subpagesModel from 'models/subpages.model';
export default class PageHierarchy {
    constructor() {
        this.filterByArticleTypes = [];
        this._plug = new Plug().at('@api', 'deki', 'pages');
    }
    getRoot(id = 'home') {
        return this._plug.at(id).get().then(pageModel.parse);
    }
    getChildren(id = 'home') {
        let subpagesPlug = this._plug.at(id, 'subpages');
        if(this.filterByArticleTypes.length > 0) {
            subpagesPlug = subpagesPlug.withParam('article', this.filterByArticleTypes.join(','));
        }
        return subpagesPlug.get().then(subpagesModel.parse).then(spModel => {
            return spModel.pageSubpage || [];
        });
    }
    getRootAndChildren(id, asArray = true) {
        return Promise.all([
            this.getRoot(id),
            this.getChildren(id)
        ]).then((values) => {
            let root = values[0];
            let children = values[1];
            root.subpages = children.length > 0;
            if(asArray) {
                root = [ root ];
            }
            return root;
        });
    }
}
