ig.module
( 
	'game.intro' 
)
.requires
(
	'impact.game',
	'impact.font'
)
.defines(function()
{
	Intro = ig.Game.extend(
	{
		INTRO:
		[
			new ig.Image('media/intro-1.png'),
			new ig.Image('media/intro-2.png'),
			new ig.Image('media/intro-3.png'),
			new ig.Image('media/intro-4.png'),
		],

		index: 0,
		timer: 0,

		init: function()
		{
			this.timer = new ig.Timer(5);
		},

		update: function()
		{
			if (this.timer.delta() > 0 || ig.input.pressed("ok") || ig.input.pressed("back"))
			{
				this.timer.reset();
				++this.index;

				if (this.index > this.INTRO.length-1)
					ig.system.setGame(Game);
			}

			this.parent();
		},

		draw: function()
		{
			this.parent();

			if (this.index < this.INTRO.length)
				this.INTRO[this.index].draw(0, 0);
		}
	});
});