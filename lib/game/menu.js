ig.module
( 
	'game.menu' 
)
.requires
(
	'impact.game'
)
.defines(function()
{
	Menu = ig.Game.extend(
	{
		menu_bg: new ig.Image('media/menu-bg.png'),
		font: new ig.Font('media/04b03.font.png'),

		index: 0,

		init: function()
		{
		},

		update: function()
		{
			if (ig.input.pressed('ok'))
			{
				switch (this.index)
				{
					case 0:
					{
						ig.system.setGame(Intro);
						break;
					}
					case 1:
					{
						ig.system.setGame(Credits);
						break;
					}
					case 2:
					{
						if (window.RUN_AS_APP)
						{
							window.win.toggleFullscreen();
							window.win.reload();
						}
						else
						{
							location.href = 'http://www.myyyvothrr.de';
						}

						break;
					}
					case 3:
					{		
						if (window.RUN_AS_APP)
						{
							window.close();
						}

						break;
					}
				}
			}
			else if (ig.input.pressed('back'))
			{
				window.close();
			}
			else if (ig.input.pressed('down'))
			{
				this.index = (++this.index)%(window.RUN_AS_APP ? 4 : 3);
			}
			else if (ig.input.pressed('up'))
			{
				--this.index;
				if (this.index < 0)
					this.index = (window.RUN_AS_APP ? 3 : 2);
			}

			this.parent();
		},

		draw: function()
		{
			this.parent();

			this.menu_bg.draw(0, 0);

			switch (this.index)
			{
				case 0:
				{
					this.font.draw("-> PLAY GAME <-", 260, 190, ig.Font.ALIGN.CENTER);
					this.font.draw("CREDITS", 260, 200, ig.Font.ALIGN.CENTER);
					
					if (window.RUN_AS_APP)
					{
						this.font.draw(window.win.isFullscreen ? "WINDOW" : "FULLSCREEN", 260, 210, ig.Font.ALIGN.CENTER);
						this.font.draw("QUIT", 260, 220, ig.Font.ALIGN.CENTER);					
					}
					else
					{
						this.font.draw("Myyyvothrr.de", 260, 210, ig.Font.ALIGN.CENTER);
					}

					break;
				}
				case 1:
				{
					this.font.draw("PLAY GAME", 260, 190, ig.Font.ALIGN.CENTER);
					this.font.draw("-> CREDITS <-", 260, 200, ig.Font.ALIGN.CENTER);
					
					if (window.RUN_AS_APP)
					{
						this.font.draw(window.win.isFullscreen ? "WINDOW" : "FULLSCREEN", 260, 210, ig.Font.ALIGN.CENTER);
						this.font.draw("QUIT", 260, 220, ig.Font.ALIGN.CENTER);					
					}
					else
					{
						this.font.draw("Myyyvothrr.de", 260, 210, ig.Font.ALIGN.CENTER);
					}

					break;
				}
				case 2:
				{
					this.font.draw("PLAY GAME", 260, 190, ig.Font.ALIGN.CENTER);
					this.font.draw("CREDITS", 260, 200, ig.Font.ALIGN.CENTER);
					
					if (window.RUN_AS_APP)
					{
						this.font.draw(window.win.isFullscreen ? "-> WINDOW <-" : "-> FULLSCREEN <-", 260, 210, ig.Font.ALIGN.CENTER);
						this.font.draw("QUIT", 260, 220, ig.Font.ALIGN.CENTER);					
					}
					else
					{
						this.font.draw("-> Myyyvothrr.de <-", 260, 210, ig.Font.ALIGN.CENTER);
					}
					break;
				}
				case 3:
				{
					this.font.draw("PLAY GAME", 260, 190, ig.Font.ALIGN.CENTER);
					this.font.draw("CREDITS", 260, 200, ig.Font.ALIGN.CENTER);
					
					if (window.RUN_AS_APP)
					{
						this.font.draw(window.win.isFullscreen ? "WINDOW" : "FULLSCREEN", 260, 210, ig.Font.ALIGN.CENTER);
						this.font.draw("-> QUIT <-", 260, 220, ig.Font.ALIGN.CENTER);					
					}
					else
					{
						this.font.draw("Myyyvothrr.de", 260, 210, ig.Font.ALIGN.CENTER);
					}

					break;
				}
			}
		}
	});
});