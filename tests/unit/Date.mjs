import AmDataTypesBase from '@/Base';
import AmDataTypesDate from '@/Date';

describe('AmDataTypesBase - register', () =>
{
    it('Is registered as "Date"', () =>
        expect(AmDataTypesBase.create('Date')).toBeInstanceOf(AmDataTypesDate));
    it('Extends "Base"', () =>
        expect(AmDataTypesBase.create('Date')).toBeInstanceOf(AmDataTypesBase));
});

describe('AmDataTypesDate - @constructor', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypesDate());
    it('value is "null"', () => expect(sut.value).toBeNull());
    it('format is "yyyy-MM-dd"', () => expect(sut.format).toBe('yyyy-MM-dd'));
});

describe('AmDataTypesDate - methods', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypesDate());
    describe('_parseValue', () =>
    {
        it('By default, returns "null"', () => expect(sut._parseValue()).toBeNull());
        [
            '2999',
            '2999-12',
            '2999-12-31',
            1,
            Date.now(),
            new Date()
        ].forEach(
            value =>
            {
                it(`Returns Date from ${value}`, () =>
                {
                    const expected = value instanceof Date
                        ? value
                        : typeof value === 'string'
                            ? Date.parse(value)
                            : new Date(value);
                    expect(sut._parseValue(value)).toEqual(expected);
                });
            }
        );
        it('Returns "null" for a NaN', () =>
        {
            expect(sut._parseValue(NaN)).toBeNull();
        });
    });
    describe('_formatDate', () =>
    {
        it('By default, returns "null"', () => expect(sut._formatDate()).toBeNull());
        it('For default format, returns formatted Date value', () =>
        {
            const value = new Date();
            const expected = [
                [
                    value.getFullYear(),
                    `00${value.getMonth() + 1}`.substr(value.getMonth().toString().length),
                    `00${value.getDate()}`.substr(value.getDate().toString().length)
                ].join('-'),
                [
                    `00${value.getHours()}`.substr(value.getHours().toString().length),
                    `00${value.getMinutes()}`.substr(value.getMinutes().toString().length),
                    `00${value.getSeconds()}`.substr(value.getSeconds().toString().length)
                ].join(':')
            ].join(' ');
            sut.value = value;
            sut.format = 'yyyy-MM-dd hh:mm:ss';
            expect(sut._formatDate()).toEqual(expected);
        });
    });
    describe('toString', () =>
    {
        it('By default returns "null"', () =>
        {
            sut.value = null;
            expect(sut.toString()).toBe('null');
        });
        it('Returns ISO string if has no format', () =>
        {
            const value = new Date();
            sut.value = value;
            sut.format = null;
            expect(sut.toString()).toEqual(value.toISOString());
        });
        it('Returns formatted Date in other case', () =>
        {
            const value = new Date();
            const expected = [
                value.getFullYear(),
                `00${value.getMonth() + 1}`.substr(value.getMonth().toString().length),
                `00${value.getDate()}`.substr(value.getDate().toString().length)
            ].join('-');
            sut.value = value;
            expect(sut.toString()).toEqual(expected);
        });
    })
});
