// ask for price

// ===== فورم المنتجات =====
const selectedBox = document.getElementById("selectedProducts");
const hiddenInput = document.getElementById("productsData");
let products = [];

// أوزان الدقيق واسم الشيكارة
const wheatOptions = {
  "10 كيلو": ["جعفر العمدة", "نيو السلام"],
  "25 كيلو": ["يوسف الازرق", "جعفر العمدة"],
  "50 كيلو": [
    "الفيل",
    "ملوك البراق",
    "جعفر العمدة",
    "الحلال",
    "يوسف الأحمر",
    "يوسف الأزرق",
    "البراق الذهبي",
    "الكبير",
    "مخبوزات البراق",
    "الجامبو",
    "علي أفندي",
  ],
};
const fixedNameOptions = ["البراق"]; // للسن والسميد

// ربط كل كارد بالحدث
document.querySelectorAll(".product-card").forEach((card) => {
  const weightSelect = card.querySelector(".bag-weight");
  const typeSelect = card.querySelector(".bag-type");
  const productName = card.dataset.product;

  // تغيير النوع بناءً على الوزن
  weightSelect.addEventListener("change", () => {
    typeSelect.innerHTML = "";

    if (productName === "دقيق") {
      const options = wheatOptions[weightSelect.value] || [];
      typeSelect.appendChild(new Option("اختر نوع الشيكارة", ""));
      options.forEach((opt) => typeSelect.appendChild(new Option(opt, opt)));
    } else if (productName === "سن" || productName === "سميد") {
      typeSelect.appendChild(
        new Option(fixedNameOptions[0], fixedNameOptions[0]),
      );
    } else if (productName === "ردة") {
      const opts = ["خشنة", "ناعمة"];
      typeSelect.appendChild(new Option("اختر نوع الردة", ""));
      opts.forEach((opt) => typeSelect.appendChild(new Option(opt, opt)));
    }
  });

  // إضافة المنتج
  card.querySelector(".add-product").addEventListener("click", () => {
    const weight = weightSelect.value;
    const type = typeSelect.value;
    const qty = card.querySelector(".bag-qty").value;

    if (!weight || !type || !qty) {
      alert("من فضلك اكمل كل الاختيارات");
      return;
    }

    const exists = products.find(
      (p) =>
        p.product === productName && p.weight === weight && p.type === type,
    );
    if (exists) {
      alert(
        "المنتج ده مضاف بنفس نوع ووزن الشيكارة لو محتاج تعدل الكمية الغي الاختيار من الاسفل ثم اختر  عدد الشكاير المطلوبة",
      );
      return;
    }

    products.push({
      id: Date.now(),
      product: productName,
      weight,
      type,
      qty,
    });
    sortProducts();
    renderProducts();
    // إعادة تعيين الـ selects بعد الإضافة
    card.querySelector(".bag-qty").value = "";
    weightSelect.selectedIndex = 0; // يرجع لأول خيار
    typeSelect.innerHTML = ""; // يمسح الخيارات
    if (productName === "دقيق") {
      typeSelect.appendChild(new Option("اختر نوع الشيكارة", ""));
    } else if (productName === "سن" || productName === "سميد") {
      typeSelect.appendChild(
        new Option(fixedNameOptions[0], fixedNameOptions[0]),
      );
    } else if (productName === "ردة") {
      typeSelect.appendChild(new Option("اختر نوع الردة", ""));
    }
  });
});

function sortProducts() {
  products.sort((a, b) => a.product.localeCompare(b.product));
}

function renderProducts() {
  selectedBox.innerHTML = "";
  products.forEach((p) => {
    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-gray-100 p-3 rounded-lg text-sm transition-all duration-300 scale-95 opacity-0";
    div.innerHTML = `<span><strong>${p.product}</strong> – ${p.type} – ${p.weight} × ${p.qty} شيكارة</span>
      <button onclick="removeProduct(${p.id})" class="text-red-600 font-bold text-lg">✕</button>`;
    selectedBox.appendChild(div);
    setTimeout(() => {
      div.classList.remove("scale-95", "opacity-0");
      div.classList.add("scale-100", "opacity-100");
    }, 10);
  });
  hiddenInput.value = products
    .map((p) => `${p.product} - ${p.type} - ${p.weight} × ${p.qty} شيكارة`)
    .join(" | ");
}

function removeProduct(id) {
  const el = [...selectedBox.children].find(
    (d) =>
      d.querySelector("button").getAttribute("onclick") ===
      `removeProduct(${id})`,
  );
  if (el) {
    el.classList.add("scale-90", "opacity-0");
    setTimeout(() => {
      products = products.filter((p) => p.id !== id);
      renderProducts();
    }, 200);
  }
}

// ===== WhatsApp button =====
const waBtn = document.getElementById("sendToWhatsApp");
if (waBtn) {
  waBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const date = document.querySelector('input[name="date"]').value;
    const time = document.querySelector('input[name="time"]').value;
    const business = document.querySelector('input[name="business"]').value;
    const notes = document.querySelector('textarea[name="notes"]').value;
    const productsText = hiddenInput.value || "لم يتم اختيار منتجات";

    const message = `طلب جديد من مطحن البراق:
👤 الاسم: ${name}
📧 الايميل: ${email}
📞 الهاتف: ${phone}
📅 يوم الاستلام: ${date}
⏰ الساعة: ${time}
🏭 نوع النشاط: ${business}
🛒 المنتجات: ${productsText}
📝 ملاحظات: ${notes}`;

    const waNumber = "201092301504"; // رقم الواتساب
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(waLink, "_blank");
  });
}
