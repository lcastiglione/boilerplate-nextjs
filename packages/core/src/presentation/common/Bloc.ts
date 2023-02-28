/**
 * La interfaz `Subscription` describe una función que recibe el estado actual como argumento.
 *
 * @template S El tipo del estado.
 */
type Subscription<S> = (state: S) => void

/**
 * La clase abstracta `Bloc` proporciona una implementación básica de la arquitectura Bloc (Business Logic Component).
 *
 * @template S El tipo del estado del Bloc.
 */
export abstract class Bloc<S> {
  private internalState: S
  private listeners: Subscription<S>[] = []

  /**
   * Crea una nueva instancia de Bloc con el estado inicial especificado.
   *
   * @param initialState El estado inicial del Bloc.
   */
  constructor(initialState: S) {
    this.internalState = initialState
  }

  /**
   * Obtiene el estado actual del Bloc.
   */
  public get state(): S {
    return this.internalState
  }

  /**
   * Cambia el estado interno del Bloc y notifica a todos los suscriptores.
   *
   * @param state El nuevo estado del Bloc.
   */
  changeState(state: S) {
    this.internalState = state

    if (this.listeners.length > 0) {
      this.listeners.forEach((listener) => listener(this.state))
    }
  }

  /**
   * Suscribe una función al Bloc para que sea notificada cada vez que cambie su estado.
   *
   * @param listener La función que se suscribirá al Bloc.
   */
  subscribe(listener: Subscription<S>) {
    this.listeners.push(listener)
  }

  /**
   * Cancela la suscripción de una función al Bloc.
   *
   * @param listener La función que se cancelará la suscripción.
   */
  unsubscribe(listener: Subscription<S>) {
    const index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }
}
