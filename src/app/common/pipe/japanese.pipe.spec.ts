import { JapanesePipe } from './japanese.pipe';

describe('JapanesePipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new JapanesePipe();
  });

  describe('with hiragana', () => {
    it('should return text as hiragana', () => {
      const hiragana = pipe.transform('suki');
      expect(hiragana).toEqual('すき');
    });

    it('should return text as hiragana with double letter', () => {
      const hiragana = pipe.transform('yatttsu');
      expect(hiragana).toEqual('やっつ');
    });
  });

  describe('with katakana', () => {
    it('should return text as katakana', () => {
      const katakana = pipe.transform('KAMERA');
      expect(katakana).toEqual('カメラ');
    });

    it('should return text as katakana with double letter', () => {
      const katakana = pipe.transform('ROKKKU');
      expect(katakana).toEqual('ロック');
    });
  });

  it('with incorrect data should return text without transforming', () => {
    const text = pipe.transform('XBcD');
    expect(text).toEqual('XBcD');
  });

  it('with empty text should return empty string', () => {
    const text = pipe.transform('');
    expect(text).toEqual('');
  });
});
