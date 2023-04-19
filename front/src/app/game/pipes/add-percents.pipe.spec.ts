import { AddPercentsPipe } from './add-percents.pipe';

describe('AddPercentsPipe', () => {

  it('should add "%" sign to a number', () => {
    const pipe = new AddPercentsPipe();
    const value = 50;
    const result = pipe.transform(value);
    expect(result).toEqual('50%');
  });
});
