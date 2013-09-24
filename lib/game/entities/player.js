ig.module
(
	'game.entities.player'
)
.requires
(
	'game.entities.zombie'
)
.defines(function ()
{
    EntityPlayer = EntityZombie.extend(
	{
	    controlled_by_player: true,

	    zIndex: 50,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.switch_mode(true);
	    },

	    update: function()
	    {
	    	this.parent();
	    },

	    draw: function ()
	    {
	        this.parent();
	    },
	});
});
