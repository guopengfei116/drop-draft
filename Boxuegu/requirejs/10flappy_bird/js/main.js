requirejs.config({
	baseUrl: './js',
	paths: {
		E: 'common/event',
		ImgLoad: 'common/imgLoad',
		util: 'common/util',
  		Button: 'component/button',
  		Text: 'component/text',
  		Timer: 'component/timer',
  		BaseSprite: 'role/baseSprite',
  		Bird: 'role/bird',
  		Land: 'role/land',
  		Pipe: 'role/pipe',
  		Sky: 'role/sky',
  		BaseScene: 'scene/baseScene',
  		EntryScene: 'scene/entryScene',
  		GameScene: 'scene/gameScene',
  		OverScene: 'scene/overScene',
		FlappyBird: 'flappy_bird'
	}
});

require(['FlappyBird'], function(FlappyBird) {
	var flaB = new FlappyBird('#flappy-bird');
    flaB.run();
});
