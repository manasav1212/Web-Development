function updateClock()
{
    const time = new Date().toLocaleTimeString();
    document.getElementById("digiClock").textContent = time;
}

updateClock();

setInterval(updateClock, 1000);

