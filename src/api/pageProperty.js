import Plug from 'lib/plug';
import pagePropertiesModel from 'models/pageProperties.model';
import pagePropertyModel from 'models/pageProperty.model';
export default class PageProperty {
    constructor(id = 'home') {
        if(typeof id === 'string' && id !== 'home') {
            id = `=${id}`;
        }
        this._id = id;
        this._plug = new Plug().at('@api', 'deki', 'pages', this._id, 'properties');
    }
    getProperties(names = []) {
        if(!Array.isArray(names)) {
            return Promise.reject(new Error('The property names must be an array'));
        }
        let plug = this._plug;
        if(names.length > 0) {
            plug = plug.withParams({ names: names.join(',') });
        }
        return plug.get().then(pagePropertiesModel.parse);
    }
    getProperty(key) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch a page property without providing a property key'));
        }
        return this._plug.at(key, 'info').get().then(pagePropertyModel.parse);
    }
    getPropertyContents(key) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch a page property contents without providing a property key'));
        }
        return this._plug.at(key).get();
    }
    getPropertyForChildren(key, depth = 1) {
        if(!key) {
            return Promise.reject(new Error('Attempting to fetch properties for children without providing a property key'));
        }
        return this._plug.withParams({ depth: depth, names: key }).get();
    }
}
