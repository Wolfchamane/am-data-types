import { leftPad } from 'am-tools/src/string';
import AmDataTypesBase from './Base';

/**
 * Data type class model for Dates
 *
 * @namespace   am.data.types
 * @class       am.data.types.Date
 * @extends     am.data.types.Base
 */
export default class AmDataTypesDate extends AmDataTypesBase
{
    /**
     * Format to represent this date
     *
     * @property    format
     * @type        {String}
     * @default     'yyyy-MM-dd'
     */
    format = 'yyyy-MM-dd';

    /**
     * @override
     */
    _parseValue(value = null)
    {
        if (!(value instanceof Date))
        {
            /* istanbul ignore next */
            switch (typeof value)
            {
                case 'number':
                    value = (!isNaN(value) && value > 0)
                        ? new Date(value)
                        : null;
                    break;
                case 'string':
                    value = Date.parse(value);
                    break;
            }
        }

        /* istanbul ignore next */
        return super._parseValue(value);
    }

    /**
     * Formats current Date values as expressed in format property
     *
     * @method  _formatDate
     * @return  {null|String}   `null` by default, `String` with date formatted
     * @private
     */
    _formatDate()
    {
        let result = null;
        const date = this.value;
        if (date instanceof Date)
        {
            result = this.format.replace(
                /(\w+)/g,
                match =>
                {
                    let value = '';
                    switch (match)
                    {
                        case 'yyyy':
                            value = date.getFullYear();
                            break;
                        case 'MM':
                            value = leftPad(String(date.getMonth() + 1));
                            break;
                        case 'dd':
                            value = leftPad(date.getDate().toString());
                            break;
                        case 'hh':
                            value = leftPad(date.getHours().toString());
                            break;
                        case 'mm':
                            value = leftPad(date.getMinutes().toString());
                            break;
                        case 'ss':
                            value = leftPad(date.getSeconds().toString());
                            break;
                    }

                    return value;
                }
            );
        }
        return result;
    }

    /**
     * @override
     */
    toString()
    {
        /* istanbul ignore next */
        return this.value instanceof Date
            ? this.format
                ? this._formatDate()
                : this.value.toISOString()
            : super.toString();
    }
}

AmDataTypesBase.register('Date', AmDataTypesDate);
