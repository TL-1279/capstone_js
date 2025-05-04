// Sử dụng let cho cart để có thể thay đổi giá trị
let cart = [];

// Hàm thêm sản phẩm vào giỏ hàng
document.addEventListener("DOMContentLoaded", () => {
  // Lắng nghe sự kiện click của các nút "Thêm vào giỏ"
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
      // Lấy id của sản phẩm từ thuộc tính data-product-id của phần tử cha
      const productId = parseInt(button.closest('.product-card').getAttribute('data-product-id'));
      addToCart(productId); 
    });
  });
});

// Hàm thêm sản phẩm vào giỏ
const addToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newCartItem = {
      productId: product.id,
      name: product.name,
      quantity: 1,
    };
    cart.push(newCartItem);
  }

  renderCart();
};


// Hàm render giỏ hàng
const renderCart = () => {
  const cartTableBody = document.querySelector('#cartTable tbody');
  cartTableBody.innerHTML = '';  // Xóa giỏ hàng hiện tại

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = `
      <tr>
        <td><img src="${item.imageUrl}" alt="${item.name}" width="50"></td>
        <td>${item.name}</td>
        <td>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-1" onclick="changeQuantity(${item.productId}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary ms-1" onclick="changeQuantity(${item.productId}, 1)">+</button>
          </div>
        </td>
        <td>₫${itemTotal.toLocaleString()}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.productId})">Xóa</button>
        </td>
      </tr>
    `;
    cartTableBody.insertAdjacentHTML('beforeend', row);
  });

  const totalRow = `
    <tr>
      <td colspan="3" class="text-end fw-bold">Tổng cộng:</td>
      <td colspan="2" class="fw-bold">₫${total.toLocaleString()}</td>
    </tr>
    <tr>
      <td colspan="5" class="text-end">
        <button class="btn btn-success" onclick="checkout()">Thanh toán</button>
      </td>
    </tr>
  `;
  cartTableBody.insertAdjacentHTML('beforeend', totalRow);

  // Cập nhật giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Hàm thay đổi số lượng sản phẩm trong giỏ
const changeQuantity = (productId, delta) => {
  const item = cart.find(item => item.productId === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  }
  renderCart();
};

// Hàm xóa sản phẩm khỏi giỏ
const removeFromCart = (productId) => {
  const index = cart.findIndex(item => item.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    renderCart();
  }
};

// Hàm thanh toán
const checkout = () => {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }

  if (confirm("Bạn có chắc chắn muốn thanh toán không?")) {
    cart.length = 0; // Xóa giỏ hàng sau khi thanh toán
    localStorage.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage
    renderCart();
    alert("Thanh toán thành công!");
  }
};

// Hàm load giỏ hàng khi trang load
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) cart.push(...parsedCart);
    } catch (e) {
      console.error("Lỗi khi đọc giỏ hàng từ localStorage", e);
    }
  }

  renderCart(); // Hiển thị giỏ hàng từ localStorage

  // Gắn sự kiện cho tab buttons
  const tabButtons = document.querySelectorAll(".tab-button");
  if (tabButtons.length === 0) return;
  const cartTab = document.getElementById("cartTab");
  const loginTab = document.getElementById("loginTab");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const tab = button.getAttribute("data-tab");

      cartTab?.style.display = "none";
      loginTab?.style.display = "none";

      if (tab === "cart") {
        cartTab?.style.display = "block";
      } else if (tab === "login") {
        loginTab?.style.display = "block";
      }
    });
  });
});

