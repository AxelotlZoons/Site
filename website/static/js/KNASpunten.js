function startOdometerSpinning() {
    isSpinning = true;

    const spinnerInterval = setInterval(() => {
        if (!isSpinning) {
            clearInterval(spinnerInterval);
            return;
        }

        percentageOdometer.innerHTML = Math.floor(Math.random() * 100);  // Random values for demo
        pointsOdometer.innerHTML = Math.floor(Math.random() * 1000);     // Random values for demo
    }, 100);  // Update every 100ms for smooth spinning effect
}


calcForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to stop page reload

    // Start odometer spinning
    startOdometerSpinning();

    // Create a FormData object to hold the form values
    const formData = new FormData(calcForm);

    // Send a POST request to '/calculate' with the correct header
    fetch('/KNASpunten', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data received:', data);  // Debug to check if the data is correct

        // Stop spinning and set final values
        isSpinning = false;

        // Animate to the correct values
        percentageOdometer.innerHTML = data.percentage;
        pointsOdometer.innerHTML = data.points;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
