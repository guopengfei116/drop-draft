import React, { Component } from 'react';

// 导入UI组件
import { Spin, Alert, Rate } from 'antd';

// 导入封装的api获取方法
import Api from '../../../js/api.js';

// 组件定义
export default class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.match.params.type,
      movieList: [],
      isLoading: true
    };
  }

  // 渲染内容
  render() {
    return (
      <div>
      {
        this.state.isLoading?
        <Spin tip="Loading...">
          <Alert
            message="loading"
            description="正在全力加载您要的数据，请稍候"
            type="info"
          />
        </Spin>
        :
        <div style={{ display:'flex', flexWrap:'wrap', textAlign:'center' }}>
            {
              this.state.movieList.map((item, i) => {
                return (
                  <div className="movieItem" key={ item.id } style={{border:'1px solid #eee', margin:'4px', paddingTop:'5px' }} onClick={ this.goMovieDetail.bind(this, item.id) }>
                    <img src={ item.images.medium } alt=""/>
                    <p><strong>{ item.title }</strong></p>
                    <p><strong>电影类型：</strong>{ item.genres.join('，') }</p>
                    <p><strong>上映年份：</strong>{ item.year }年</p>
                    <div><strong>评分：</strong><Rate disabled defaultValue={ item.rating.average/2 } /></div>
                  </div>
                )
              })
            }
        </div>
        }
      </div>
    );
  }

  // 公共的请求数据方法, 请求时先设置loading,结束后取消loading
  getMovieList(type) {
    this.setState({
      isLoading: true
    });

    Api.movieList(type).then(json => {
      this.setState({
        movieList: json.subjects,   // 将电影数据存储到state中
        isLoading: false
      });
      console.log(json);
    });
  }

   // 通过Id切换到电影详情页
   // this.props中有一个history属性，上面有一个push方法，能实现JS操作路由的跳转,接收一个path路径
  goMovieDetail(id) {
      // console.log(this.props);
      this.props.history.push('/movie/detail/' + id);
  }

  // 组件挂载前请求一次接口获取数据
  componentWillMount() {
    this.getMovieList(this.props.match.params.type);
  }

  // 组件接收到新的props值时，重新请求接口数据
  // 注意：这时候this.props获取的是上一次的旧props，最新的props需要通过参数的nextProps获取
  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
    this.getMovieList(nextProps.match.params.type);
  }

}
