import Plug from 'lib/plug';
import utility from 'lib/utility';
import fileModel from 'models/file.model';
import fileRevisionsModel from 'models/fileRevisions.model';
export default class File {
    constructor(id) {
        this._plug = new Plug().at('@api', 'deki', 'files', id).withParam('draft', true); // isDraftRequest);
    }
    getInfo() {
        return this._plug.at('info').get().then(fileModel.parse);
    }
    getRevisions() {
        return this._plug.at('revisions').get().then(fileRevisionsModel.parse);
    }
    setDescription(description) {
        return this._plug.at('description').put(description, utility.textRequestType).then(fileModel.parse);
    }
    delete() {
        return this._plug.delete();
    }
}
