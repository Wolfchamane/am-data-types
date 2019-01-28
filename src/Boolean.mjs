import AmDataTypesBase from './Base';

/**
 * Data type class model for Booleans
 *
 * @namespace   am.data.types
 * @class       am.data.types.Boolean
 * @extends     am.data.types.Base
 */
export default class AmDataTypesBoolean extends AmDataTypesBase
{
    /**
     * @override
     */
    _parseValue(value = null)
    {
        return !!value;
    }
}

AmDataTypesBase.register('Boolean', AmDataTypesBoolean);
