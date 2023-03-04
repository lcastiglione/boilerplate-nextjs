import { Bloc } from '@core/presentation/common';

class BlocCounter extends Bloc<number> {
  constructor(initialState: number) {
    super(initialState);
  }

  public increment() {
    this.changeState(this.state + 1);
  }

  public decrement() {
    this.changeState(this.state - 1);
  }
}

describe('Bloc Class', () => {
  describe('constructor', () => {
    it('should create a new Bloc instance with the initial state', () => {
      // Arrange
      const initialState = 0;

      // Act
      const bloc = new BlocCounter(initialState);

      // Assert
      expect(bloc.state).toEqual(initialState);
    });
  });

  describe('state', () => {
    it('should return the current state', () => {
      // Arrange
      const initialState = 0;
      const bloc = new BlocCounter(initialState);

      // Act
      const currentState = bloc.state;

      // Assert
      expect(currentState).toEqual(initialState);
    });
  });

  describe('changeState', () => {
    it('should change the current state to the new state', () => {
      // Arrange
      const initialState = 0;
      const bloc = new BlocCounter(initialState);
      const newState = 1;

      // Act
      bloc.changeState(newState);

      // Assert
      expect(bloc.state).toEqual(newState);
    });

    it('should call all subscribed listeners with the new state', () => {
      // Arrange
      const initialState = 0;
      const bloc = new BlocCounter(initialState);
      const newState = 1;
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      bloc.subscribe(listener1);
      bloc.subscribe(listener2);

      // Act
      bloc.changeState(newState);

      // Assert
      expect(listener1).toHaveBeenCalledWith(newState);
      expect(listener2).toHaveBeenCalledWith(newState);
    });

    it('should not call any listener if there are no subscribed listeners', () => {
      // Arrange
      const initialState = 0;
      const bloc = new BlocCounter(initialState);
      const newState = 1;

      // Act
      bloc.changeState(newState);

      // Assert
      expect.assertions(0);
    });
  });

  describe('subscribe', () => {
    it('should add the listener to the list of subscribed listeners', () => {
      // Arrange
      const initialState = 0;
      const bloc = new BlocCounter(initialState);
      const listener = jest.fn();

      // Act
      bloc.subscribe(listener);

      // Assert
      expect(bloc['listeners']).toContain(listener);
    });
  });

  describe('unsubscribe', () => {
    it('should remove the listener from the list of subscribed listeners', () => {
      // Arrange
      const initialState = 0;
      const bloc = new BlocCounter(initialState);
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      bloc.subscribe(listener1);
      bloc.subscribe(listener2);

      // Act
      bloc.unsubscribe(listener1);

      // Assert
      expect(bloc['listeners']).not.toContain(listener1);
      expect(bloc['listeners']).toContain(listener2);
    });

    it('should not remove any listener if the listener is not subscribed', () => {
      // Arrange
      const initialState = 0;
      const bloc = new BlocCounter(initialState);
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      bloc.subscribe(listener1);

      // Act
      bloc.unsubscribe(listener2);

      // Assert
      expect(bloc['listeners']).toContain(listener1);
      expect(bloc['listeners']).not.toContain(listener2);
    });
  });
});
