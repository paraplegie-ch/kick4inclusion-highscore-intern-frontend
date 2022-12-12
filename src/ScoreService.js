export function getScores() {
    return fetch('http://localhost:3000/score')
        .then((response) => response.json());
}