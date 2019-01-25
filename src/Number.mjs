import AmDataTypesBase from './Base';

/**
 * Data type model for a Number value
 *
 * @namespace   am.data.types
 * @class       am.data.types.Number
 * @extends     am.data.types.Base
 */
export default class AmDataTypesNumber extends AmDataTypesBase
{
    /**
     * Max number of decimal digits on String representation of this number
     *
     * @property    precision
     * @type        {Number}
     * @default     2
     */
    precision = 2;

    /**
     * @override
     */
    _parseValue(value = null)
    {
        let _value = value;
        if (_value !== null && _value !== undefined)
        {
            /* istanbul ignore next */
            switch (typeof _value)
            {
                case 'object':
                case 'boolean':
                    _value = null;
                    break;
                case 'string':
                    {
                        _value = Number(_value);
                        if (isNaN(_value))
                        {
                            _value = null;
                        }
                    }
                    break;
                case 'number':
                default:
                    break;
            }
        }
        else
        {
            _value = null;
        }

        /* istanbul ignore next */
        return super._parseValue(_value);
    }

    /**
     * Returns whether this type value is an integer number or not
     *
     * @method  isInteger
     * @return  {Boolean}   `true` if is integer, `false` in other case
     */
    isInteger()
    {
        return typeof this.value === 'number'
            ? Math.abs(this.value) % 1 === 0
            : false;
    }

    /**
     * Returns whether this type value is positive or negative
     *
     * @method  isPositive
     * @return  {Boolean}   `true` if is `>= 0.00`, `false` in other case
     */
    isPositive()
    {
        return typeof this.value === 'number'
            ? this.value >= 0.00
            : false;
    }

    /**
     * @override
     * @return {string}
     */
    toString()
    {
        /* istanbul ignore next */
        return typeof this.value === 'number'
            ? this.isInteger()
                ? this.value.toString()
                : this.value.toFixed(this.precision)
            : super.toString();
    }
}

AmDataTypesBase.register('Number', AmDataTypesNumber);
