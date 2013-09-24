ig.module
( 
	'game.game' 
)
.requires
(
	'game.levels.0',
	'game.levels.1',
	'game.levels.2',
	'game.levels.3',
	'game.levels.4',
	'game.levels.5',
	'game.levels.6',
	'game.levels.7',
	'game.levels.8',
	'game.levels.9',
	'game.levels.10',
	'game.levels.11',
	'game.levels.12',
	'game.levels.13',
	'game.levels.14',
	'game.levels.15',
	'game.levels.16',
	'game.levels.17',
	'game.levels.18',
	'game.levels.19'
)
.defines(function()
{
	Game = ig.Game.extend(
	{
		font: new ig.Font('media/04b03.font.png'),

		music: new ig.Sound('media/music1.*'),

		autoSort: true,
		sortBy: ig.Game.SORT.Z_INDEX,
		gravity: 0,

		LEVELS:
		[
			Level0,
			Level1,
			Level2,
			Level3,
			Level4,
			Level5,
			Level6,
			Level7,
			Level8,
			Level9,
			Level10,
			Level11,
			Level12,
			Level13,
			Level14,
			Level15,
			Level16,
			Level17,
			Level18,
			Level19,
		],

		current_level: 0,

		init: function()
		{
			global.score = 0;
			
			this.loadLevelDeferred(this.LEVELS[this.current_level]);
		},

		next_level: function()
		{
			++this.current_level;

			if (this.current_level > this.LEVELS.length-1)
			{
				ig.system.setGame(Gamewon);
			}
			else
			{
				this.loadLevelDeferred(this.LEVELS[this.current_level]);
			}
		},

		update: function()
		{
			this.parent();
		},

		draw: function()
		{
			this.parent();
		}
	});
});