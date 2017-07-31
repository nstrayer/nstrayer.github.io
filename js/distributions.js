import * as math from 'mathjs';
  
const e = Math.E;
const gamma = math.gamma;

const factorial = (x) => (x === 0 ? 1 : x * factorial(x - 1));

const poissonPmf = (lambda) => {
  return (xRaw) => {
    const x = Math.floor(xRaw);
    return Math.pow(lambda, x) * Math.pow(e, lambda) * (1 / factorial(x));
  };
};

const gammaPdf = (alpha, beta) => {
  return (x) => {
    return (
      Math.pow(x, alpha - 1) *
      Math.pow(e, -x / beta) /
      (gamma(alpha) * Math.pow(beta, alpha))
    );
  };
};

module.exports = {
  poissonPmf,
  gammaPdf,
}