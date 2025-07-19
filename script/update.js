document.getElementById('updateNameForm')
    .addEventListener('submit', async function (e) {
        e.preventDefault();

        const updatedName = document.getElementById('updateNameInput').value;
        // Get the index of name for update from sessionStorage
        const index = sessionStorage.getItem('nameIndex');

        try {
            //Use backticks if you want to pass path variable
            const updateResponse = await fetch(`http://localhost:8080/api/names/${index}?name=${encodeURIComponent(updatedName)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                // No need for a body if the index is passed in the path
                //params: updatedName
            });

            if (updateResponse.ok) {
                console.log('Updated Name: ', updatedName);
            } else {
                alert('Error processing name');
            }
        } catch (error) {
            console.log('Error: ', error.responseText);
        }
    });