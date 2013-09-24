ig.module
(
	'game.entities.paladin'
)
.requires
(
	'impact.entity'
)
.defines(function ()
{
    EntityPaladin = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/paladin.png', 8, 8),
	    size: { x: 6, y: 6 },
	    offset: { x: 1, y: 1 },
	    collides: ig.Entity.COLLIDES.ACTIVE,
	    type: ig.Entity.TYPE.B,
	    checkAgainst: ig.Entity.TYPE.A,
	    zIndex: 20,
	    maxVel: { x: 100, y: 100 },

		snd_hit: new ig.Sound('media/hit.*'),

	    speed_searching: 15,
	    speed_chasing: 25,
	    n: 0,

	    wait_timer: 0,
	    force_new_direction: false,
	    direction_timer: 0,
	    movement: { x: 0, y: 0 },

	    health: 1,

	    targets: 0,
	    target: null,
	    target_dist: 0,

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.addAnim('idle', 1, [0]);

	        this.wait_timer = new ig.Timer(1 + Math.random());
	        this.direction_timer = new ig.Timer(1);
	    },

	    update_target: function()
	    {
	    	this.target_dist = (this.target != null) ? this.distanceTo(this.target) : 72;
		    if (this.target_dist > 80)
		    {
		    	this.target = null;
		    }

		    this.targets = ig.game.getEntitiesByType(EntityZombie);

		    for (var i = 0, l = this.targets.length; i < l; ++i)
			{
			  	if (this.distanceTo(this.targets[i]) < this.target_dist)
			   	{
			   		var trace = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.targets[i].pos.x-this.pos.x, this.targets[i].pos.y-this.pos.y, this.size.x, this.size.y);
			   		if (!trace.collision.x && !trace.collision.y)
			   		{
			   			this.target = this.targets[i];
			   			this.target.add_follower(this);
			   			break;
			   		}
			   	}
			}
		},

	    update: function()
	    {
	       	if (this.wait_timer.delta() > 0)
	    	{
	    		this.update_target();
	    		this.wait_timer.set(1 + Math.random());
	    	}

	    	if (this.target != null)
	    	{
				this.vel.x = this.target.pos.x-this.pos.x;
				this.vel.y = this.target.pos.y-this.pos.y;
			}
			else
			{
				if (this.force_new_direction || (this.direction_timer.delta() > 0 && Math.random() > 0.7))
				{
					this.direction_timer.set(1 + 2 * Math.random());
					this.force_new_direction = false;
					this.movement.x = this.vel.x = -1 + Math.random() * 2;
					this.movement.y = this.vel.y = -1 + Math.random() * 2;
				}
				else
				{
					this.vel.x = this.movement.x;
					this.vel.y = this.movement.y;
				}
			}

			if (this.vel.x != 0 || this.vel.y != 0)
		    {
		        this.n = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
		        this.vel.x = (this.vel.x / this.n) * (this.target ? this.speed_chasing : this.speed_searching);
		        this.vel.y = (this.vel.y / this.n) * (this.target ? this.speed_chasing : this.speed_searching);
		    }

	    	this.parent();
	    },

	    draw: function ()
	    {
	        this.parent();
	    },

	    target_killed: function()
	    {
	    	this.target = null;
	    },

	    collideWith: function(other, axis)
	    {
	    	this.parent(other, axis);

    		this.force_new_direction = true;
	    },

	    check: function(other)
	    {
	    	this.parent(other);

	    	other.receiveDamage(1);

	    	this.snd_hit.play();
	    },

	    handleMovementTrace: function(res)
	    {
	    	if (res.collision.x || res.collision.y)
	    	{
	    		this.movement.x *= -1;
	    		this.movement.y *= -1;
	    	}

	    	this.parent(res);
	    },

	    receiveDamage: function(amount)
	    {
	    },

	    kill: function()
	    {
	    },
	});
});
