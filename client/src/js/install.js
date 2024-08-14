// Get the install button element
const butInstall = document.getElementById("buttonInstall");
let deferredPrompt;

// Display the install button
function showInstallButton() {
  butInstall.style.display = "block";
}

// Hide the install button
function hideInstallButton() {
  butInstall.style.display = "none";
}

// Handle the PWA installation process
// Listen for the event that triggers the install button display
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton();
});

// Handle the click event for the install button
butInstall.addEventListener("click", async () => {
  if (!deferredPrompt) {
    console.log("No install prompt is available");
    return;
  }

  // Trigger the install prompt
  const result = await deferredPrompt.prompt();
  console.log(
    `User ${
      result.outcome === "accepted" ? "accepted" : "dismissed"
    } the install prompt`
  );

  deferredPrompt = null; // Reset the saved prompt
  hideInstallButton(); // Hide the install button
});

// Log when the PWA has been installed
window.addEventListener("appinstalled", (event) => {
  console.log("PWA has been installed", event);
});
