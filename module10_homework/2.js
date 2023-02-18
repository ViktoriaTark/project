let x;

x = null;
// x = true;
// x = "true";
// x = 0;

message = (typeof x === "number") ? 'x — число' : '';
message = (typeof x === "string") ? 'x — строка' : '';
message = (typeof x === "boolean") ? 'x — булево' : '';
message = (message) ? message : 'Тип x не определён';

console.log(message);