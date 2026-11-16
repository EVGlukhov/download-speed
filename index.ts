const url = process.argv[2];

if (!url) {
  console.log("Вы не указали адрес");
  process.exit(1);
}

const REQUESTS_COUNT = 10;
const BITS_PER_BYTE = 8;
const BYTES_PER_MEGABYTE = 1_000_000;
const BITS_PER_MEGABIT = 1_000_000;
const MILLISECONDS_PER_SECOND = 1_000;

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

  const averageTime = totalTime / REQUESTS_COUNT;
  const downloaded = totalBytes / BYTES_PER_MEGABYTE;
  const seconds = totalTime / MILLISECONDS_PER_SECOND;
  const speed = (totalBytes * BITS_PER_BYTE) / seconds / BITS_PER_MEGABIT;

  console.log(`Среднее время запроса: ${averageTime.toFixed(2)} мс`);
  console.log(`Объём скачанных данных: ${downloaded.toFixed(2)} МБ`);
  console.log(`Скорость скачивания: ${speed.toFixed(2)} Мбит/с`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
