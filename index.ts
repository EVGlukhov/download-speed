const url = process.argv[2];

if (!url) {
  console.log("Укажи адрес");
  process.exit(1);
}

const REQUESTS_COUNT = 10;

async function main() {
  let totalDownloadedBytes = 0;
  let totalTime = 0;

  for (let i = 1; i <= 10; i++) {
    const startedAt = performance.now();
    const response = await fetch(url);

    let downloadedBytes = 0;
    if (response.body) {
      for await (const chunk of response.body) {
        downloadedBytes += chunk.byteLength;
      }
    }

    totalTime += performance.now() - startedAt;
  }
}
