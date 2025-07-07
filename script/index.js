//POST - requestBody
document.getElementById('nameForm')
    .addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('nameInput').value;

    try {
        const response = await fetch('http://localhost:8080/api/names', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name})
        });

        if (response.ok) {
            const result = await response.json();
            // Store result in sessionStorage to pass to next page
            sessionStorage.setItem('processedName', result.processedName);
            // Redirect to result page
            window.location.href = 'result.html';
        } else {
            alert('Error processing name');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server');
    }
});