
const filterProducts = () => {
  const selectedType = document.getElementById('filterType').value;

  if (selectedType === "all") {
    renderProducts(products);
  } else {
    const filtered = products.filter(product => product.type === selectedType);
    renderProducts(filtered);
  }
};

renderProducts(products);
