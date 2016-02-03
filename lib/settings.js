/**
 * Martian - Core JavaScript API for MindTouch
 *
 * Copyright (c) 2015 MindTouch Inc.
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
let _defaultProperties = {};
export class Settings {
    static set defaults(properties) {
        _defaultProperties = properties;
    }
    constructor(properties = _defaultProperties) {
        this.properties = properties;
    }
    clone(overrides = {}) {
        let newProps = overrides;
        Object.keys(this.properties).forEach((key) => {
            if(!(key in overrides)) {
                newProps[key] = this.properties[key];
            }
        });
        return new Settings(newProps);
    }
    get(propertyName) {
        return this.properties[propertyName];
    }
    set(propertyName, value) {
        this.properties[propertyName] = value;
    }
    getProperties() {
        return this.properties;
    }
}
