import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.goal.com/*", "https://goal.com/*"]
}

// TODO: make this a config that is set in the popup view
const supported = [
  "Europe - UEFA Super Cup",
  "World - FIFA Women's World Cup",
  "Europe - UEFA Europa Conference League",
  "England - League Cup",
  "France - Trophée des Champions"
]

function updateSections() {
  const sections = document.querySelectorAll('[data-testid="competition-link"]')

  Array.from(sections).forEach((section) => {
    const sectionLabel = section.textContent

    if (!supported.includes(sectionLabel)) {
      section.parentElement.style.display = "none"
    }
  })
}

function run() {
  updateSections()
  new MutationObserver(() => {
    const url = location.href
    if (url.includes("goal.com/en/live-scores")) {
      updateSections()
    }
  }).observe(document, { subtree: true, childList: true })
}

run()
