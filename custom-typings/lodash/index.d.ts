declare module _ {
  interface LoDashStatic {
      isInteger(value?: any): value is number;
  }

  interface LoDashExplicitWrapperBase<T, TWrapper> {
    split(value: string): LoDashExplicitArrayWrapper<string>;
  }

  interface LoDashExplicitArrayWrapper<T> {
    reduceRight<T, TResult>(
        callback: MemoIterator<T, TResult>,
        accumulator: TResult,
        thisArg?: any
    ): LoDashExplicitArrayWrapper<TResult>;
  }
}
