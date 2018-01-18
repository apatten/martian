import { kcsStateModel } from './kcsState.model.js';

const attributeModel = [
    { field: '@label', name: 'label' },
    { field: 'value' },
    { field: 'value-label', name: 'valueLabel' }
];

export const kcsTransitionsModel = [
    {
        field: 'transitions',
        transform: [
            { field: 'state', name: 'states', isArray: true, transform: kcsStateModel }
        ]
    },
    { field: 'flag', transform: attributeModel },
    { field: 'governance', transform: attributeModel }
];
