//POST - requestBody
document.getElementById('nameForm')
    .addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('nameInput').value.trim();

        if (name === "") {
            alert("Name cannot be blank!");
        }

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

const checkbox = document.getElementById('activeCheckbox');
const responseText = document.getElementById('responseSwitchFlagText');

checkbox.addEventListener('change', async function () {
    const isActive = checkbox.checked;

    try {
        const response = await fetch(`http://localhost:8080/api/names/status?active=${isActive}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            responseText.textContent = await response.text();
        } else {
            responseText.textContent = "Failed to update status.";
        }
    } catch (error) {
        console.error("Error:", error);
        responseText.textContent = "Server error occurred.";
    }
});