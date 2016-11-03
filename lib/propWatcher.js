function setRecursivePathGetter(obj, getter, propPaths, path = []) {
    Object.keys(obj).forEach((prop) => {
        const currentPath = [ ...path ];
        currentPath.push(prop);
        const propPath = currentPath.join(' > ');
        propPaths.push(propPath);
        let value = obj[prop];
        Object.defineProperty(obj, prop, {
            configurable: true,
            enumerable: true,
            get() {
                getter(propPath);
                return value;
            },
            set(newValue) {
                value = newValue;
            }
        });
        if(value && typeof value === 'object') {
            setRecursivePathGetter(value, getter, propPaths, currentPath);
        }
    });
}

export class PropWatcher {
    constructor(obj) {
        this._allPropPaths = [];
        this._accessedPropPaths = [];
        setRecursivePathGetter(obj, (propPath) => {
            this._accessedPropPaths.push(propPath);
        }, this._allPropPaths);
    }
    getUnaccessed() {
        return this._allPropPaths.filter((propPath) => !this._accessedPropPaths.includes(propPath));
    }
}
