export class UtilHelper {
  static isEmptyString(value: string) {
    if (value.trim() === '' || value === null || value === undefined) {
      return true;
    }
    return false;
  }
}
