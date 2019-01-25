import AmDataTypesBase from '@/Base';
import AmDataTypesNumber from '@/Number';

describe('AmDataTypesNumber - register', () =>
{
    it('Is registered as "Number"', () =>
        expect(AmDataTypesBase.create('Number')).toBeInstanceOf(AmDataTypesNumber));
    it('Extends "Base"', () =>
        expect(AmDataTypesBase.create('Number')).toBeInstanceOf(AmDataTypesBase));
});

describe('AmDataTypesNumber - @constructor', () =>
    it('Defines property "precision"', () =>
    {
        const sut = new AmDataTypesNumber();
        expect(sut.precision).toEqual(2);
    }));

describe('AmDataTypes - methods', () =>
{
    let sut;
    beforeEach(() => sut = AmDataTypesBase.create('Number'));

    describe('_parseValue', () =>
    {
        it('By default, returns "null"', () => expect(sut._parseValue()).toBeNull());
        [
            {
                value   : null,
                result  : null
            },
            {
                value   : undefined,
                result  : null
            },
            {
                value   : false,
                result  : null
            },
            {
                value   : true,
                result  : null
            },
            {
                value   : {},
                result  : null
            },
            {
                value   : [],
                result  : null
            },
            {
                value   : 'foo',
                result  : null
            },
            {
                value   : '123',
                result  : 123
            },
            {
                value   : 0,
                result  : 0
            },
        ].forEach(
            item =>
            {
                it(`Returns "${item.result}" for value "${item.value}"`, () =>
                    expect(sut._parseValue(item.value)).toEqual(item.result));
            }
        )
    });

    describe('isInteger', () =>
    {
        it('By default returns "false"', () => expect(sut.isInteger()).toBe(false));
        it('For "1" returns "true"', () =>
        {
            sut.value = 1;
            expect(sut.isInteger()).toBe(true);
        });
        it('For "1.5" returns "false"', () =>
        {
            sut.value = 1.5;
            expect(sut.isInteger()).toBe(false);
        });
    });

    describe('isPositive', () =>
    {
        it('By default returns "false"', () => expect(sut.isPositive()).toBe(false));
        it('For "1" returns "true"', () =>
        {
            sut.value = 1;
            expect(sut.isPositive()).toBe(true);
        });
        it('For "-1" returns "false"', () =>
        {
            sut.value = -1;
            expect(sut.isPositive()).toBe(false);
        });
    });

    describe('toString', () =>
    {
        it('By default returns "null"', () => expect(sut.toString()).toEqual('null'));
        it('Returns String representation of "1"', () =>
        {
            sut.value = 1;
            expect(sut.toString()).toEqual('1');
        });
        it('Returns String representation of "1.100009"', () =>
        {
            sut.value = 1.100009;
            expect(sut.toString()).toEqual('1.10');
        });
    });
});
