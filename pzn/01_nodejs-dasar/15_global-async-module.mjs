function samplePromise(){
  return Promise.resolve("Brodi");
}
// kalau js module (mjs), secara default code paling atas adalah async function

const name = await samplePromise();
console.info(name);