var canvas=document.getElementById('mycanvas');
	//pen comes with canvas
	var scoredis=document.getElementById('score');
	var pen=canvas.getContext('2d');
	function init()
	{
		score=0;
		colors={0:"red",1:"blue",2:"green",3:"yellow",4:"orange"};
		GAME_WIDTH=700;
		GAME_HEIGHT=550;
		GAME_IS_RUNNING='true';
		player={
			x: 40 ,
			y: 275 ,
			w: 10,
			h: 10,
			speedx : 5 ,
			color: "yellow" ,
			playing: false
		};
		enemy1={
			x:180 ,
			y:0 ,
			w:10 ,
			speedy:5 ,
			color: "red" ,
			h: 130
		};
		enemy2={
			x:360,
			y:420,
			w:10 ,
			speedy:5 ,
			color: "green" ,
			h: 130
		};
		enemy3={
			x: 540,
			y:0 ,
			w:10 ,
			speedy:5 ,
			color: "blue" ,
			h: 130
		};
		canvas.addEventListener('mousedown',function(event){
			player.playing=true;
		});
		canvas.addEventListener('mouseup',function(event){
			player.playing=false;
		});
	}
	function draw()
	{
		//clear old frame
		pen.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
		pen.fillStyle=player.color;
		pen.fillRect(player.x,player.y,player.w,player.h);
		pen.fillStyle=enemy1.color;
		pen.fillRect(enemy1.x,enemy1.y,enemy1.w,enemy1.h);
		pen.fillStyle=enemy2.color;
		pen.fillRect(enemy2.x,enemy2.y,enemy2.w,enemy2.h);
		pen.fillStyle=enemy3.color;
		pen.fillRect(enemy3.x,enemy3.y,enemy3.w,enemy3.h);
	}
	function update()
	{
		if (player.playing==true)
		{
			player.x+=player.speedx;
		}
		if (enemy1.y<0 || enemy1.y+enemy1.h>=GAME_HEIGHT)
		{
			enemy1.speedy=-enemy1.speedy;
			enemy1.color=randomcolor();
		}
		enemy1.y+=enemy1.speedy;
		if (enemy2.y<0 || enemy2.y+enemy2.h>GAME_HEIGHT)
		{
			enemy2.speedy=-enemy2.speedy;
			enemy2.color=randomcolor();
		}
		enemy2.y+=enemy2.speedy;
		if (enemy3.y<0 || enemy3.y+enemy3.h>GAME_HEIGHT)
		{
			enemy3.speedy=-enemy3.speedy;
			enemy3.color=randomcolor();
		}
		enemy3.y+=enemy3.speedy;
		if (player.x>=GAME_WIDTH || player.x<=0)
		{
			player.speedx=-player.speedx;
			player.color=randomcolor();
		}
		if (player.x==GAME_WIDTH)
		{
			score=score-1;
		}
		if (player.x==0) 
		{
			score=score+1;
		}
		if (iscolliding(player,enemy1))
		{
			scoredis.innerHTML="Game Over<br>Score:"+ score;
			GAME_IS_RUNNING=false;
		}
		if (iscolliding(player,enemy2))
		{
			scoredis.innerHTML="Game Over<br>Score:"+ score;
			GAME_IS_RUNNING=false;
		}
		if (iscolliding(player,enemy3))
		{
			scoredis.innerHTML="Game Over<br>Score:"+ score;
			GAME_IS_RUNNING=false;
		}
	}
	function iscolliding(r1,r2)
	{
		X=r1.x+r1.w;
		Y=r1.y+r1.h;
		cond1= (X>r2.x && X<r2.x+20); // 2 times width
		cond2= (Y>r2.y && Y<r2.y+140) || (r1.y>r2.y+r2.h && r1.y<r2.y); // height(enemy+player)
		cond3=r1.color!=r2.color;
		if (r2.x+r2.w==r1.x)
		{
			score=score+1;
		}
		return cond1 && cond2 && cond3;
	}
	function randomcolor()
	{
		number=Math.ceil(Math.random()*4);
		color=colors[number];
		return color;
	}
	//game loop
	function render()
	{
		draw();
		update();
		console.log("In render");
		//calls render a lot of time, not a thing like recursion no memory linked
		if (GAME_IS_RUNNING)
		{
			window.requestAnimationFrame(render);
		}
	}
	init();
	render();