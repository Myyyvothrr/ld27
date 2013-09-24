ig.module
(
	'game.respawn-info'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    RespawnInfo = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/respawn-info.png', 16, 16),
	    size: { x: 16, y: 16 },
	    offset: { x: 0, y: 0 },
	    collides: ig.Entity.COLLIDES.NEVER,
	    type: ig.Entity.TYPE.NONE,
	    checkAgainst: ig.Entity.TYPE.NONE,
	    zIndex: 49,
	    maxVel: { x: 100, y: 100 },

	    target: null,

	    timer: null,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);
	        this.addAnim('idle', 0.5, [ 0, 1 ]);

	        this.timer = new ig.Timer(3);
	    },

	    update: function()
	    {
	    	this.parent();

	    	if (this.target && this.target.pos)
	    	{
	    		this.pos.x = this.target.pos.x-5;
	    		this.pos.y = this.target.pos.y-5;
	    	}
	    	else
	    		this.kill();

	    	if (this.timer.delta() > 0)
	    		this.kill();
	    },

	    receiveDamage: function(amount)
	    {
	    },

	    kill: function()
	    {
	    	this.parent();
	    }
	});
});
