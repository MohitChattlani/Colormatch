var canvas=document.getElementById('mycanvas');
	//pen comes with canvas
	var scoredis=document.getElementById('score');
	var level0=document.getElementById('level0');
	var level1=document.getElementById('level1');
	var level2=document.getElementById('level2');
	var level3=document.getElementById('level3');
	var pen=canvas.getContext('2d');
	function init()
	{
		score=0;
		pos=40;
		colors={0:"red",1:"blue",2:"green",3:"yellow",4:"orange"};
		GAME_WIDTH=700;
		GAME_HEIGHT=550;
		GAME_IS_RUNNING='true';
		player={
			x: 40 ,
			y: 275 ,
			w: 10,
			h: 10,
			speedx : 2 ,
			color: "yellow" ,
			playing: false
		};
		enemy1={
			x:180 ,
			y:0 ,
			w:10 ,
			speedy:3 ,
			color: "red" ,
			h: 130
		};
		enemy2={
			x:360,
			y:420,
			w:10 ,
			speedy:3 ,
			color: "green" ,
			h: 130
		};
		enemy3={
			x: 540,
			y:0 ,
			w:10 ,
			speedy:3 ,
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
		if (iscolliding(player,enemy1))
		{
			scoredis.innerHTML="<h3>Game Over</h3> Score:"+ score+"<br>Refresh to Play Again";
			GAME_IS_RUNNING=false;
		}
		if (iscolliding(player,enemy2))
		{
			scoredis.innerHTML="<h3>Game Over</h3> Score:"+ score+"<br>Refresh to Play Again";
			GAME_IS_RUNNING=false;
		}
		if (iscolliding(player,enemy3))
		{
			scoredis.innerHTML="<h3>Game Over</h3> Score:"+ score+"<br>Refresh to Play Again";
			GAME_IS_RUNNING=false;
		}
		//level 0
		level0.onclick=function(){
			enemy1.speedy=5;
			enemy2.speedy=5;
			enemy3.speedy=5;
			player.speedx=5;
			restart();
			console.log(enemy1.speedy);
		};
		//level 1 
		level1.onclick=function(){
			enemy1.speedy=10;
			enemy2.speedy=5;
			enemy3.speedy=10;
			player.speedx=5;
			restart();
			console.log(enemy1.speedy);
		};
		level2.onclick=function(){
			enemy1.speedy=10;
			enemy2.speedy=10;
			enemy3.speedy=5;
			player.speedx=5;
			restart();
			console.log(enemy1.speedy);
		};
		level3.onclick=function(){
			enemy1.speedy=10;
			enemy2.speedy=10;
			enemy3.speedy=10;
			player.speedx=10;
			restart();
		};
	}
	function iscolliding(r1,r2)
	{
		X=r1.x+r1.w;
		Y=r1.y+r1.h;
		cond1= (X>r2.x && X<r2.x+20); // 2 times width
		cond2= (Y>r2.y && Y<r2.y+140) || (r1.y>r2.y+r2.h && r1.y<r2.y); // height(enemy+player)
		cond3=r1.color!=r2.color;
		if (r1.speedx>0)
		{
			if (r2.x+r2.w==r1.x && r1.x!=pos)
			{	
				//noting the position of player when he crosses obstacle 
				//so that it cannot be used again (score does not inc on same pos)
				pos=r1.x;
				score=score+1;
				scoredis.innerHTML="Score:"+ score;
			}
		}
		//player coming from the reverse end
		else if (r1.speedx<0)
		{
			if (r1.x+r1.w==r2.x && r1.x!=pos)
			{
				pos=r1.x;
				score=score+1;
				scoredis.innerHTML="Score:"+ score;
			}
		}
		return cond1 && cond2 && cond3;
	}
	function restart()
	{
		score=0;
		player.x=40;
		scoredis.innerHTML="Score:"+ score;
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