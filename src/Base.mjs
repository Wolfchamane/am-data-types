import AmFactory from 'am-factory/src/Factory.mjs';

/**
 * Base class for all data types
 *
 * @namespace   am.data.types
 * @class       am.data.types.Base
 * @extends     am.Factory
 */
export default class AmDataTypesBase extends AmFactory
{
    /**
     * @constructor
     * @param       {*} value Initial value
     */
    constructor(value = null)
    {
        super();

        /**
         * Current data value.
         *
         * @property    $$value
         * @type        {*}
         * @default     null
         * @protected
         * @private
         */
        Object.defineProperty(this, '$$value', {
            configurable    : false,
            enumerable      : false,
            writable        : true,
            value           : null
        });

        if (value)
        {
            this.value = value;
        }
    }

    /**
     * Returns current instance value
     *
     * @getter
     * @return {*} Current value
     */
    get value()
    {
        return this.$$value;
    }

    /**
     * Sets new value for this instance
     *
     * @setter
     * @param   {*} value New value
     */
    set value(value)
    {
        this.$$value = this._parseValue(value);
    }

    /**
     * Parses value in order to return it right format
     *
     * @method  _parseValue
     * @param   {*} value New value to be parsed
     * @return  {*} Value parsed
     * @private
     */
    _parseValue(value)
    {
        return value;
    }

    /**
     * Returns the string representation of current value
     *
     * @method  toString
     * @return  {String}    Current value as string
     */
    toString()
    {
        return String(this.value);
    }
}

AmFactory.register('Base', AmDataTypesBase);
