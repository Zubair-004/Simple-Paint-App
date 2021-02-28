    var canvas = document.getElementById('canvas');
    var ctxt = canvas.getContext('2d');

    canvas.addEventListener('mousedown', dragStart);
    canvas.addEventListener('mousemove', drag);
    canvas.addEventListener('mouseup', dragStop);
    document.getElementById('clr').addEventListener('mousedown',function(){
        ctxt.clearRect(0, 0, canvas.width, canvas.height);
    });

var dragging = false,
    dragStartPoint,
    cpData;

function getCanvasCoordinates(e){
    var x = e.clientX - canvas.getBoundingClientRect().left,
        y = e.clientY - canvas.getBoundingClientRect().top;

    return {x:x, y:y};
}

function cp(){
    cpData = ctxt.getImageData(0, 0, canvas.width, canvas.height);
}

function paste(){
    ctxt.putImageData(cpData, 0, 0);
}

function drawTri(pos){
    var coords = [],
        angle = 100,
        sides = 3,
        i = 0,
        r = Math.sqrt(Math.pow((dragStartPoint.x-pos.x), 2)+ Math.pow((dragStartPoint.x-pos.x),2));

    for(i; i<sides; i++){
        coords.push({x: dragStartPoint.x + r*Math.cos(angle), y: dragStartPoint.y - r*Math.sin(angle)});
        angle+= (2*Math.PI) / sides;
    }
    
    ctxt.beginPath();
    ctxt.moveTo(coords[0].x,coords[0].y);
    for(i=1; i<sides; i++){
        ctxt.lineTo(coords[i].x, coords[i].y);
    }

    ctxt.closePath();
    ctxt.fill();
}

function randomColor(){
    var r = Math.round(Math.random()*256);
    var g = Math.round(Math.random()*256);
    var b = Math.round(Math.random()*256);

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function dragStart(e){
    dragging = true;
    dragStartPoint = getCanvasCoordinates(e);
    cp();
}

function drag(e){
    var pos;
    if( dragging === true){
        paste();
        pos = getCanvasCoordinates(e);
        ctxt.fillStyle = randomColor();
        drawTri(pos);
    }
}

function dragStop(e){
    dragging = false;
    paste();
    pos = getCanvasCoordinates(e);
    ctxt.fillStyle = randomColor();
    drawTri(pos);
}



