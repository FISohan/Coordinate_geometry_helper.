const canvas = document.getElementById("canvas")
const inputPoint = document.getElementById("point")
const c = canvas.getContext('2d')
const shapeInfo = document.getElementById("shapeInfo")
const pointName = document.getElementById("pointName");
var padding = 15;
var isInput = false;

canvas.height = (window.innerHeight / 2) + (padding - ((window.innerHeight / 2) % padding))
canvas.width = window.innerWidth

var h = canvas.clientHeight
var w = canvas.clientWidth
//distance Between two points
var distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
var distances = []
//initialize X,Y coods functions
var Y = y => ((h / 2) - y * padding);
var X = x => ((w / 2) + x * padding);

var alfa = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
/*
 
*/
var slope = (x1,y1,x2,y2)=>(y2-y1)/(x2-x1)

//The points array
var points = [
  { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
  { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
  { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) }
  ]
// pythagorean triples director 
function isDjPythagoras(arr) {
  if (arr.length === 3) {
    arr.sort()
    if (Math.round(Math.pow(arr[2], 2)) === Math.round(Math.pow(arr[1], 2) + Math.pow(arr[0], 2))) {
      return true;
    } else {
      return false;
    }

  }
}

//count the equality in array 
function countEqual(arr) {
  var count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        count++;
      }
    }
  }
  return count;
}
//area ditermine function 
function area(points) {
  var blah1 = points[points.length - 1].x * points[0].y
  var blah2 = points[points.length - 1].y * points[0].x
  var sum1 = blah1;
  var sum2 = blah2;
  for (var i = 0; i < points.length - 1; i++) {
    sum1 += points[i].x * points[i + 1].y
    sum2 += points[i].y * points[i + 1].x
  }
  return Math.abs((sum1 + (-sum2)) * 0.5);
}
// Triangle type defector 

function triangleDetector() {

  if (countEqual(distances) === 2) {
    return "সমবাহু ত্রিভুজ (Equilateral Triangle)"
  } else if (countEqual(distances) === 1 && isDjPythagoras(distances) === false) {
    return "সমদ্বিবাহু ত্রিভুজ (Isosceles triangle)"
  } else if (isDjPythagoras(distances) && countEqual(distances) != 1) {
    return "সমকোণী  ত্রিভুজ (Right Triangle)"
  } else if (isDjPythagoras(distances) && countEqual(distances) == 1) {
    return "সমকোণী সমদ্বিবাহু ত্রিভুজ"
  }
  else if (!isDjPythagoras(distances)) {
    return "বিষম বাহু(acute Triangle)"
  }
}

function rectDetector() {
  if (points.length == 4) {
    var ac = distance(points[0].x, points[0].y, points[2].x, points[2].y)
    var bd = distance(points[1].x, points[1].y, points[3].x, points[3].y)
    if (ac == bd && countEqual(distances) == 6) {
      return "Square";
    } else if (ac != bd && countEqual(distances) == 6) {
      return "Rhombus";
    }
    if (ac == bd && countEqual(distances) == 2) {
      return "Rectangle"
    } else if (ac != bd && countEqual(distances) == 2) {
      return "Parallelogram"
    }
    return "Quadrangle"
  }
}

//shape director functionalities 
function shapeDitector() {
  var isTrueShape = area(points) != 0
  //console.log(points.length);
  if (points.length == 0) {
    output('name', "😋")
    output('area', '😛')
  }
  else if (points.length == 1 && !isTrueShape) {
    output('name', 'It’s a point!!')
    output('area', '😛')
  } else if (points.length == 2 && !isTrueShape) {
    output('name', 'It’s a Line')
    output('area', '😛')
  } else if (points.length == 3 && isTrueShape) {
    output('name', triangleDetector())
    output('area', area(points))
  } else if (points.length == 4 && isTrueShape) {
    output('name', rectDetector())
    output('area', area(points))
  } else if (isTrueShape) {
    output('name', "Polygon")
    output('area', area(points))
  }
}
//show the output
function output(id, data) {
  document.getElementById(`${id}`).innerHTML = `<i style="color:#FFF5EE;font-size:20px">${data}</i>`
}
//fill distance between points
function setDistances() {
  for (var i = 1; i < points.length; i++) {
    distances.push(distance(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y))
  }
}
//text and dot fuctions
function initOutput(){
  output("distance", `Enter point name ☺️`)
  output("slope", `Enter point name 😉`)
  output('angle','Enter point name 😉')
  output('equation','Enter point name 😉')
}
function drawText(x, y, s) {
  c.fillText(`${s}(${(x-(w/2))/padding} ${((h/2)-y)/padding})`, x + 5, y + 5, 50)
  c.fillStyle = '#DE3163'
  c.fill()
}

function drawPoint(x, y) {
  c.beginPath()
  c.arc(x, y, 2, 0, Math.PI * 2, false)
  c.fillStyle = '#DE3163'
  c.fill()
  c.closePath()
}
//draw line to make shape
function drawLine() {
  c.beginPath()
  for (var i = 0; i < points.length; i++) {
    c.lineTo(X(points[i].x), Y(points[i].y))
  }
  c.closePath()
  c.stroke()

}
//draw dot and text
function implementDrawPoint() {
  for (var i = 0; i < points.length; i++) {
    drawPoint(X(points[i].x), Y(points[i].y))
    drawText(X(points[i].x), Y(points[i].y), alfa[i])
  }
}
// draw the graph
function drawGraph(padding) {

  c.beginPath()

  for (let i = 0; i < w; i = i + padding) {
    c.moveTo(i, 0)
    c.lineTo(i, h)
  }
  for (let i = 0; i < h; i = i + padding) {
    c.moveTo(0, i)
    c.lineTo(w, i)
  }

  c.lineWidth = 0.3
  c.strokeStyle = 'gray'
  c.stroke()
  c.closePath()
}
//draw X'OX and Y'OY axis
function drawXYAxis() {
  c.beginPath()
  c.moveTo(w / 2, 0);
  c.lineTo(w / 2, h)

  c.moveTo(0, h / 2);
  c.lineTo(w, h / 2)

  c.lineWidth = 1
  c.strokeStyle = "black",
    c.stroke()
}
//add value to ponts array and update
function addPoint(point) {
  points.push({
    x: parseFloat(point[0]),
    y: parseFloat(point[1])
  })
  //push distance while two more points available 
  if (points.length >= 2) {
    distances = [];
    setDistances();
    distances.push(distance(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y))
  }
  shapeDitector()
  triangleDetector()
}
//erase the canvas
function clearCanvas() {
  c.clearRect(0, 0, w, h)
}
//call the functions
function implementDraw() {
  clearCanvas()
  drawGraph(padding)
  drawXYAxis()
  drawLine()
  implementDrawPoint()
}
//initialization 
function init() {
  clearCanvas()
  drawGraph(padding)
  drawXYAxis()
 pointName.value = ''
 initOutput()
 // setValue(pointName.value.split(''))
  points = []
  document.getElementById('point').removeAttribute('disabled')
  document.getElementById('point').setAttribute('placeholder', ' Enter x1 y1 x2 y2...😊')
  shapeDitector()
  

}
//input and  add  point to points array
function add() {
  var point = inputPoint.value.split(' ');

  if (point.length == 3) {

    addPoint(point)
    point = []
    inputPoint.value = null
    implementDraw()
  }
}

inputPoint.addEventListener('input', () => {
  add();
  pointName.value = ''
  setValue(pointName.value.split(''))
})
//UNDO functionality 
function undo() {
  points.pop()
  implementDraw()
  shapeDitector()
}

function setValue(value) {
  var index1 = alfa.findIndex(c => c == value[0])
  var index2 = alfa.findIndex(c => c == value[1])
  output("distance", `${distance(points[index1].x,points[index1].y,points[index2].x,points[index2].y)}`)
  output("slope", `${slope(points[index1].x,points[index1].y,points[index2].x,points[index2].y)}`)
  output('angle', Math.atan( slope(points[index1].x,points[index1].y,points[index2].x,points[index2].y))*180/Math.PI)
  var xxx =points[index1].y - slope(points[index1].x,points[index1].y,points[index2].x,points[index2].y)*points[index1].x
  if (xxx>0) {
    output('equation',`y = ${slope(points[index1].x,points[index1].y,points[index2].x,points[index2].y)}x+${xxx}`)
  } else {
    
  
  output('equation',`y = ${slope(points[index1].x,points[index1].y,points[index2].x,points[index2].y)}x${xxx}`)
  }
}
pointName.addEventListener('input', (e) => {
  pointName.value = pointName.value.toUpperCase()
 
 // if (pointName.value.length == 2) {
    setValue(pointName.value.split(''))
  //}
  
})

// initialization when window load
window.onload = () => {
  initOutput()
  drawGraph(padding)
  drawXYAxis()
  drawLine()
  implementDrawPoint()
  shapeDitector()
}