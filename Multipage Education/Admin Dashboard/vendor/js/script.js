const activeSidebar = document.querySelectorAll(".sidebar a");
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Active Sidebar
const removeActive = () => {
  activeSidebar.forEach((side) => {
    side.classList.remove("active");
  });
};

activeSidebar.forEach((side) => {
  side.addEventListener("click", () => {
    removeActive();
    side.classList.add("active");
  });
});

// Show sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Close sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// Change theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variable");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

// Fill orders in table
Orders.forEach((order) => {
  const tr = document.createElement("tr");
  const trContent = `
                        <td>${order.productName}</td>
                        <td>${order.productNumber}</td>
                        <td>${order.paymentStatus}</td>
                        <td class="${
                          order.shipping === "Declined"
                            ? "danger"
                            : order.shipping === "pending"
                            ? "warning"
                            : "primary"
                        }">${order.shipping}</td>
                        <td class="primary">Detail</td>
                    `;
  tr.innerHTML = trContent;
  document.querySelector("table tbody").appendChild(tr);
});
