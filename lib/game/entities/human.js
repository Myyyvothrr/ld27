ig.module
(
	'game.entities.human'
)
.requires
(
	'impact.entity',
	'game.blood',
	'game.corpse'
)
.defines(function ()
{
    EntityHuman = ig.Entity.extend(
	{
	    animSheet: new ig.AnimationSheet('media/guy.png', 8, 8),
	    size: { x: 6, y: 6 },
	    offset: { x: 1, y: 1 },
	    collides: ig.Entity.COLLIDES.PASSIVE,
	    type: ig.Entity.TYPE.B,
	    checkAgainst: ig.Entity.TYPE.B,
	    zIndex: 10,
	    maxVel: { x: 100, y: 100 },

	    snd_human: new ig.Sound('media/human.*'),

	    speed: 10,
	    speed_fleeing: 20,
	    n: 0,

	    update_targets_timer: 0,
	    wait_timer: 0,
	    force_new_direction: false,
	    direction_timer: 0,
	    movement: { x: 0, y: 0 },
	    flee_timer: 0,
	    fleeing: false,
	    zombies: null,

	    health: 1,

	    force_new_direction: false,
	    direction_timer: 0,
	    movement: { x: 0, y: 0 },

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.addAnim('idle', 1, [0]);

	        this.direction_timer = new ig.Timer(1);
	        this.flee_timer = new ig.Timer(Math.random());
	    },

	    update: function()
	    {
	    	if (!this.fleeing)
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

			if (this.flee_timer.delta() > 0)
			{
				this.flee_timer.set(Math.random());

				this.fleeing = false;

				this.zombies = ig.game.getEntitiesByType(EntityZombie);

			    for (var i = 0, l = this.zombies.length; i < l; ++i)
				{
				  	if (this.distanceTo(this.zombies[i]) < 40)
				   	{
				   		this.vel.x = -1 * (this.zombies[i].pos.x - this.pos.x);
				   		this.vel.y = -1 * (this.zombies[i].pos.y - this.pos.y);
				   		this.fleeing = true;
				   		break;
				   	}
				}
			}
			
			if (this.vel.x != 0 || this.vel.y != 0)
		    {
		        this.n = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
		        this.vel.x = (this.vel.x / this.n) * (this.fleeing ? this.speed_fleeing : this.speed);
		        this.vel.y = (this.vel.y / this.n) * (this.fleeing ? this.speed_fleeing : this.speed);
		    }

	    	this.parent();
	    },

	    draw: function ()
	    {
	        this.parent();
	    },

	    collideWith: function(other, axis)
	    {
	    	this.parent(other, axis);

	    	this.force_new_direction = true;
	    	this.fleeing = false;
	    },

	    check: function(other)
	    {
	    	this.parent(other);

	    	this.movement.x *= -1;
	    	this.movement.y *= -1;
	    	this.fleeing = false;
	    },

	    handleMovementTrace: function(res)
	    {
	    	if (res.collision.x || res.collision.y)
	    	{
	    		this.movement.x *= -1;
	    		this.movement.y *= -1;
	    		this.fleeing = false;
	    	}

	    	this.parent(res);
	    },

	    receiveDamage: function(amount)
	    {
	    	this.parent(amount);
	    },

	    kill: function()
	    {
	    	this.snd_human.play();
		    ig.game.spawnEntity(Blood, this.pos.x - 8 + Math.random() * 16, this.pos.y - 8 + Math.random() * 16);
		    ig.game.spawnEntity(Corpse, this.pos.x, this.pos.y);
	    	this.parent();
	    }
	});
});
