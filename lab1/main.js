const fs = require("fs");
const readline = require("readline");

function validCheck(...arr) {
  const invalid = arr.find((el) => !isFinite(el));

  if (invalid)
    return `Error. Expected a valid real number, got ${invalid} instead`;

  return true;
}

function equation(a, b, c) {
  const isValid = validCheck(a, b, c);
  if (!isValid) return isValid;
  if (a === 0) return "argument a cannot be 0";

  const D = b * b - 4 * a * c;
  if (D < 0) return "equation has no finite roots";

  if (D === 0) {
    console.log("there is 1 root");
    return -b / (2 * a);
  }

  console.log("there is 2 roots");
  const [x1, x2] = [
    (-b + Math.sqrt(D)) / (2 * a),
    (-b - Math.sqrt(D)) / (2 * a),
  ];

  return [x1, x2];
}
