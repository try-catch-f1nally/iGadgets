const deleteButtons = document.querySelectorAll(".deleteProductInCart");
const increaseButtons = document.querySelectorAll(".increaseAmount");
const decreaseButtons = document.querySelectorAll(".decreaseAmount");

deleteButtons.forEach(btn => btn.addEventListener("click", (event) => {
    sendCookieProductInCart({
        productId: event.currentTarget.dataset.productId,
        amount: 0
    });
    let amountIndicator = document.querySelector(".amountIndicator");
    amountIndicator.innerText = +amountIndicator.innerText - 1;
    const productInCart = event.currentTarget.closest(".productInCart");
    const nextElement = productInCart.nextElementSibling;
    if (nextElement && nextElement.tagName.toLowerCase() === "hr") {
        nextElement.remove();
    } else {
        const prevElement = productInCart.previousElementSibling;
        if (prevElement && prevElement.tagName.toLowerCase() === "hr") prevElement.remove();
    }
    productInCart.remove();
    checkCart();
    checkTotalSum()
}));

increaseButtons.forEach(btn => btn.addEventListener("click", (event) => {
    const productInCart = event.currentTarget.closest(".productInCart");

    const productSum = productInCart.querySelector(".productSum");
    productSum.innerText = +productSum.innerText + +event.currentTarget.dataset.productPrice;

    const productAmount = productInCart.querySelector(".productAmount");
    if (+productAmount.innerText === 1){
        productInCart.querySelector(".decreaseAmount").classList.remove("disabled");
    }
    productAmount.innerText = +productAmount.innerText + 1;

    sendCookieProductInCart({
        productId: event.currentTarget.dataset.productId,
        amount: +productAmount.innerText
    });

    checkTotalSum()
}));

decreaseButtons.forEach(btn => btn.addEventListener("click", (event) => {
    const productInCart = event.currentTarget.closest(".productInCart");

    const productSum = productInCart.querySelector(".productSum");
    productSum.innerText = +productSum.innerText - +event.currentTarget.dataset.productPrice;

    const productAmount = productInCart.querySelector(".productAmount");
    if (+productAmount.innerText === 2) {
        productInCart.querySelector(".decreaseAmount").classList.add("disabled");
    }
    productAmount.innerText = +productAmount.innerText - 1;

    sendCookieProductInCart({
        productId: event.currentTarget.dataset.productId,
        amount: +productAmount.innerText
    });

    checkTotalSum()
}));

function sendCookieProductInCart(body) {
    fetch('/change-cart', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then();
}

function checkTotalSum() {
    const allProductSums = Array.from(document.querySelectorAll(".productSum"));
    document.getElementById("cartTotalSum").innerText =
        allProductSums
            .map(element => +element.innerText)
            .reduce((prev, cur) => prev + cur, 0)
            .toString();
}

function checkCart() {
    if (!document.querySelectorAll(".productInCart").length) {
        document.getElementById("cartBody").innerHTML = "<h4>The shopping cart is empty :(</h4>";
        document.getElementById("createOrder").classList.add("disabled");
    }
}

checkCart();
checkTotalSum();