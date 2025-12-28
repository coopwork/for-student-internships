function delay(minDelay, maxDelay) {
  const randomDelay =
    Math.random() * (maxDelay - minDelay) + minDelay;

  return new Promise((resolve) => {
    setTimeout(resolve, randomDelay);
  });
};

export async function fetchProducts() {
  const response =
    await
      fetch('../assets/data/products.json')
        .then(response => response.json());

  // Небольшая задержка для имитации реального сервера
  await delay(500, 2000);

  return response;
};