export function getScores() {
    return fetch('https://play4inclusion.lockandload.ch/score')
        .then((response) => response.json());
}