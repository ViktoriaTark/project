let map = new Map([
    [1, 500],
    ["2", "222"],
    [true,  false]
  ]);
  for(let elem of map){    
  console.log(`Ключ — ${elem[0]}, значение — ${elem[1]}`);    
  }