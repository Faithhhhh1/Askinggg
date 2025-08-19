(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Girlfriend-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
/* =============================
   Asking Project Script
   ============================= */

// 👉 JSONbin endpoint + API Key
const JSONBIN_URL = "https://api.jsonbin.io/v3/b/68a472bfd0ea881f405d62b5";
const API_KEY = "$2a$10$9e748i0n/epFU.yOy62IquBFIoDriIpOm9Bo0h5qYfg86ZKa3MFZ2";  

// 👉 Messages shown when she presses "No"
const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️",
    "Don’t break my heart 💔",
    "You’re literally my dream girl 😍",
    "Come on, we’d be so cute together 🥹",
    "What if I make you brownies? 🍫",
    "I’ll watch all your favorite shows 📺",
    "We could be the ultimate power couple 💕",
    "Say yes and I’ll never let you go 😘"
];

// 👉 Counters
let messageIndex = 0;
let noCount = 0;
let yesClickedAt = null;

/* =============================
   Function: Log to JSONbin
   ============================= */
async function logToJSONbin(action, noCount) {
    try {
        console.log("Fetching current bin data...");
        const getRes = await fetch(JSONBIN_URL, {
            method: "GET",
            headers: { "X-Master-Key": API_KEY }
        });

        if (!getRes.ok) {
            console.error("GET failed:", getRes.status, await getRes.text());
            return;
        }

        const binData = await getRes.json();
        const logs = (binData.record && binData.record.logs) ? binData.record.logs : [];

        logs.push({
            timestamp: new Date().toLocaleString(),
            action,
            noCount
        });

        const putRes = await fetch(JSONBIN_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({ logs })
        });

        console.log("✅ Logged:", await putRes.json());
    } catch (err) {
        console.error("Error logging to JSONbin:", err);
    }
}

/* =============================
   Function: Handle "No" click
   ============================= */
function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;

    noCount++;
    logToJSONbin("No clicked", noCount);
}

/* =============================
   Function: Handle "Yes" click
   ============================= */
function handleYesClick() {
    yesClickedAt = new Date().toLocaleString();

    logToJSONbin("YES clicked!", noCount);

    window.location.href = "yes_page.html";
}

/* =============================
   Attach event listeners
   ============================= */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.no-button').addEventListener("click", handleNoClick);
    document.querySelector('.yes-button').addEventListener("click", handleYesClick);
});
