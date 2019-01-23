const factory = require('am-factory/src/Factory');
const AmFactory = factory.AmFactory;

/**
 * Base class for all data types
 * @namespace   am.data.types
 * @class       am.data.types.Base
 * @extends     am.Factory
 */
class AmDataTypesBase extends AmFactory
{
    /**
     * Returns current instance value
     * @getter
     * @return {*} Current value
     */
    get value()
    {
        return this.$$value;
    }

    /**
     * Sets new value for this instance
     * @setter
     * @param   {*} value New value
     */
    set value(value)
    {
        this.$$value = this._parseValue(value);
    }

    /**
     * @constructor
     * @param       {*} value Initial value
     */
    constructor(value = null)
    {
        super();

        this.$$value = null;
        if (value)
        {
            this.value = value;
        }
    }

    /**
     * Parses value in order to return it right format
     * @method  _parseValue
     * @param   {*} value New value to be parsed
     * @return  {*} Value parsed
     * @private
     */
    _parseValue(value = null)
    {
        return value;
    }
}

AmFactory.register('Base', AmDataTypesBase);

module.exports = AmDataTypesBase;
