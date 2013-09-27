ig.module
(
	'game.entities.zombie'
)
.requires
(
	'impact.entity',
	'game.blood',	
	'game.respawn-info'
)
.defines(function ()
{
    EntityZombie = ig.Entity.extend(
	{
		font: new ig.Font('media/04b03.font.png'),
		gui_bg: new ig.Image('media/gui_bg.png'),
	    animSheet: new ig.AnimationSheet('media/zombie.png', 8, 8),
	    size: { x: 6, y: 6 },
	    offset: { x: 1, y: 1 },
	    collides: ig.Entity.COLLIDES.ACTIVE,
	    type: ig.Entity.TYPE.A,
	    checkAgainst: ig.Entity.TYPE.BOTH,
	    zIndex: 15,
	    maxVel: { x: 100, y: 100 },

		snd_eat: new ig.Sound('media/eat.*'),
		snd_zombie: new ig.Sound('media/zombie1.*'),
		timer_zombie_snd: 0,

	    speed: 5,
	    n: 0,

	    controlled_by_player: false,
	    force_new_direction: false,
	    direction_timer: 0,
	    movement: { x: 0, y: 0 },

	    brain_timer: 0,

	    health: 1,

	    follower: [ ],

	    init: function (x, y, settings)
	    {
	        this.parent(x, y, settings);

	        this.addAnim('zombie', 1, [1]);
	        this.addAnim('player', 1, [0]);

	        this.direction_timer = new ig.Timer(1);

	        this.brain_timer = new ig.Timer(10);
	        this.brain_timer.pause();

	        this.timer_zombie_snd = new ig.Timer(5 + Math.random() * 15)
	    },

	    switch_mode: function(player)
	    {
	    	this.controlled_by_player = player;
	    	if (this.controlled_by_player)
	    	{
	    		ig.game.player = this;

	    		this.direction_timer.pause();
	    		this.brain_timer.set(10);
	    		this.speed = 30;
	    		this.zIndex = 50;
	    		this.currentAnim = this.anims.player;

				ig.game.spawnEntity(RespawnInfo, this.pos.x, this.pos.y, { target: this });
	    	}
	    	else
	    	{
	    		this.currentAnim = this.anims.zombie;
	    		this.zIndex = 20;
	    		this.speed = 5;
	    		this.brain_timer.pause();
				this.direction_timer.set(1 + 2 * Math.random());
	    	}
	    },

	    update: function()
	    {
	    	if (this.timer_zombie_snd.delta() > 0)
	    	{
	    		this.timer_zombie_snd.set(10 + Math.random() * 30);
	    		this.snd_zombie.play();
	    	}

	    	if (this.controlled_by_player)
	    	{
		    	this.vel.x = ((ig.input.state('right') ? 1 : 0) - (ig.input.state('left') ? 1 : 0));
		        this.vel.y = ((ig.input.state('down') ? 1 : 0) - (ig.input.state('up') ? 1 : 0));

		        if (this.brain_timer.delta() >= 0)
		        {
		        	this.receiveDamage(1);
		        	this.brain_timer.set(10);
		        }
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
		        this.vel.x = (this.vel.x / this.n) * this.speed;
		        this.vel.y = (this.vel.y / this.n) * this.speed;
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

	    	if (!this.controlled_by_player)
	    		this.force_new_direction = true;
	    },

	    check: function(other)
	    {
	    	this.parent(other);

	    	if (!(other instanceof EntityZombie))
	    		other.receiveDamage(1);

			if (this.controlled_by_player)
	    	{
		    	if (other instanceof EntityHuman)
		    	{
		    		this.snd_eat.play();
		    		this.brain_timer.set(10);
		    		global.score += 10;
		    	}
		    	else if (other instanceof EntityZombie)
		    	{
		    		if (this.brain_timer.delta() >= -5)
		    		{	
		    		  	this.snd_eat.play();
		    			this.brain_timer.set(5);
		    			other.receiveDamage(1);
		    			global.score -= 20;
		    		}
		    	}
		    	else if (other instanceof EntityExit)
		    	{
		    		global.score += 20;
		    		this.snd_eat.play();
		    		ig.game.next_level();
		    	}
		    }
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
	    	this.parent(amount);
	    },

	    kill: function()
	    {
	    	this.snd_zombie.play();

	    	this.parent();

	    	for (var i = 0, l = this.follower.length; i < l; ++i)
	    		this.follower[i].target_killed();

	    	if (this.controlled_by_player)
	    	{
		    	global.score -= 10;

		    	var others = ig.game.getEntitiesByType(EntityZombie);
		    	if (others.length > 0)
		    	{
		    		this.switch_mode(false);
		    		others[Math.floor(Math.random() * others.length)].switch_mode(true);
		    	}
		    	else
		    	{
		    		ig.game.player = 0;
		    		ig.game.gameover();
		    	}
		    }

		    ig.game.spawnEntity(Blood, this.pos.x, this.pos.y);
	    },

	    add_follower: function(follower)
	    {
	    	this.follower.push(follower);
	    },
	});
});
