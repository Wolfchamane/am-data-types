import AmDataTypesBase from '../../src/Base.mjs';

describe('AmDataTypesBase - registration', () =>
{
    it('Is registered as "Base"', () =>
    {
        expect(AmDataTypesBase.get('Base')).not.toBe(undefined);
        expect(AmDataTypesBase.create('Base')).toBeInstanceOf(AmDataTypesBase);
    });
});

describe('AmDataTypesBase - @constructor', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypesBase());
    it('Instance owns a private property called "$$value"', () =>
        expect(sut.$$value).toBeNull());
    it('$$value cannot be deleted', () =>
    {
        const fn = () =>
        {
            delete sut.$$value;
        };
        expect(fn).toThrow();
    });
    it('$$value is writable', () =>
    {
        const value = 'my-value';
        sut.$$value = value;
        expect(sut.$$value).toEqual(value);
    });
    it('Creating the instance without values sets $$value as "null"', () =>
    {
        sut = new AmDataTypesBase();
        expect(sut.value).toEqual(sut.$$value);
        expect(sut.value).toBeNull();
    });
    it('Creating the instance with values sets the new value', () =>
    {
        const value = 'my-value';
        sut = new AmDataTypesBase(value);
        expect(sut.value).toEqual(sut.$$value);
        expect(sut.value).toEqual(value);
    });
});

describe('AmDataTypesBase - value', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypesBase());
    it('@getter returns current value', () =>
        expect(sut.value).toBeNull());
    it('@setter sets a new value', () =>
    {
        const value = 'my-value';
        sut.value = value;
        expect(sut.value).toEqual(value);
    });
});

describe('AmDataTypesBase - methods', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypesBase());
    describe('_parseValue', () =>
        it('By default, returns "null"', () =>
            expect(sut._parseValue()).toBeNull()));
});
