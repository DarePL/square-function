const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");
let a = document.getElementById("a").value;
let b = document.getElementById("b").value;
let c = document.getElementById("c").value;
let CANVAS_WIDTH = canvas.width = 500;
let CANVAS_HEIGHT = canvas.height = 500;
let x1, x2, delta, p, q;
let range = 100;
let rangex = CANVAS_WIDTH / range;
let rangey = CANVAS_HEIGHT / range;

ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
ctx.scale(rangex, rangey);
drawCanvas();


function drawCanvas() {
  for (let i = -100; i <= 100; i += 5) {
    ctx.lineWidth = 1 / 20;
    ctx.beginPath();
    ctx.moveTo(100, i);
    ctx.lineTo(-100, i);
    ctx.moveTo(2, i);
    ctx.lineTo(-2, i);
    ctx.closePath();
    ctx.stroke();
  }
  for (let i = -100; i <= 100; i += 5) {
    ctx.lineWidth = 1 / 20;
    ctx.beginPath();
    ctx.moveTo(i, -100);
    ctx.lineTo(i, 100);
    ctx.moveTo(i, -2);
    ctx.lineTo(i, 2);
    ctx.closePath();
    ctx.stroke();
  }
  for (let x = 0; x < 3; x++) {
    ctx.lineWidth = 1 / 10;
    ctx.beginPath();
    ctx.moveTo(-CANVAS_HEIGHT, 0);
    ctx.lineTo(CANVAS_WIDTH, 0);
    ctx.moveTo(0, -CANVAS_WIDTH);
    ctx.lineTo(0, CANVAS_HEIGHT);
    ctx.closePath();
    ctx.stroke();
  }


  ctx.fillStyle = "black";
  ctx.font = "3px Georgia";

  for (let i = -8; i < 9; i += 2) {
    if (i == 0) {
      continue;
    }
    ctx.fillText(i, (5 * i) - 1, 5);
    ctx.fillText(i, 2.5, 5 * -i + 1);
    ctx.save();
  }
}

function draw(a, b, c, p, q, x1, x2, color) {
  clear();
  drawCanvas();

  for (let x = -50; x <= 50; x += 1 / range / 10) {
    let parabola = ((parseFloat(-a * Math.pow(x, 2))) + (-b * x) - c);
    ctx.fillStyle = color;
    ctx.fillRect(x * rangex, parabola * rangey, 1 / rangex, 1 / rangey);
  }
  // ctx.fillRect(0 - 0.6, (-c * rangex) - 0.6, 6 / rangex, 6 / rangey);
  ctx.fillRect((p * rangex) - 0.6, (-q * rangex) - 0.6, 6 / rangex, 6 / rangey);
  ctx.fillRect((x1 * rangex) - 0.6, 0 - 0.6, 6 / rangex, 6 / rangey);
  ctx.fillRect((x2 * rangex) - 0.6, 0 - 0.6, 6 / rangex, 6 / rangey);
}

function clear() {
  ctx.clearRect(-50, -50, 100, 100);
}

function squareFunction() {
  a = document.getElementById("a").value;
  b = document.getElementById("b").value;
  c = document.getElementById("c").value;
  delta = (Math.pow(b, 2)) - 4 * a * c;
  p = Number(Math.round(-b / (2 * a) + 'e+2') + 'e-2');
  q = Number(Math.round((-(delta) / (4 * a)) + 'e+2') + 'e-2');
  x1 = Number(Math.round((-b - Math.pow(delta, 1 / 2)) / (2 * a) + 'e+2') + 'e-2');
  x2 = Number(Math.round((-b + Math.pow(delta, 1 / 2)) / (2 * a) + 'e+2') + 'e-2');
  let color = "rgb(225, 0, 0)";
  document.getElementById("results").innerHTML = "a: " + a + "<br>b: " + b + "<br>c: " + c + "<br>delta: " + delta + "<br>p: " + p + "<br>q: " + q + "<br>x1: " + x1 + "<br>x2: " + x2;
  draw(a, b, c, p, q, x1, x2, color);
}

function squareFunctionJava() {
  let a = document.getElementById("a").value;
  let b = document.getElementById("b").value;
  let c = document.getElementById("c").value;
  console.log(a + " " + b + "" + c);


  $("#results").html('');

  let url = "http://localhost:8080/math/squareFunction?a=" + a + "&b=" + b + "&c=" + c;
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: url,
    success: function (data) {
      resultsJava(data);
      console.log(data);
    },
    error: function () {
      document.getElementById("results").innerHTML = "<br><br>Brak połączenia z API";
    }
  });

}

function resultsJava(api) {
  a = api.a;
  b = api.b;
  c = api.c;
  delta = api.delta;
  if (api.p == 0 && a == 0) {
    p = NaN;
  }
  else {
    p = api.p
  };
  if (api.q == 0 && a == 0) {
    q = NaN;
  }
  else {
    q = api.q
  };
  if (api.x1 == 0) {
    x1 = NaN;
  }
  else {
    x1 = api.x1
  };
  if (api.x2 == 0) {
    x2 = NaN;
  }
  else {
    x2 = api.x2
  };
  let color = "rgb(0, 255, 0)";
  document.getElementById("results").innerHTML = "a: " + a + "<br>b: " + b + "<br>c: " + c + "<br>delta: " + delta + "<br>p: " + p + "<br>q: " + q + "<br>x1: " + x1 + "<br>x2: " + x2;
  draw(a, b, c, p, q, x1, x2, color);
}


