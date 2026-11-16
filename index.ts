const url = process.argv[2];

if (!url) {
  console.log("Укажи адрес");
  process.exit(1);
}

console.log("Адрес", url);
