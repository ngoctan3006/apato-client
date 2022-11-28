export class AccessToken {
  private static _value: string | null;

  static get value(): string | null {
    return this._value;
  }

  static set value(value: string | null) {
    this._value = value;
  }
}
