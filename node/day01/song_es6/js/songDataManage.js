/**
 * @constructor 歌曲数据管理类
 * @param { songList: Array } 用来存储歌曲对象的容器
 * */
class SongDataManage {
	
	constructor(songList = []) {
		this.songList = songList;
	};
	
	/**
	 * @function 给容器添加新的歌曲
	 * @param { song: Object } 要添加的歌曲对象
	 * @return { undefined } 默认返回值
	 * */
	add(song) {
		this.songList.push(song);
	};
	
	/**
	 * @function 根据歌曲名从容器中删除歌曲
	 * @param { name: string } 要删除的歌曲名称
	 * @return { undefined } 默认返回值
	 * */
	del(name) {
		// 过滤不删除的歌曲
		this.songList = this.songList.filter(song => song.name !== name);
	};
	
	/**
	 * @function 根据歌曲名修改容器中指定歌曲的歌手信息
	 * @param { name: string } 要修改的歌曲名称
	 * @param { singer: string } 新的歌手
	 * @return { undefined } 默认返回值
	 * */
	modify(name, singer) {
		this.songList.forEach(song => {
			if(song.name === name) {
				song.singer = singer;
			}
		});
	};
	
	/**
	 * @function 根据歌曲名在容器中查找指定歌曲，并返回
	 * @param { name: string } 要搜索的歌曲名称
	 * @return { Array } 如果没有找到返回空数组，找到了数组中存储找到的每个歌曲对象
	 * */
	search(name) {
		// 找到符合条件的歌曲返回
		return this.songList.filter(song => song.name === name);
	}
	
};
