async  function fetchData() {
    try {
        const operatorName = document.getElementById('operatorName').value;
        const response = await fetch(`api.rhodesapi.com/api/art/${operatorName}?variant=base`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const operatorArt = data.art;
        const operatorImage = document.getElementById('operatorImage');

        operatorImage.src = operatorArt;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch operator data. Please check the console for details.');
    }
}