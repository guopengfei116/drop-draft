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
		
		// 每个歌曲对应一段html片段，把所有片段拼在一起作为容器的子元素
		// 注意：反引号字符串不能换行，否则return的是undefined。
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
		
		this.addBtn.onclick = () => {
			
			// 获取表单值，如果值为空不做任何处理
			let [ name, singer ] = [ this.nameInput.value.trim(), this.singerInput.value.trim() ];
			if(!name || !singer) {
				throw '请输入合格数据！';
			}
			
			// 有则修改无责添加
			if(this.dataManage.search(name).length > 0) {
				this.dataManage.modify(name, singer);
			}else {
				this.dataManage.add({ name, singer });
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
		
		// 点击后删除对应数据，然后刷新视图
		this.delBtn.onclick = () => {
			let name = this.nameInput.value.trim();
			this.dataManage.del(name);
			this.render(this.dataManage.songList);
		};
		
	};
	
	/**
	 * @function search按钮的事件绑定与处理
	 * @return { undefined } 默认返回值
	 * */
	search() {
		
		// 有搜索条件就渲染搜索后的结果，没有就渲染全部歌曲
		this.searchBtn.onclick = () => {
			let name = this.nameInput.value.trim();
			if(name) {
				this.render(this.dataManage.search(name));
			}else {
				this.render(this.dataManage.songList);
			}
		};
		
	};
	
};
