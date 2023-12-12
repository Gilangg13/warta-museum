// make sharp
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");
const destinstion = path.resolve(__dirname, "dist/images");

if (!fs.existsSync(destinstion)) {
  fs.mkdirSync(destinstion);
}

fs.readdirSync(target).forEach((image) => {
  // mengubah gambar dengan lebar 650px, dengan prefix -large.png
  sharp(`${target}/${image}`)
    .resize(650)
    .toFile(
      path.resolve(
        __dirname,
        `${destinstion}/${image.split(".").slice(0, -1).join(".")}-large.png`
      )
    );

  // mengubah gambar dengan lebar 550px, dengan prefix -medium.png
  sharp(`${target}/${image}`)
    .resize(550)
    .toFile(
      path.resolve(
        __dirname,
        `${destinstion}/${image.split(".").slice(0, -1).join(".")}-medium.png`
      )
    );

  // mengubah gambar dengan lebar 500px, dengan prefix -small.png
  sharp(`${target}/${image}`)
    .resize(500)
    .toFile(
      path.resolve(
        __dirname,
        `${destinstion}/${image.split(".").slice(0, -1).join(".")}-small.png`
      )
    );
});
