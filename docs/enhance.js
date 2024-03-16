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
    console.log("We have " + songs + " songs in the playlist.");
    const durationInput = document.getElementById("duration");
    let durationValue = parseFloat(durationInput.value);
    let durationUnits = "hours";
    console.log("The playlist length is " + durationValue + " " + durationUnits + " long.");
    // Help fix any weird inputs.
    durationValue = parseFloat(durationValue.toFixed(1));
    // Convert hours to minutes.
    durationValue = durationValue * 60;
    durationUnits = "minutes";
    console.log("This is " + durationValue + " " + durationUnits + " long.");
    let averageDuration = durationValue / songs;
    console.log("The average song length is " + averageDuration + " minutes.");
    let enhanceSongs;
    if (songs <= getEnhanceBehavior().behaviorChangeThreshold) {
        enhanceSongs = getEnhanceBehavior().minimumFinalLength - songs;
    }
    else {
        enhanceSongs = Math.floor(songs / getEnhanceBehavior().forEvery);
    }
    let newLength = songs + enhanceSongs;
    let newDuration = newLength * averageDuration;
    // Convert minutes back to hours.
    newDuration = newDuration / 60;
    durationUnits = "hours";
    newDuration = parseFloat(newDuration.toFixed(1));
    const outputText = `If you hit enhance, your playlist will become ${newLength} songs long, and will last about ${newDuration} ${durationUnits}.`;
    outputField.innerHTML = outputText;
}
