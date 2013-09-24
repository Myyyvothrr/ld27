ig.module
( 
	'game.credits' 
)
.requires
(
	'impact.game'
)
.defines(function()
{
	Credits = ig.Game.extend(
	{
		credits: new ig.Image('media/credits.png'),

		init: function()
		{
		},

		update: function()
		{
			this.parent();

			if (ig.input.pressed("ok"))
				ig.system.setGame(Menu);
		},

		draw: function()
		{
			this.parent();
			
			this.credits.draw(0, 0);
		}
	});
});