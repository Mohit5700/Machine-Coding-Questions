// --- 1. Data Source ---
// Adding a new section is as easy as adding an object to this array
const sections = [
  { title: "Section 1", content: "Content for section 1" },
  { title: "Section 2", content: "Content for section 2" },
  { title: "Section 3", content: "Content for section 3" },
];

const accordionContainer = document.querySelector("#accordion");

// --- 2. Dynamic Rendering ---
sections.forEach((section, index) => {
  // Create wrapper for the section
  const sectionItem = document.createElement("div");
  sectionItem.classList.add("accordion-item");

  // Create clickable header
  const sectionHeader = document.createElement("div");
  sectionHeader.classList.add("accordion-header");
  sectionHeader.textContent = section.title;

  // Create content panel
  const sectionContent = document.createElement("div");
  sectionContent.classList.add("accordion-content");
  sectionContent.innerHTML = `<p>${section.content}</p>`;

  // Assemble the items
  sectionItem.appendChild(sectionHeader);
  sectionItem.appendChild(sectionContent);

  // Inject into the DOM
  accordionContainer.appendChild(sectionItem);

  // Set Default Section: Opens the first item (index 0) on load
  if (index === 0) {
    sectionItem.classList.add("active");
  }
});

// --- 3. Interaction Logic (Event Delegation) ---
accordionContainer.addEventListener("click", function (event) {
  // Identify if the user clicked the header or something inside the header
  const header = event.target.closest(".accordion-header");

  // If the click wasn't on a header, ignore it
  if (!header) return;

  const sectionItem = header.parentElement;
  const isActive = sectionItem.classList.contains("active");

  // EXCLUSIVE ACCORDION LOGIC:
  // Before opening the new one, we close all other open sections
  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Toggle Logic:
  // If the clicked item wasn't already active, open it now
  if (!isActive) {
    sectionItem.classList.add("active");
  }
});
