const fs = require('fs');
const { promisify } = require('util');
const toIco = require('to-ico');
const glob = require('glob-fs')();

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function go() {
  console.log('Starting the Conversion...');
  const files = await glob.readdirPromise('./images/*.png');
  const promises = files.map(path => readFile(path));
  const data = await Promise.all(promises);
  const iconBuffers = await Promise.all(data.map(buf => toIco(buf)));
  const filePromises = iconBuffers.map((buf, i) => {
    const filename = files[i]
      .split('/')
      .pop()
      .replace('.png', '.ico');

    return writeFile(`./icons 👈🏼 ( YOU NEED THESE )/${filename}`, buf);
  });
  await Promise.all(filePromises);
  console.log('Done! 👯🏻‍♂️');
}

go().catch(console.error);
