// --- 1. Data Structure ---
// Centralized data makes it easy to add/remove tabs without touching the logic
const tabsData = [
  { id: "tab1", title: "Tab 1", content: "This is content for tab 1" },
  { id: "tab2", title: "Tab 2", content: "This is content for tab 2" },
  { id: "tab3", title: "Tab 3", content: "This is content for tab 3" },
];

// Set the default tab to be the first item in our data array
let activeTab = tabsData[0].id;

const tabContainer = document.querySelector("#tabContainer");
const tabContentContainer = document.querySelector("#tabContentContainer");

// --- 2. Rendering Logic ---
function renderTabs() {
  tabsData.forEach((tab) => {
    // Create the button (Tab Link)
    const btn = document.createElement("button");
    btn.textContent = tab.title;
    btn.className = "tabLink";
    // Store the ID in a data-attribute for easy retrieval later
    btn.dataset.tab = tab.id;
    tabContainer.appendChild(btn);

    // Create the content panel
    const content = document.createElement("div");
    content.id = tab.id;
    content.className = "tabContent";
    content.innerHTML = `<h3>${tab.title}</h3><p>${tab.content}</p>`;
    tabContentContainer.appendChild(content);
  });

  // Initialize the UI by setting the default active tab
  setActiveTab(activeTab);
}

// --- 3. UI Update Logic ---
function setActiveTab(tabId) {
  // Reset: Remove 'active' class from ALL buttons and ALL content panels
  document
    .querySelectorAll(".tabLink, .tabContent")
    .forEach((el) => el.classList.remove("active"));

  // Activate: Apply 'active' class to the matching ID and data-attribute
  document.getElementById(tabId).classList.add("active");
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");

  // Update our state tracker
  activeTab = tabId;
}

// --- 4. Event Delegation ---
// Instead of adding listeners to every button, we listen to the parent container.
// This is better for performance and scalability.
tabContainer.addEventListener("click", (e) => {
  const button = e.target.closest(".tabLink");

  // Ignore clicks that aren't on a tab button
  if (!button) return;

  const tabId = button.dataset.tab;

  // Only update if the user clicks a tab that isn't already active
  if (tabId !== activeTab) {
    setActiveTab(tabId);
  }
});

// Run the render function on page load
renderTabs();
