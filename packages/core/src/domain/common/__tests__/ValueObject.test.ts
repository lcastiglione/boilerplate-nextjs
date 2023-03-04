import { ValueObject } from '@core/domain/common';

interface PersonProps {
  firstName: string;
  lastName: string;
}

export class Person extends ValueObject<PersonProps> {
  constructor(props: PersonProps) {
    super(props);
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  public static create(props: PersonProps): Person {
    return new Person(props);
  }
}

export class PersonEmpty extends ValueObject<PersonProps> {
  constructor(props: PersonProps) {
    super(props);
  }
}

describe('ValueObject Class', () => {
  describe('equals', () => {
    it('should return false if the given object is empty', () => {
      const valueObject = new Person({ firstName: 'John', lastName: 'Doe' });
      expect(valueObject.equals()).toBe(false);
    });

    it('should return true if the names have the same values', () => {
      const name1 = new Person({ firstName: 'John', lastName: 'Doe' });
      const name2 = new Person({ firstName: 'John', lastName: 'Doe' });
      expect(name1.equals(name2)).toBe(true);
    });

    it('should return false if the names have different values', () => {
      const name1 = new Person({ firstName: 'John', lastName: 'Doe' });
      const name2 = new Person({ firstName: 'Jane', lastName: 'Doe' });
      expect(name1.equals(name2)).toBe(false);
    });
  });

  describe('clone', () => {
    it('should return a new instance with the same properties', () => {
      const name1 = new Person({ firstName: 'John', lastName: 'Doe' });
      const name2 = name1.clone();
      expect(name1).toEqual(name2);
      expect(name1).not.toBe(name2);
    });
  });

  describe('create', () => {
    it('should create a valid instance of PersonName', () => {
      const nameProps = { firstName: 'John', lastName: 'Doe' };
      const name = Person.create(nameProps);
      expect(name).toBeInstanceOf(Person);
      expect(name.firstName).toBe('John');
      expect(name.lastName).toBe('Doe');
    });

    it('should return error by create not defined', () => {
      const nameProps = { firstName: 'John', lastName: 'Doe' };
      expect(() => PersonEmpty.create(nameProps)).toThrow('create not defined');
    });
  });
});
