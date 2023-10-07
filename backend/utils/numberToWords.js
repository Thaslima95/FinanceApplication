function numberToWords(number) {
  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function convertChunk(chunk) {
    let words = "";
    if (chunk >= 100) {
      words += units[Math.floor(chunk / 100)] + " hundred ";
      chunk %= 100;
    }
    if (chunk >= 11 && chunk <= 19) {
      words += teens[chunk - 10] + " ";
    } else if (chunk >= 10) {
      words += tens[Math.floor(chunk / 10)] + " ";
      chunk %= 10;
    }
    if (chunk >= 1 && chunk <= 10) {
      words += units[chunk] + " ";
    }

    return words;
  }

  if (number == 0) {
    return "zero";
  }

  let result = "";
  let chunkCount = 0;
  while (number > 0) {
    const chunk = number % 1000;
    if (chunk > 0) {
      result =
        convertChunk(chunk) +
        ["", "thousand", "million", "billion"][chunkCount] +
        " " +
        result;
    }

    number = Math.floor(number / 1000);

    chunkCount++;
  }

  result = result
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("  ");

  return result;
}

module.exports = numberToWords;
