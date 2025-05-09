document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products");
    let products = [];
    let page = 1;
    let pageSize = 10;

    const fetchProducts = async () => {
        try {
            const res = await fetch("https://dummyjson.com/products?limit=81");
            const data = await res.json();
            if (data && data.products) {
                products = data.products;
                render();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const render = () => {
        productsContainer.innerHTML = "";
        if (products.length) {
            products
                .slice(page * pageSize - pageSize, page * pageSize)
                .forEach((product) => {
                    const productItem = document.createElement("div");
                    productItem.classList.add("products__single");
                    productItem.innerHTML = `<img src="${product.thumbnail}"/><span>${product.title}</span>`;
                    productsContainer.appendChild(productItem);
                });
        }
        root.appendChild(productsContainer);
        let totalPages = Math.ceil(products.length / pageSize);
        const paginator = document.createElement("div");
        if (page > 1) {
            const prevBtn = document.createElement("button");
            prevBtn.innerText = "Previous";
            prevBtn.addEventListener("click", () => {
                page = page - 1;
                render();
            });
            paginator.appendChild(prevBtn);
        }
        for (let i = 1; i <= totalPages; i++) {
            const numberBtn = document.createElement("button");
            numberBtn.innerText = i;
            numberBtn.addEventListener("click", () => {
                page = i;
                render();
            });
            paginator.appendChild(numberBtn);
        }
        if (page < totalPages) {
            const nextBtn = document.createElement("button");
            nextBtn.innerText = "Next";
            nextBtn.addEventListener("click", () => {
                page = page + 1;
                render();
            });
            paginator.appendChild(nextBtn);
        }
        const pageDesc = document.createElement("span");
        pageDesc.innerText = `Page ${page} of ${totalPages}`;
        paginator.appendChild(pageDesc);
        productsContainer.appendChild(paginator);
    };

    fetchProducts();
});
