// Get the processed name from sessionStorage
const processedName = sessionStorage.getItem('processedName');

if (processedName) {
    document.getElementById('resultDisplay').textContent = processedName;
} else {
    document.getElementById('resultDisplay').textContent = 'No result found';
}