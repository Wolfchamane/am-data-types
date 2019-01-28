import AmDataTypesNumber from './Number';
import formatCurrency from 'format-currency';

/**
 * Map of currency symbols
 * @type {{EUR: string, GBP: string, USD: string}}
 */
const SYMBOLS = {
    EUR : '€',
    USD : '$',
    GBP : '£'
};

/**
 * Map of available templates
 * @type {{left: string, right: string}}
 */
const TEMPLATES = {
    right   : '%v%s',
    left    : '%s%v'
};

/**
 * Data type class model for money amounts
 *
 * @namespace   am.data.types
 * @class       am.data.types.Model
 * @extends     am.data.types.Base
 */
export default class AmDataTypesMoney extends AmDataTypesNumber
{
    /**
     * Currency code of this money
     *
     * @property    currency
     * @type        {String}
     * @default     'EUR'
     */
    currency  = 'EUR';

    /**
     * Position in which symbol will be written once coverted toString.
     *
     * @property    position
     * @type        {String}
     * @default     'right'
     */
    position  = 'right';

    /**
     * @override
     * @param value
     * @private
     */
    _parseValue(value)
    {
        /* istanbul ignore next */
        if (value && typeof value === 'object' && !Array.isArray(value))
        {
            const { amount = 0.00, currency = 'EUR', position = 'right' } = value;
            value = amount;
            this.currency = currency;
            this.position = position;
        }

        /* istanbul ignore next */
        return super._parseValue(value);
    }

    /**
     * @override
     */
    toString()
    {
        const symbol = SYMBOLS[this.currency] || '€';
        const format = TEMPLATES[this.position] || TEMPLATES.right;

        return formatCurrency(this.value, { format, symbol });
    }
}

AmDataTypesNumber.register('Money', AmDataTypesMoney);
