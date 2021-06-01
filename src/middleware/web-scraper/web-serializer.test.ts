import { getRawDataStub, rawDataMock } from 'spaghettify/core';
import { webSerializer } from './web-serializer';

describe('webSerializer', () => {
  it('should grab a string representing and HTML document and return an actual Document type object', () => {
    const received = webSerializer(rawDataMock);
    const expected = getRawDataStub();

    expect(received).toEqual(expected);
  });
});
