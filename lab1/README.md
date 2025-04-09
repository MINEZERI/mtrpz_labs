# Quadratic Equation Solver

This is a command-line application for solving quadratic equations in two modes:
- **Interactive Mode** – enter coefficients manually via the terminal.
- **Non-Interactive Mode** – read coefficients from a file.

## Installation and Usage

### 1. Clone the Repository
Ensure you have [Node.js](https://nodejs.org/) installed.
```sh
git clone https://github.com/MINEZERI/mtrpz_labs.git
cd mtrpz_labs
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the Application
- Interactive Mode
```sh
npm run equation
```
The program will prompt for values of a, b, and c, validate them, and display the equation's roots.

- Non-Interactive Mode
```sh
npm run equation file.txt
```
Where file.txt is a text file containing the equation coefficients.

### File Format for Non-Interactive Mode
The file must contain three numbers separated by spaces, followed by a newline character (\n).

### Example of file.txt
```sh
1 0 -4 
```
**✅ Valid format:**

- Three numbers separated by a single space.
- The file ends with a newline character (\n). 

**❌ Invalid format examples:**

- Missing a coefficient.
- Extra characters or text.
- No newline character at the end.

### Revert commit

- **Commit ID:** `ef10b192a2acaa0309841951f39aa00ec4a4b465`
- **Commit Message:** *"Wrong README.md content"*

This commit was reverted to correct the README file's content.  
