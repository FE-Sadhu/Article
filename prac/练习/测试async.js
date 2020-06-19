function a(i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(i)
    }, 1000)
  })
}

async function b() {
  var j1 = await a(1)
  var j2 = await a(2)
  return j1 + j2;
}

b().then(v => console.log(v))