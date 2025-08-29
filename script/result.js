// Get the processed name from sessionStorage
const processedName = sessionStorage.getItem('processedName');
const resultDisplay = document.getElementById('resultDisplay');

if (processedName) {
    resultDisplay.textContent = processedName;
    resultDisplay.classList.add('result-success');
    resultDisplay.classList.remove('result-empty');
} else {
    resultDisplay.textContent = 'No result found';
    resultDisplay.classList.add('result-empty');
    resultDisplay.classList.remove('result-success');
}
