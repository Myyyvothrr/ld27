ig.module
(
	'game.entities.exit'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityExit = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/brain.png', 16, 16),
	    size: { x: 16, y: 16 },
	    offset: { x: 0, y: 0 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.B,
	    checkAgainst: ig.Entity.TYPE.NONE,
	    zIndex: 5,
	    maxVel: { x: 100, y: 100 },

	    health: 1,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.addAnim('idle', 0.5, [0, 0, 0, 1, 1, 1]);
	    },

	    update: function()
	    {
	    	this.parent();
	    },

	    draw: function ()
	    {
	        this.parent();
	    },

	    receiveDamage: function(amount)
	    {
	    },

	    kill: function()
	    {
	    }
	});
});
