let counter = 0;
function myFunction(id) {
    let block = document.getElementById(id).parentElement;
    let image = Array.from(block.children).find(child => child.tagName.toLowerCase() === 'img');
    let toggleElements = document.querySelectorAll(".toggle-element")
    block.style.scale = 1.5;

    function toggleDisplay() {
        toggleElements.forEach(toggleElement => {
            // Toggle between 'block' and 'none'
            toggleElement.style.display = toggleElement.style.display === "block" ? "none" : "block";
        });
    }

    if (counter !== 0) {
        block.style.scale = 1;
        block.style.position = ''; // Reset position
        block.style.top = '';
        block.style.left = '';
        block.style.transform = '';
        block.style.zIndex = '';
        counter = 0;
        image.style.height = "22vh";

        toggleDisplay()

    } else {
        
        // Call the function to toggle the display
        toggleDisplay();
        counter += 1;
        image.style.height = "10vh";

        // Set position to fixed and center the block
        block.style.top = '50%';
        block.style.left = '50%';
        block.style.position = 'fixed';
        block.style.transform = 'translate(-35%, -50%)'; // Centering the block based on viewport
        block.style.zIndex = '1000'; // Bring block to the front
    }
}
function storeInput() {
    // Get the value from the textbox
    const inputValue = document.getElementById('Textbox').value.trim();
    
    // Check if the input is empty
    if (!inputValue) {
        alert("Please enter an equation.");
        return;
    }

    try {
        // Split the equation into left and right sides
        const sides = inputValue.split('=');
        if (sides.length !== 2) {
            throw new Error("Equation must contain exactly one '=' sign.");
        }

        const left = sides[0];
        const right = sides[1];

        // Rearrange the equation to left - right = 0
        const expr = `(${left}) - (${right})`;

        // Parse the expression
        const equation = math.parse(expr);

        // Use symbolic solving if available
        // Math.js doesn't have a built-in symbolic solver, but we can use the `solve` function from the algebra package
        // Alternatively, use numerical methods

        // For simplicity, let's solve for 'x' numerically
        const solver = math.derivative(expr, 'x'); // Not directly useful for solving
        // Instead, use math.js's numerical solver via Newton-Raphson or other methods

        // However, Math.js doesn't provide a high-level equation solver
        // We can implement a simple solver using math.js's evaluate function

        // Define a function f(x) = left - right
        const f = (x) => {
            return math.evaluate(expr, {x: x});
        };

        // Implement the Newton-Raphson method
        function solveEquation(f, x0, tolerance = 1e-7, maxIterations = 1000) {
            let x = x0;
            for (let i = 0; i < maxIterations; i++) {
                const fx = f(x);
                const delta = 1e-5;
                // Approximate derivative
                const dfx = (f(x + delta) - f(x - delta)) / (2 * delta);
                if (dfx === 0) {
                    throw new Error("Zero derivative. No solution found.");
                }
                const xNew = x - fx / dfx;
                if (Math.abs(xNew - x) < tolerance) {
                    return xNew;
                }
                x = xNew;
            }
            throw new Error("Exceeded maximum iterations. No solution found.");
        }

        // Initial guess
        const initialGuess = 1;

        const solution = solveEquation(f, initialGuess);

        // Display the solution
        const result = `x = ${solution}`;
        document.getElementById('storedValue').innerText = result;

        // Optionally store the equation and solution in localStorage
        localStorage.setItem('textboxInput', inputValue);
        localStorage.setItem('equationSolution', result);

    } catch (error) {
        alert("Error solving equation: " + error.message);
    }
}

// Optional: Load stored input and solution on page load
window.onload = function() {
    const storedInput = localStorage.getItem('textboxInput');
    const storedSolution = localStorage.getItem('equationSolution');
    if (storedInput) {
        document.getElementById('Textbox').value = storedInput;
    }
    if (storedSolution) {
        document.getElementById('storedValue').innerText = storedSolution;
    }
}
function CalcolaArea(buttonArea){
    const dropdown = document.getElementById("DropArea");
    const resultArea = document.getElementById("resultArea")
    const textbox1 = document.getElementById("textboxArea1")
    const textbox2 = document.getElementById("textboxArea2")
    let value = dropdown.value;
    if (value == "rectangle"){
        textbox2.style.display = "block"
        resultArea.innerText = "a*b"
        if(buttonArea.clicked != true & textbox1.value != null & textbox2.value != null){
            resultArea.innerText = ("Area = "+textbox1.value * textbox2.value).toString()
        }
    }else if (value == "triangle"){
        textbox2.style.display = "block"
        resultArea.innerText = "base * altezza/2"
        if(buttonArea.clicked != true & textbox1.value != null & textbox2.value != null){
            resultArea.innerText = ("Area = "+textbox1.value * textbox2.value / 2).toString()
        }
    }else if(value == "cube"){
        textbox2.style.display = "none"
        resultArea.innerText = "l^3"
        if(buttonArea.clicked != true & textbox1.value != null & textbox2.value != null){
            resultArea.innerText = ("Area = "+textbox1.value**3).toString()
        }
    }else{
        textbox2.style.display = "none"
        resultArea.innerText = "l^2"
        if(buttonArea.clicked != true & textbox1.value != null & textbox2.value != null){
            resultArea.innerText = ("Area = "+textbox1.value**2).toString()
        }
    }
}
function convertUnits() {
    // Get the input value and selected units
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;

    // Initialize a variable for the converted value
    let convertedValue;

    // Conversion logic
    if (fromUnit === "kg" && toUnit === "g") {
        convertedValue = inputValue * 1000; // Kilograms to grams
    } else if (fromUnit === "g" && toUnit === "kg") {
        convertedValue = inputValue / 1000; // Grams to kilograms
    } else if (fromUnit === "mt" && toUnit === "cm") {
        convertedValue = inputValue * 100; // Meters to centimeters
    } else if (fromUnit === "cm" && toUnit === "mt") {
        convertedValue = inputValue / 100; // Centimeters to meters
    } else if (fromUnit === "N" && toUnit === "g") {
        convertedValue = inputValue / 9.81 * 1000; // Newtons to kilograms (assuming Earth's gravity)
    } else if (fromUnit === "kg" && toUnit === "N") {
        convertedValue = inputValue * 9.81; // Kilograms to newtons (assuming Earth's gravity)
    } else if (fromUnit === toUnit) {
        convertedValue = inputValue; // No conversion needed if units are the same
    } else {
        convertedValue = "Invalid conversion"; // Handle invalid conversions
    }

    // Display the result
    document.getElementById("result").innerText = convertedValue
} 