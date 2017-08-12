import { posix as path } from 'path';

function getAlias(moduleName, aliases) {
    const longestMatchingKey = Object.keys(aliases).reduce((matchingKey, key) => {
        if(moduleName.startsWith(key)) {
            if(key.length > matchingKey.length) {
                matchingKey = key;
            }
        }
        return matchingKey;
    }, '');
    if(longestMatchingKey !== '') {
        return path.resolve(moduleName.replace(longestMatchingKey, aliases[longestMatchingKey]));
    }
}

export default function aliasModuleName(aliases) {
    return {
        name: 'alias-module-name',
        resolveId(importee, importer) {
            const currentDir = importer ? path.dirname(importer) : path.resolve();
            const alias = getAlias(importee, aliases);
            if(alias) {
                return path.resolve(currentDir, alias);
            }
            return null;
        }
    };
}
