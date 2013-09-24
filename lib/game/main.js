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
	global =
	{
		score: 0,
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
			ig.input.bind(ig.KEY.RETURN, 'ok');
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

	ig.main('#canvas', LD27, 60, 320, 240, 3);
});