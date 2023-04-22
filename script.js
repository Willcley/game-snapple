window.onload = function() {
    let stage = document.getElementById('stage');
    let ctx = stage.getContext('2d');
    document.addEventListener('keydown', keyPush);
    setInterval(game, 120);

    const vel = 1;
    const lp = 20;
    const qpx = 40;
    const qpy = 30;

    let vx = 0;
    let vy = 0;
    let px = 10;
    let py = 15;
    let fruitx = 25;
    let fruity = 15;
    let fruitBox = ['red', 'yellow', 'red', 'purple'];
    let randomFruit = Math.floor(Math.random() * fruitBox.length);
    let fruit = fruitBox[randomFruit];

    let trail = [];
    let tail = 5;

    const infoPoint = document.getElementById('point');
    let point = 0;
    infoPoint.innerHTML = point;


    
    function game() {
        px += vx;
        py += vy;
        if (px < 0) {
            px = qpx - 1;
        }
        if (px > qpx - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qpy - 1;
        }
        if (py > qpy - 1) {
            py = 0;
        }


        ctx.fillStyle = '#002000';
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = fruit;
        ctx.fillRect(fruitx*lp, fruity*lp, lp, lp);

        ctx.fillStyle = 'green';
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*lp, trail[i].y*lp, lp, lp);
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;
                tail = 5;
                point = 0;
                infoPoint.innerHTML = point;
            }
        }

        trail.push({x:px, y:py});
        while (trail.length > tail) {
            trail.shift();
        }

        if (fruitx == px && fruity == py) {
            tail++;
            randomFruit = Math.floor(Math.random() * fruitBox.length);
            fruit = fruitBox[randomFruit];
            fruitx = Math.floor(Math.random()*qpx);
            fruity = Math.floor(Math.random()*qpy);
            point++;
            infoPoint.innerHTML = point;
        }
    }

    function keyPush(event) {
        switch(event.keyCode) {
            case 37: //Left
                vx = -vel;
                vy = 0;
                break;
            case 38: //Up
                vx = 0;
                vy = -vel;
                break;
            case 39: //Right
                vx = vel;
                vy = 0;
                break;
            case 40: //Down
                vx = 0;
                vy = vel;
                break;
        }
    }
}