ig.module
( 
	'game.main' 
)
.requires
(
//	'impact.debug.debug',
	'impact.game',
	'impact.font',
	'game.menu',
	'game.intro',
	'game.game',
	'game.gameover',
	'game.gamewon',
	'game.credits'
)
.defines(function()
{	
	window.RUN_AS_APP = true; // !!window.require;

	if (window.RUN_AS_APP)
	{
		var gui = require('nw.gui');
		window.win = gui.Window.get();
	}

	global =
	{
		score: 0,

		WIDTH: 320,
		HEIGHT: 240,
		MAX_WIDTH: 1920,
		MAX_HEIGHT: 1200,
		SCALE: 3,

		calc_scale: function()
		{
			var W = Math.max(global.WIDTH, Math.min(global.MAX_WIDTH, window.innerWidth));
			var H = Math.max(global.HEIGHT, Math.min(global.MAX_HEIGHT, window.innerHeight));
			global.SCALE = Math.min(Math.floor(W / global.WIDTH), Math.floor(H / global.HEIGHT));
		},
	};

	LD27 = ig.Game.extend(
	{
		music: new ig.Sound('media/music1.*'),

		init: function()
		{
			ig.music.add(this.music);
			ig.music.loop = true;
			ig.music.volume = 0.5;
			ig.music.play();

			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.W, 'up');
			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.SPACE, 'ok');
			ig.input.bind(ig.KEY.ENTER, 'ok');
			ig.input.bind(ig.KEY.ESC, 'back');
		},

		update: function()
		{
			ig.system.setGame(Menu);
			this.parent();
		}
	});

	if(ig.ua.mobile)
	    ig.Sound.enabled = false;

	ig.Sound.use = [ ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A ];

	if (window.RUN_AS_APP)
	{
		global.calc_scale();
		ig.main('#canvas', LD27, 60, global.WIDTH, global.HEIGHT, global.SCALE);
	}
	else
	{
		ig.main('#canvas', LD27, 60, 320, 240, 3);
	}
});