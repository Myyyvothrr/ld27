ig.module
(
	'game.corpse'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    Corpse = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/guy.png', 8, 8),
	    size: { x: 8, y: 8 },
	    offset: { x: 0, y: 0 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.NONE,
	    checkAgainst: ig.Entity.TYPE.NONE,
	    zIndex: 2,
	    maxVel: { x: 100, y: 100 },

	    timer: null,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);
	        this.addAnim('idle', 0.75, [1, 2, 3, 4]);

	        this.timer = new ig.Timer(3);
	    },

	    update: function()
	    {
	    	this.parent();

	    	if (this.timer.delta() > 0)
	    		this.kill();
	    },

	    receiveDamage: function(amount)
	    {
	    },

	    kill: function()
	    {
	    	this.parent();

		    ig.game.spawnEntity(EntityZombie, this.pos.x, this.pos.y);
	    }
	});
});
