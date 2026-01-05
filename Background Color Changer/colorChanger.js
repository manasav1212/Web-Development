function generateRandomColor()
{
    const r = Math.random() * 256;
    const g = Math.random() * 256;
    const b = Math.random() * 256;
    return `rgb(${r}, ${g}, ${b})`;
}

function changeBackgroundColor()
{
    document.body.style.backgroundColor = generateRandomColor();
}