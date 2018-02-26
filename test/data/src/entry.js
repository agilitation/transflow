const {t} = require('../../../src/transflow');
module.exports = {
    noopProp: 'willnotbetranslated',
    simpleProp: t({default: 'simpleProp.defaultValue'}),
    complexProp: {
        subProp: {
            value: t({default: 'complexProp.subProp.value.defaultValue'})
        }
    },
    arrayProp: [
        {prop: t({default: 'arrayProp.firstItem.prop.defaultValue'})},
        {prop: t({default: 'arrayProp.secondItem.prop.defaultValue'})},
    ],
    arrayOfTranslationsProp: [
        t({default: 'arrayOfTranslationsProp.firstItem.defaultValue'}),
        t({default: 'arrayOfTranslationsProp.secondItem.defaultValue'}),
    ]
};
