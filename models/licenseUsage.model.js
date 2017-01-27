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
const helpRequestData = [
    { field: '@name', name: 'name' },
    { field: '@count', name: 'count', transform: 'number' }
];
export const licenseUsageModel = [
    { field: '@count', name: 'count', transform: 'number' },
    { field: '@date.start', name: 'startDate', transform: 'apiDate' },
    { field: '@date.expiration', name: 'expirationDate', transform: 'apiDate' },
    { field: '@anually-licensed-help-requests', name: 'annuallyLicensedHelpRequests' },
    {
        field: 'totals',
        isArray: true,
        transform: [
            { field: '@date', name: 'date', transform: 'apiDate' },
            { field: [ 'custom', 'origin' ], name: 'customRequests', isArray: true, transform: helpRequestData },
            { field: [ 'mt-requests', 'origin' ], name: 'mtRequests', isArray: true, transform: helpRequestData }
        ]
    }
];
