// --- 1. Initial Configuration Data ---
const boxConfig = [
  { color: "red", width: "33.33%" },
  { color: "green", width: "33.33%" },
  { color: "blue", width: "33.33%" },
  { color: "yellow", width: "50%" },
  { color: "orange", width: "50%" },
  { color: "purple", width: "70%" },
  { color: "pink", width: "30%" },
];

// --- 2. Setup the UI Structure ---
// Main area where boxes will live
const container = document.createElement("div");
container.className = "container";

// Form area for our inputs and button
const inputContainer = document.createElement("div");
inputContainer.className = "input-container";

// Inject both containers into the body
document.body.append(container, inputContainer);

// --- 3. Reusable Component Logic ---
/**
 * Creates a box element and injects it into the DOM.
 * We use this for both the initial loop and the manual button click.
 */
const addBox = (color, width) => {
  const box = document.createElement("div");
  box.className = "box";

  // Apply dynamic styles
  box.style.backgroundColor = color;
  box.style.width = width;

  // Store metadata for the click event
  box.dataset.color = color;

  container.appendChild(box);
};

// --- 4. Initial Render ---
// Build the starting boxes from our hardcoded array
boxConfig.forEach(({ color, width }) => {
  addBox(color, width);
});

// --- 5. Interaction: Box Clicks (Event Delegation) ---
container.addEventListener("click", (event) => {
  const box = event.target.closest(".box");
  if (!box) return;

  alert(`Colour of the selected box is ${box.dataset.color}`);
});

// --- 6. Creating the Form UI ---
const colorInput = document.createElement("input");
colorInput.placeholder = "Enter color (e.g. 'purple' or '#hex')";

const widthInput = document.createElement("input");
widthInput.placeholder = "Enter width (1-100)";

const button = document.createElement("button");
button.textContent = "Add Box";

// Add inputs to the form container
inputContainer.append(colorInput, widthInput, button);

// --- 7. Action: Button Click Logic ---
button.addEventListener("click", () => {
  const color = colorInput.value.trim();
  const width = Number(widthInput.value); // Convert string input to a number

  // VALIDATION: Ensure we have a color and a valid percentage
  if (!color || isNaN(width) || width <= 0 || width > 100) {
    alert("Please enter a valid color name and a width between 1-100");
    return;
  }

  const widthPercentage = `${width}%`;

  // Update our data source (optional, but good for keeping data in sync)
  boxConfig.push({
    color,
    width: widthPercentage,
  });

  // Call our helper function to update the UI
  addBox(color, widthPercentage);

  // RESET: Clear the inputs for the next entry
  colorInput.value = "";
  widthInput.value = "";
});
