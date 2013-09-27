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
		gui_bg: new ig.Image('media/gui_bg.png'),

		autoSort: true,
		sortBy: ig.Game.SORT.Z_INDEX,
		gravity: 0,

		LEVELS:
		[
			[ Level0, "LEVEL 1: GET TO THE BRAIN" ],
			[ Level1, "LEVEL 2: MORE HUMANS" ],
			[ Level2, "LEVEL 3: STAY AWAY, PALADIN" ],
			[ Level3, "LEVEL 4: LEFT OR RIGHT?" ],
			[ Level4, "LEVEL 5: LURE HIM AWAY" ],
			[ Level5, "LEVEL 6: DO WAIT..." ],
			[ Level6, "LEVEL 7: SORRY FRIENDZ..." ],
			[ Level7, "LEVEL 8: TRY OR WAIT?" ],
			[ Level8, "LEVEL 9: BE QUICK OR BE..." ],
			[ Level9, "LEVEL 10: ATTACK!" ],
			[ Level10, "LEVEL 11: THE NARROW PATH" ],
			[ Level11, "LEVEL 12: THIS ONE GUARD..." ],
			[ Level12, "LEVEL 13: BE QUICK, AGAIN" ],
			[ Level13, "LEVEL 14: WHO GOES UP?" ],
			[ Level14, "LEVEL 15: THIS ISN'T EASY" ],
			[ Level15, "LEVEL 16: THE OBVIOUS PATH" ],
			[ Level16, "LEVEL 17: ...BE DEAD" ],
			[ Level17, "LEVEL 18: ATTACK AGAIN!" ],
			[ Level18, "LEVEL 19: FEW HUMANS REMAIN..." ],
			[ Level19, "LEVEL 20: THE LAST ONE!" ],
		],

		paused: false,

		current_level: -1,

		is_gameover: false,

	    brain_str: 'brain',

	    player: 0,

		init: function()
		{
			global.score = 0;
			
			this.next_level();
		},

		next_level: function()
		{
			ig.Timer.timeScale = 1;

			this.player = 0;
			this.paused = false;
			this.is_gameover = false;

			++this.current_level;

			if (this.current_level > this.LEVELS.length-1)
			{
				ig.system.setGame(Gamewon);
			}
			else
			{
				this.loadLevelDeferred(this.LEVELS[this.current_level][0]);
			}
		},

		gameover: function()
		{
			this.is_gameover = true;
			ig.Timer.timeScale = 0;
		},

		update: function()
		{
			if (this.is_gameover)
			{
				if (ig.input.pressed('back'))
				{
					ig.system.setGame(Gameover);
				}
				else if (ig.input.pressed('ok'))
				{
					global.score = 0;
					--this.current_level;
					this.next_level();
				}
			}
			else
			{
				if (ig.input.pressed('back'))
				{
					this.paused = !this.paused;
					ig.Timer.timeScale = this.paused ? 0 : 1;
				}
				else if (ig.input.pressed('ok'))
				{
					if (this.paused)
					{
						ig.system.setGame(Menu);
					}
				}
			}

			if (!this.paused && !this.is_gameover)
			{
				this.parent();
			}
		},

		draw: function()
		{
			this.parent();

			this.gui_bg.draw(0, 0);

			if (this.player)
			{
				this.brain_str = 'BRAIN';
				
				for (var i = 0, l = Math.round(-1 * this.player.brain_timer.delta()); i < l; ++i)
					this.brain_str += 'Z';
				
			    this.font.draw(this.brain_str, 2, 1);
			}
			else
			{
			    this.font.draw("BRAIN?", 2, 1);
			}

			if (this.current_level < this.LEVELS.length)
			{
	    		this.font.draw(this.LEVELS[this.current_level][1], 160, 1, ig.Font.ALIGN.CENTER);
			}

			this.font.draw("SCORE: " + global.score, 318, 1, ig.Font.ALIGN.RIGHT);

			if (this.is_gameover)
			{
				this.gui_bg.draw(0, 71);
				this.gui_bg.draw(0, 79);
				this.gui_bg.draw(0, 87);
				this.gui_bg.draw(0, 95);
				this.gui_bg.draw(0, 103);
				this.gui_bg.draw(0, 111);
				this.font.draw("GAME OVER\n\nESC to quit\nSPACE / ENTER to retry with 0 points", 160, 80, ig.Font.ALIGN.CENTER);
			}
			else if (this.paused)
			{
				this.gui_bg.draw(0, 71);
				this.gui_bg.draw(0, 79);
				this.gui_bg.draw(0, 87);
				this.gui_bg.draw(0, 95);
				this.gui_bg.draw(0, 103);
				this.gui_bg.draw(0, 111);
				this.font.draw("GAME PAUSED\n\nESC to continue\nSPACE / ENTER to quit", 160, 80, ig.Font.ALIGN.CENTER);
			}
		}
	});
});