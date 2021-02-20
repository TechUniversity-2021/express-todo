const { parsingData } = require('../parsingData');

describe('Parsing Data', () => {
  it('should parse data', () => {
    const tasks = 'a\nb\nc';
    expect(parsingData(tasks)).toEqual(['a', 'b', 'c']);
  });
  it('should return [] with empty data ', () => {
    const tasks = '';
    expect(parsingData(tasks)).toEqual([]);
  });
});
