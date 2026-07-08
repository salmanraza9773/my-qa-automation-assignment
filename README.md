**Project Directory Structure**

├── tests/
│   ├── test1-delayed-button.spec.ts   # Challenge 1.1: Delayed Button Activation
│   # (Your other test files go here)
├── app.html                           # Local Compiled Application Canvas
├── playwright.config.ts               # Automated Runner Configuration
├── package.json                       # Project Metadata & Dependenices
└── README.md                          # Solution Documentation


**Getting Started**

**Prerequisites**

Before running the test suite, make sure you have Node.js (version 18 or higher) installed on your system.

1. **Installation**

Clone the repository and install the project dependencies along with the required Playwright browser binaries:

# Clone the repository
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME

# Install dependencies
npm install


2. **Running All Tests (Headless)**

Run the entire 5-test suite cleanly in the background:

npx playwright test


3. **Running an Individual Test**

To execute a single test file exclusively, append the file path to your command:

npx playwright test tests/test1-delayed-button.spec.ts


Alternatively, to isolate a single test inside a shared file, add the .only modifier to the test block in your code (test.only('title', ...)).

4. **Running in Interactive UI Mode**

For full time-travel debugging, step-by-step element inspection, and complete visual screenshots, launch the Playwright UI panel:

npx playwright test --ui


5. **Stress-Testing Test Stability (10 Consecutive Runs)**

To satisfy and verify the stability criteria automatically on your device, execute the test suite 10 times consecutively:

npx playwright test --repeat-each=10
