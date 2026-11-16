const url = process.argv[2];

if (!url) {
  console.log("Укажи адрес");
  process.exit(1);
}

const REQUESTS_COUNT = 10;

async function main() {
  let totalBytes = 0;
  let totalTime = 0;

  for (let i = 1; i <= REQUESTS_COUNT; i++) {
    const startedAt = performance.now();
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Произошла ошибка при загрузке");
    }

    if (response.body) {
      for await (const chunk of response.body) {
        totalBytes += chunk.byteLength;
      }
    }

    totalTime += performance.now() - startedAt;
  }

  const seconds = totalTime / 1000;
  const mbps = (totalBytes * 8) / seconds / 1_000_000;

  console.log(`Среднее время запроса: ${totalTime / REQUESTS_COUNT} мс`);
  console.log(`Объём скачанных данных: ${totalBytes} байт`);
  console.log(`Скорость скачивания: ${mbps} Мбит/с`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
