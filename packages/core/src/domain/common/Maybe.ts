type None = { tag: 'none' };
type Some<D> = { tag: 'some'; someValue: D };

type MaybeValue<D> = None | Some<D>;

export class Maybe<D> {
  private constructor(private readonly value: MaybeValue<D>) {}

  isDefined(): boolean {
    return this.value.tag === 'some';
  }

  isEmpty(): boolean {
    return this.value.tag === 'none';
  }

  fold<T>(leftFn: () => T, rightFn: (someValue: D) => T): T {
    switch (this.value.tag) {
      case 'none':
        return leftFn();
      case 'some':
        return rightFn(this.value.someValue);
    }
  }

  get(): D {
    return this.getOrThrow();
  }

  getOrElse(defaultValue: D): D {
    return this.fold(
      () => defaultValue,
      (someValue) => someValue
    );
  }

  flatMap<T>(f: (wrapped: D) => Maybe<T>): Maybe<T> {
    return this.fold(
      () => Maybe.none(),
      (someValue) => f(someValue)
    );
  }

  map<T>(f: (wrapped: D) => T): Maybe<T> {
    return this.flatMap((data) => Maybe.fromValue(f(data)));
  }

  getOrThrow(errorMessage?: string): D {
    const throwFn = () => {
      throw Error(errorMessage ? errorMessage : 'Value is empty');
    };

    return this.fold(
      () => throwFn(),
      (someValue) => someValue
    );
  }

  static some<D>(value: D): Maybe<D> {
    if (!value) {
      throw Error('Provided value must not be empty');
    }
    return new Maybe({ tag: 'some', someValue: value });
  }

  static none<D>(): Maybe<D> {
    return new Maybe({ tag: 'none' });
  }

  static fromValue<D>(value: D | undefined | null): Maybe<D> {
    return !value ? Maybe.none() : Maybe.some(value);
  }
}
