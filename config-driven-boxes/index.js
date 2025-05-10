const config = [
    { color: "red", width: "33.3%" },
    { color: "pink", width: "33.3%" },
    { color: "purple", width: "33.3%" },
    { color: "blue", width: "50%" },
    { color: "green", width: "50%" },
    { color: "yellow", width: "70%" },
    { color: "orange", width: "30%" },
];

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const container = document.createElement("div");
    container.classList.add("container");
    config.forEach((box) => {
        const boxItem = document.createElement("div");
        boxItem.style.backgroundColor = box.color;
        boxItem.style.width = box.width;
        boxItem.style.height = "200px";
        boxItem.addEventListener("click", () => {
            alert(box.color);
        });
        container.appendChild(boxItem);
    });
    root.appendChild(container);
});
