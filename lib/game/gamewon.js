ig.module
( 
	'game.gamewon' 
)
.requires
(
	'impact.game'
)
.defines(function()
{
	Gamewon = ig.Game.extend(
	{
		credits: new ig.Image('media/gamewon.png'),

		font: new ig.Font('media/04b03.font.png'),
		
		timer: 0,

		init: function()
		{
			this.timer = new ig.Timer(10);
		},

		update: function()
		{
			this.parent();

			if (ig.input.pressed("ok") || this.timer.delta() > 0)
				ig.system.setGame(Menu);
		},

		draw: function()
		{
			this.parent();
			
			this.credits.draw(0, 0);

			this.font.draw("YOUR SCORE: " + global.score, 160, 90, ig.Font.ALIGN.CENTER);
		}
	});
});