const investBtn = document.getElementById("invest-btn");
const dialog = document.querySelector(".outputs");
const dialogBtn = document.getElementById("dialog-btn");
const input = document.getElementById("investment-amount");
const priceDisplay = document.getElementById("price-display");
const investmentSummary = document.getElementById("investment-summary");
const eventSource = new EventSource("/update");
let goldPrice;

document.getElementById("invest-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  if (!input.value) {
    input.reportValidity(); // shows the built-in "please fill in this field" tooltip
    return;
  }

  try {
    const data = {
      time: new Date().toISOString(),
      amount: input.value,
      goldPrice: goldPrice,
      goldSold: input.value / goldPrice,
    };

    const res = await fetch("/invest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      investmentSummary.textContent = `You just bought ${data.goldSold} ounces (ozt) for $${data.goldPrice}. \n You will receive
          documentation shortly.`;
      dialog.showModal();
    } else {
      console.error("Request failed: ", res.status);
    }
  } catch (error) {
    console.error(error);
  }
});

dialogBtn.addEventListener("click", () => {
  dialog.close();
});

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  goldPrice = data.price;
  priceDisplay.textContent = goldPrice;
};

eventSource.onerror = () => {
  console.log("connection lost......");
};
