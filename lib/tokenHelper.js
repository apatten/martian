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
import crypto from 'crypto';
export let tokenHelper = {
    createHelper(key, secret) {
        return () => {
            let hmac = crypto.createHmac('sha256', secret);
            let epoch = Math.floor(Date.now() / 1000);
            hmac.update(`${key}${epoch}`);
            let hash = hmac.digest('hex');
            return `${key}_${epoch}_${hash}`;
        };
    }
};
