export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const numberWithCommas = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
