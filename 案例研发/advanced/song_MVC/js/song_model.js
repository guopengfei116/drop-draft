// 歌曲管理构造函数
function SongModelManager(songList) {

    // 给将来创建的歌曲管理对象添加一个songList属性，
    // 这个属性用来存储所有的歌曲数据
    this.songList = songList || [];
}

SongModelManager.prototype = {

    // 给将来创建的歌曲管理对象添加一个增加歌曲数据的方法
    add: function(song) {
        /**
		 * 实现步骤：
		 * 1、先要看看之前有没有存储过这个歌曲
		 * 2、如果存储过，那么把之前的删除掉
		 * 3、最后添加新的歌曲
		 * */
		
		var searchResult = this.search(song.name);
		if(searchResult) {
			this.delete(song.name);
		}
		// 在实例的歌曲列表中，添加传入的歌曲
		this.songList.push(song);
    },

    // 给将来创建的歌曲管理对象添加一个删除歌曲数据的方法
    del: function(songName) {
        for(var i = 0, len = this.songList.length; i < len; i++) {
            if(this.songList[i].songName === songName) {
                this.songList.splice(i, 1);
                break;
            }
        }
    },

    // 给将来创建的歌曲管理对象添加一个查找指定歌曲数据的方法
    find: function(songName) {
        for(var i = 0, len = this.songList.length; i < len; i++) {
            if(this.songList[i].songName === songName) {
                return this.songList[i];
            }
        }
    },

    // 给将来创建的歌曲管理对象添加一个修改指定歌曲数据的方法
    mod: function(songName, singer) {
        for(var i = 0, len = this.songList.length; i < len; i++) {
            if(this.songList[i].songName === songName) {
                this.songList[i].singer = singer;
            }
        }
    },

    // 按照指定的key对数据进行排序
    sort: function(key) {
        this.songList.sort(function(song1, song2) {
            return song1[key] > song2[key];
        });
    }
};
