const fs = require("fs");
const readline = require("readline");

function equation(a, b, c) {
  if (a === 0) return { success: false, message: "argument a cannot be 0" };

  console.log(`Equation is: (${a}) * x^2 + (${b}) * x + (${c}) = 0`);

  const D = b * b - 4 * a * c;
  if (D < 0) return { success: false, message: "equation has no finite roots" };

  if (D === 0) {
    console.log("there is 1 root");
    return { success: true, roots: [-b / (2 * a)] };
  }

  console.log("there is 2 roots");
  const [x1, x2] = [
    (-b + Math.sqrt(D)) / (2 * a),
    (-b - Math.sqrt(D)) / (2 * a),
  ];

  return { success: true, roots: [x1, x2] };
}

function getAnswer(a, b, c) {
  const res = equation(a, b, c);
  if (!res.success) console.log(res.message);
  else
    res.roots.forEach((root, index) => console.log(`x${index + 1}: ${root}`));
}

if (process.argv.length === 3) {
  const filePath = process.argv[2];

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("error occurred while reading the file:", err);
      return;
    }

    const args = data.split(" ");
    if (!args[2].includes("\n")) {
      console.log("wrong file format. expected: a b c\\n");
      return;
    }

    const [a, b, c] = args.map(Number);

    let isValid = true;
    [a, b, c].forEach((el) => {
      if (!isFinite(Number(el))) {
        isValid = false;
        console.log(`Error. Expected a valid real number, got ${el} instead`);
      }
    });
    if (!isValid) return;

    getAnswer(a, b, c);
  });
}

function askQuetion(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function getValidNumber(promptText) {
  while (true) {
    const input = await askQuetion(promptText);
    const num = Number(input);
    if (isFinite(num)) return num;

    console.log(`Error. Expected a valid real number, got '${num}' instead`);
  }
}

async function interactiveMode() {
  const a = await getValidNumber("a: ");
  const b = await getValidNumber("b: ");
  const c = await getValidNumber("c: ");

  getAnswer(a, b, c);
}

if (process.argv.length === 2) {
  interactiveMode();
}
