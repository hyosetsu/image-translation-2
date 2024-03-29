async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("ファイルを選択してください");
    return;
  }

  const worker = Tesseract.createWorker();
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(file);
  await worker.terminate();

  document.getElementById("extractedText").textContent = text;
  document.getElementById("results").style.display = "block";

  // 翻訳
  const translatedText = await translateText(text);
  document.getElementById("translatedText").textContent = translatedText;
}

async function translateText(text) {
  const apiKey = "3d7e3da4-defa-46ed-9592-4a909a08c449:fx";
  const response = await fetch(
    `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(
      text
    )}&target_lang=JA`
  );
  const data = await response.json();
  return data.translations[0].text;
}
