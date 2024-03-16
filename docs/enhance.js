"use strict";
function getEnhanceBehavior() {
    // Observed behavior. Fix if wrong.
    const enhanceBehavior = {
        behaviorChangeThreshold: 20, // If your playlist has this many songs or less...
        minimumFinalLength: 30, // ... Spotify will make sure it has at least this many.
        forEvery: 2 // Otherwise, for every of this many songs already in the playlist, Spotify adds one more.
    };
    return enhanceBehavior;
}
function calculate() {
    const outputField = document.getElementById("output");
    const songsInput = document.getElementById("songs");
    let songs = parseInt(songsInput.value);
    const durationInput = document.getElementById("duration");
    let durationValue = parseInt(durationInput.value);
    let durationUnits = "hours";
    // Convert hours to minutes.
    if (durationUnits === "hours") {
        durationValue = durationValue * 60;
        durationUnits = "minutes";
    }
    // Help fix any weird inputs.
    durationValue = Math.floor(durationValue);
    if (durationValue <= 0) {
        durationValue = 1;
    }
    let averageDuration = durationValue / songs;
    let enhanceSongs;
    if (songs <= getEnhanceBehavior().behaviorChangeThreshold) {
        enhanceSongs = getEnhanceBehavior().minimumFinalLength - songs;
    }
    else {
        enhanceSongs = Math.floor(songs / getEnhanceBehavior().forEvery);
    }
    let newLength = songs + enhanceSongs;
    let newDuration = newLength * averageDuration;
    if (newDuration > 60) {
        newDuration = newDuration / 60;
        durationUnits = "hours";
    }
    newDuration = Math.round(newDuration);
    const outputText = `If you hit enhance, your playlist will become ${newLength} songs long, and will last about ${newDuration} ${durationUnits}.`;
    outputField.innerHTML = outputText;
}
