import AmDataTypesBase from '@/Base';
import AmDataTypesMoney from '@/Money';

describe('AmDataTypesMoney - register', () =>
{
    it('Is registered as "Money"', () =>
        expect(AmDataTypesBase.create('Money')).toBeInstanceOf(AmDataTypesMoney));
    it('Extends "Base"', () =>
        expect(AmDataTypesBase.create('Money')).toBeInstanceOf(AmDataTypesBase));
});

describe('AmDataTypesMoney - @constructor', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypesMoney());
    it('value is "null"', () => expect(sut.value).toBeNull());
    it('currency is "EUR"', () => expect(sut.currency).toBe('EUR'));
    it('position is "right"', () => expect(sut.position).toBe('right'));
});

describe('AmDataTypesMoney - methods', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypesMoney());

    describe('_parseValue', () =>
    {
        it('Works as expected with "Number" values', () =>
        {
            const result = sut._parseValue(1);
            expect(result).toEqual(1);
            expect(sut.currency).toEqual('EUR');
            expect(sut.position).toEqual('right');
        });
        it('Works as expected with "String" values', () =>
        {
            const result = sut._parseValue('1');
            expect(result).toEqual(1);
            expect(sut.currency).toEqual('EUR');
            expect(sut.position).toEqual('right');
        });
        it('Extract properties from object', () =>
        {
            const result = sut._parseValue({ amount : 1, currency : 'foo', position : 'other' });
            expect(result).toEqual(1);
            expect(sut.currency).toEqual('foo');
            expect(sut.position).toEqual('other');
        });
    });

    describe('toString', () =>
    {
        it('EUR 1.05 returns "1.05€"', () =>
        {
            sut.value = { amount : 1.05 };
            expect(sut.toString()).toEqual('1.05€');
        });
        it('EUR -1.05 returns "-1.05€"', () =>
        {
            sut.value = { amount : -1.05 };
            expect(sut.toString()).toEqual('-1.05€');
        });
        it('EUR -1.05 (left) returns "€-1.05"', () =>
        {
            sut.value = { amount : -1.05, position : 'left' };
            expect(sut.toString()).toEqual('€-1.05');
        });
        it('Default behavior is for EUR and right', () =>
        {
            sut.value = { amount : 1.05, position : 'other', currency : 'FOO' };
            expect(sut.toString()).toEqual('1.05€');
        });
    });
});
