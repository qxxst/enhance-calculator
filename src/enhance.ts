function getEnhanceBehavior() {
    // Observed behavior. Fix if wrong.
    const enhanceBehavior: {behaviorChangeThreshold: number, minimumFinalLength: number, forEvery: number} = {
        behaviorChangeThreshold: 20, // If your playlist has this many songs or less...
        minimumFinalLength: 30, // ... Spotify will make sure it has at least this many.
        forEvery: 2 // Otherwise, for every of this many songs already in the playlist, Spotify adds one more.
    }
    return enhanceBehavior;
}

function calculate() {
    const outputField: HTMLElement = document.getElementById("output") as HTMLElement;

    const songsInput: HTMLInputElement = document.getElementById("songs") as HTMLInputElement;
    let songs: number = parseInt(songsInput.value);
    
    const durationInput: HTMLInputElement = document.getElementById("duration") as HTMLInputElement;
    let durationValue: number = parseInt(durationInput.value);
    let durationUnits: string = "hours";

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

    let averageDuration: number = durationValue / songs;

    let enhanceSongs: number;
    if (songs <= getEnhanceBehavior().behaviorChangeThreshold) {
        enhanceSongs = getEnhanceBehavior().minimumFinalLength - songs;
    } else {
        enhanceSongs = Math.floor(songs / getEnhanceBehavior().forEvery);
    }

    let newLength: number = songs + enhanceSongs;
    let newDuration: number = newLength * averageDuration;
    if (newDuration > 60) {
        newDuration = newDuration / 60;
        durationUnits = "hours";
    }

    newDuration = Math.round(newDuration);

    const outputText: string = `If you hit enhance, your playlist will become ${newLength} songs long, and will last about ${newDuration} ${durationUnits}.`;
    outputField.innerHTML = outputText;
}