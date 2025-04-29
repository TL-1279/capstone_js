// Mảng giỏ hàng
const cart = [];

// Hàm thêm sản phẩm vào giỏ
const addToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  if (product) {
    const cartItem = {
      id: product.id,
      name: product.name,
      quantity: 1 // Mặc định mỗi lần thêm là 1 sản phẩm
    };
    // Kiểm tra nếu sản phẩm đã có trong giỏ thì tăng số lượng
    const existingItem = cart.find(item => item.id === cartItem.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(cartItem);
    }
    console.log(cart);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  }
};
