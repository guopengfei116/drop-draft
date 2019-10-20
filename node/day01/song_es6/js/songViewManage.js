/**
 * @constructor 歌曲数据视图类
 * @param { options: Object } 配置项
 * @param { options.nameInputS: string } 输入歌曲名称的表单选择器
 * @param { options.singerInputS: string } 输入歌手的表单选择器
 * @param { options.addBtnS: string } 添加和修改歌曲按钮的选择器
 * @param { options.delBtnS: string } 删除歌曲按钮的选择器
 * @param { options.searchBtnS: string } 搜索歌曲按钮的选择器
 * @param { options.songListMainS: string } 存放歌曲列表的页面容器
 * @param { options.dataManage: SongDataManage } 对数据的操作都通过该对象来完成
 * */
class SongViewManage {
	
	constructor(options) {
		
		// 页面中的元素
		this.nameInput = document.querySelector(options.nameInputS);
		this.singerInput = document.querySelector(options.singerInputS);
		this.addBtn = document.querySelector(options.addBtnS);
		this.delBtn = document.querySelector(options.delBtnS);
		this.searchBtn = document.querySelector(options.searchBtnS);
		this.songListMain = document.querySelector(options.songListMainS);
		
		// 歌曲数据管理实例对象
		this.dataManage = new SongDataManage();
		
	};
	
	/**
	 * @function 根据指定的数据渲染页面
	 * @param { songList: Array } 要渲染的歌曲列表数据
	 * @return { undefined } 默认返回值
	 * */
	render(songList) {
		// 一个歌曲对象对应一段html，最后所有的html合并成一个字符串作为容器的子元素添加进入
		this.songListMain.innerHTML = songList.map(song => {
			return `<div class="songslist-single">
						<div class="songslist-name">${ song.name }</div>
						<div class="songslist-singer">${ song.singer }</div>
					</div>`;
		}).join('');
	};
	
	/**
	 * @function add按钮的事件绑定与处理
	 * @return { undefined } 默认返回值
	 * */
	add() {
		
		// 点击按钮事件绑定，点击时获取两个表单值，然后如果歌曲有了就是修改，没有新增
		this.addBtn.onclick = () => {
			
			// 数组解构赋值，获取两个表单值，如果没有传入内容那么不做任何操作
			let [ name, singer ] = [ this.nameInput.value.trim(), this. singerInput.value.trim() ];
			if(!name || !singer) {
				return;
			}
			
			// 有了修改，没有新增
			if(this.dataManage.search(name).length > 0) {
				this.dataManage.modify(name, singer);
			}else {
				this.dataManage.add({ name, singer });  // 这里如果属性名与变量名一样可以简写
			}
				
			// 数据变化后刷新视图
			this.render(this.dataManage.songList);
			
		};
	};
	
	/**
	 * @function delete按钮的事件绑定与处理
	 * @return { undefined } 默认返回值
	 * */
	del() {
		
		// 删除按钮事件绑定，点击时获取1个表单值，然后删除数据，数据变化后刷新视图
		this.delBtn.onclick = () => {
			var name = this.nameInput.value.trim();
			this.dataManage.del(name);
			this.render(this.dataManage.songList);
		};

	};
		
	/**
	 * @function search按钮的事件绑定与处理
	 * @return { undefined } 默认返回值
	 * */
	search() {
		
		// 搜索按钮事件绑定，点击时获取1个表单值，有值则渲染搜索到的数据，没有渲染全部
		this.searchBtn.onclick = () => {
			var name = this.nameInput.value.trim();
			if(name) {
				this.render(this.dataManage.search(name));
			}else {
				this.render(this.dataManage.songList);
			}
		};
		
	};
		
};
