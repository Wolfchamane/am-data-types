import AmDataTypesBase from '@/Base';
import AmDataTypesBoolean from '@/Boolean';

describe('AmDataTypesBoolean - registration', () =>
{
    it('Is registered as "Boolean"', () =>
        expect(AmDataTypesBase.create('Boolean')).toBeInstanceOf(AmDataTypesBoolean));
});

describe('AmDataTypesBoolean - methods', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypesBoolean());
    describe('_parseValue', () =>
    {
        [
            null,
            undefined,
            {},
            [],
            0,
            1,
            '',
            'foo',
            false,
            true
        ].forEach(
            value => it(`Returns the boolean value of "${value}"`, () =>
                expect(sut._parseValue(value)).toEqual(!!value))
        );
    })
});
