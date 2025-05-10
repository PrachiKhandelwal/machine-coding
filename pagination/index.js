document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    let products = [];
    let page = 1;
    let pageSize = 15;
    const fetchProducts = async () => {
        try {
            const res = await fetch("https://dummyjson.com/products?limit=43");
            const data = await res.json();
            products = data.products;
            render();
        } catch (err) {
            console.log(err);
        }
    };
    const productsContainer = document.createElement("div");
    const render = () => {
        productsContainer.innerHTML = "";
        let start = page * pageSize - pageSize;
        let end = page * pageSize;
        products.slice(start, end).forEach((product) => {
            const productItem = document.createElement("div");
            productItem.innerHTML = `<img src="${product.thumbnail}"/><p>${product.title}</p>`;
            productsContainer.appendChild(productItem);
        });
        renderPaginator();
    };

    const renderPaginator = () => {
        const totalPages = Math.ceil(products.length / pageSize);
        const paginator = document.createElement("div");
        if (page > 1) {
            const prevBtn = document.createElement("button");
            prevBtn.innerText = "Previous";
            prevBtn.addEventListener("click", () => {
                page--;
                render();
            });
            paginator.appendChild(prevBtn);
        }
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.innerText = i;
            btn.addEventListener("click", () => {
                page = i;
                render();
            });
            if (i === page) {
                btn.style.backgroundColor = "skyblue";
                btn.style.color = "white";
            }
            paginator.appendChild(btn);
        }
        if (page < totalPages) {
            const nextBtn = document.createElement("button");
            nextBtn.innerText = "Next";
            nextBtn.addEventListener("click", () => {
                page++;
                render();
            });
            paginator.appendChild(nextBtn);
        }
        productsContainer.appendChild(paginator);
    };
    root.appendChild(productsContainer);
    fetchProducts();
});
