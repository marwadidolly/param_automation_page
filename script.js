// ===========================
// MENU TOGGLE + ROTATION
// ===========================
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.toggle("open");
        menuIcon.classList.toggle("rotated");
    });

    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && e.target !== menuIcon) {
            navLinks.classList.remove("open");
            menuIcon.classList.remove("rotated");
        }
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuIcon.classList.remove("rotated");
        });
    });
}

// ===========================
// SCROLL ANIMATION
// ===========================
const sections = document.querySelectorAll("section");

sections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(20px)";
    sec.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

function checkScroll() {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            sec.style.opacity = 1;
            sec.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

// ===========================
// IMAGE ZOOM POPUP — Open
// ===========================
function openPopup(src, title) {
    const popup = document.getElementById("popup");
    const img   = document.getElementById("popup-img");
    const ttl   = document.getElementById("popup-title");

    if (popup && img) {
        img.src = src;
        if (ttl) ttl.textContent = title || "";
        popup.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

// ===========================
// IMAGE ZOOM POPUP — Close
// ===========================
function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.classList.remove("show");
        document.body.style.overflow = "";
    }
}

function closePopupOutside(event) {
    if (event.target.id === "popup") closePopup();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePopup();
        closeBuyPopup();
    }
});

// ===========================
// BUY NOW — Payment Popup
// ===========================
let currentProduct = "";

function openBuyPopup(productName) {
    currentProduct = productName || "Product";

    const popup = document.getElementById("buy-popup");
    const label = document.getElementById("buy-product-name");

    if (label) label.textContent = currentProduct;

    // Reset to QR tab every time
    switchTab("qr", document.querySelector(".pay-tab"));

    if (popup) {
        popup.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeBuyPopup() {
    const popup = document.getElementById("buy-popup");
    if (popup) {
        popup.classList.remove("show");
        document.body.style.overflow = "";
    }
}

function closeBuyPopupOutside(event) {
    if (event.target.id === "buy-popup") closeBuyPopup();
}

// ===========================
// PAYMENT TABS — Switch
// ===========================
function switchTab(tab, btn) {
    document.querySelectorAll(".pay-tab").forEach(t => t.classList.remove("active-tab"));
    if (btn) btn.classList.add("active-tab");

    document.querySelectorAll(".pay-panel").forEach(p => p.classList.remove("active-panel"));
    const panel = document.getElementById("panel-" + tab);
    if (panel) panel.classList.add("active-panel");
}

// ===========================
// COPY UPI ID
// ===========================
function copyUPI() {
    const upiId = "paramsoni57@upi";
    if (navigator.clipboard) {
        navigator.clipboard.writeText(upiId).then(() => {
            showCopyToast("UPI ID copied! 📋");
        }).catch(() => {
            fallbackCopy(upiId);
        });
    } else {
        fallbackCopy(upiId);
    }
}

function fallbackCopy(text) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    showCopyToast("UPI ID copied! 📋");
}

function showCopyToast(msg) {
    let toast = document.getElementById("copy-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "copy-toast";
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #3a0ca3;
            color: white;
            padding: 10px 24px;
            border-radius: 30px;
            font-family: 'Nunito', sans-serif;
            font-weight: 700;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 4px 16px rgba(58,12,163,0.4);
            transition: opacity 0.4s ease;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = "1";
    setTimeout(() => { toast.style.opacity = "0"; }, 2000);
}

// ===========================
// WHATSAPP ORDER (from popup)
// ===========================
function whatsappOrder() {
    const number  = "918109525470";
    const message = `Hello! Main ${currentProduct} kharidna chahta/chahti hun. Please details batayein. 🙏`;
    const url     = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// ===========================
// CONTACT — Call
// ===========================
function callNow() {
    window.location.href = "tel:+918109525470";
}

// ===========================
// CONTACT — WhatsApp
// ===========================
function whatsappNow() {
    const number  = "918109525470";
    const message = "Hello, I want to know more about your products";
    const url     = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}