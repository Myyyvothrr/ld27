ig.module
(
	'game.blood'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    Blood = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/blood.png', 8, 8),
	    size: { x: 8, y: 8 },
	    offset: { x: 0, y: 0 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.NONE,
	    checkAgainst: ig.Entity.TYPE.NONE,
	    zIndex: 1,
	    maxVel: { x: 100, y: 100 },


	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);
	        this.addAnim('idle', 1, [Math.floor(3*Math.random())]);
	    },

	    receiveDamage: function(amount)
	    {
	    },

	    kill: function()
	    {
	    }
	});
});
