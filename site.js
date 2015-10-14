/**
 * MindTouch martian
 * Copyright (C) 2006-2015 MindTouch, Inc.
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

import Plug from './lib/plug';
let sitePlug = new Plug().at('@api', 'deki', 'site');
export default class Site {
    static getResourceString(options) {
        if(!('key' in options)) {
            return Promise.reject('No resource key was supplied');
        }
        var locPlug = sitePlug.at('localization', options.key);
        if('lang' in options) {
            locPlug = locPlug.withParam('lang', options.lang);
        }
        return locPlug.get();
    }
}
