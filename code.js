var snake_area = document.querySelector("#snake_area");
var height = 14, width = 14; //wymiary planszy
var snake_x = Math.floor(height/2), snake_y = Math.floor(width/2); // położenie głowy węża
var snake_lenght = 2; //długość węża
var snake_mv = Array(height); //informacja dla JS gdzie jest reszta węża
var direction = "right";
var gradient;
var apple_x, apple_y, apple_count = 0;
var time = 150;
var score = document.querySelector("#score");
score.innerHTML = "Wynik: " + (snake_lenght-2);
var width_height = 20;

snake_area.style.border = "1px solid black";
for(let x = 0; x < height; x++)
{
    snake_mv[x] = Array(width);
    snake_mv[x].fill(0);
}

snake_mv[snake_x][snake_y] = snake_lenght;

function size_remove(event)
{
    document.querySelector("#snake_area").remove();
    let snake = document.querySelector("#snake");
    snake_area = document.createElement("table");
    snake.appendChild(snake_area);
    snake_area.id = "snake_area";
    snake_area.style.border = "1px solid black"
    let key = event.currentTarget.id;

    if(key == "size_plus")
    {
        width_height += 1;
    }
    else if(key == "size_minus")
    {
        width_height -= 1;
    }
    
    size();
}

function size()
{
    snake_area.style.backgroundColor = 'rgb('+255+','+255+','+255+','+0.5+')';
    snake_area.style.border = "2px solid black";
    for(let x = 0; x < height; x++)
    {
        var tr = document.createElement("tr");
        snake_area.appendChild(tr);
        for(let y = 0; y < width; y++)
        {
            var td = document.createElement("td");
            td.style.padding = "0px";
            td.style.margin = "0px";
            td.style.width = width_height + "px";
            td.style.height = width_height + "px";
            td.setAttribute("column", x);
            td.setAttribute("row", y);
            tr.appendChild(td);
        }
    }   
}

function movement()
{
    gradient = -1/((((snake_lenght/2)+1.5)/2)-1);

    for(let x = 0; x < height; x++)
    {
        for(let y = 0; y < width; y++)
        {
            // let c3 = 255*Math.max(0,Math.min(1,(gradient*Math.abs(snake_mv[x][y]-1)+2)));
            // let c2 = 255*Math.max(0,Math.min(1,(gradient*Math.abs(snake_mv[x][y]-snake_lenght/2+0,5)+2)));
            // let c1 = 255*Math.max(0,Math.min(1,(gradient*Math.abs(snake_mv[x][y]-snake_lenght)+2)));
            if(snake_mv[x][y] == 'a')
            {
                document.querySelector(`td[column="${x}"][row="${y}"]`).style.backgroundColor = 'rgb('+0+','+0+','+0+')';
            }
            else if(snake_mv[x][y] <= snake_lenght && snake_mv[x][y] != 0)
            {
                document.querySelector(`td[column="${x}"][row="${y}"]`).style.backgroundColor = 'rgb('+255*Math.max(0,Math.min(1,(gradient*Math.abs(snake_mv[x][y]-snake_lenght/2+0,5)+2)))+',\
                '+255*Math.max(0,Math.min(1,(gradient*Math.abs(snake_mv[x][y]-1)+2)))+',\
                '+255*Math.max(0,Math.min(1,(gradient*Math.abs(snake_mv[x][y]-snake_lenght)+2)))+')';
            }
            else if(snake_mv[x][y] == 0)
            {
                document.querySelector(`td[column="${x}"][row="${y}"]`).style.backgroundColor = 'rgb('+255+','+255+','+255+','+0+')';
            }
        }
    }

    for(let x = 0; x < height; x++)
    {
        for(let y = 0; y < width; y++)
        {
            if(snake_mv[x][y] != 0 && snake_mv[x][y] != 'a')
            {
                snake_mv[x][y] -= 1;
            }
        }
    }

    if(direction == "up")
    {
        snake_x -= 1;
    }
    else if(direction == "right")
    {
        snake_y += 1;
    }
    else if(direction == "down")
    {
        snake_x += 1;
    }
    else if(direction == "left")
    {
        snake_y -= 1;
    }
    
    if(snake_x == height)
    {
        snake_x = 0;
    }
    else if(snake_x < 0)
    {
        snake_x = height-1;
    }

    if(snake_y == width)
    {
        snake_y = 0;
    }
    else if(snake_y < 0)
    {
        snake_y = width-1;
    }
    
    if(snake_mv[snake_x][snake_y] == 0)
    {
        snake_mv[snake_x][snake_y] = snake_lenght;
    }
    else if(snake_mv[snake_x][snake_y] == 'a')
    {
        snake_lenght += 1;
        apple_count -= 1;
        snake_mv[snake_x][snake_y] = snake_lenght;
        score.innerHTML = "Wynik: " + (snake_lenght-2);
    }
    else if(snake_mv[snake_x][snake_y] > 0 && snake_mv[snake_x][snake_y] <= snake_lenght)
    {
        direction = undefined;
        score.innerHTML = "GAME OVER, zakończyłeś grę z wynikiem: " + (snake_lenght-5);
    }
}

function apple_drowing()
{
    if(apple_count < 3 && direction != undefined)
    {
        while(true)
        {
            apple_x = Math.round(Math.random()*height);
            apple_y = Math.round(Math.random()*width);
            if(snake_mv[apple_x][apple_y] == 0)
            {
                apple_count += 1;
                break;
            }
        }
        
        snake_mv[apple_x][apple_y] = 'a';
    }
}

function key_listener(event)
{
    let key = event.keyCode;
    if(direction !== undefined && key == 37 && direction != "right" && snake_mv[snake_x][snake_y-1] != snake_lenght-1)
    {
        direction = "left";
    }
    else if(direction !== undefined && key == 38 && direction != "down" && snake_mv[snake_x-1][snake_y] != snake_lenght-1)
    {
        direction = "up";
    }
    else if(direction !== undefined && key == 39 && direction != "left" && snake_mv[snake_x][snake_y+1] != snake_lenght-1)
    {
        direction = "right";
    }
    else if(direction !== undefined && key == 40 && direction != "up" && snake_mv[snake_x+1][snake_y] != snake_lenght-1)
    {
        direction = "down";
    }
}

function restart()
{
    for(let x = 0; x < height; x++)
    {
        snake_mv[x].fill(0);
    }
    direction = 'up';
    snake_lenght = 2;
    score.innerHTML = "Wynik: " + (snake_lenght-2);
    apple_count = 0;
}

size();
var interval = setInterval(movement, time);

var apple = setInterval(apple_drowing, (20+Math.random()*10)*time);
document.addEventListener("keydown", key_listener);

var restart_button = document.querySelector("#restart");
restart_button.addEventListener("click", restart);

var size_plus = document.querySelector("#size_plus");
size_plus.addEventListener("click", size_remove);

var size_minus = document.querySelector("#size_minus");
size_minus.addEventListener("click", size_remove);

