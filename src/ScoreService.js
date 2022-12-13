export function getScores() {
    return fetch(process.env.REACT_APP_BACKEND_URL)
        .then((response) => response.json());
}