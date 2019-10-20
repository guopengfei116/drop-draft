/**
 * Created by liulongbin on 2017/4/27.
 */
import React from 'react'

// 引入自己的获取电影数据的API文件
import MovieDataServices from '../../dataServices/getMovieData'

// 导入ANT组件
import {Spin, Alert, Rate} from 'antd';

// 导入样式表
import '../../css/MovieList.css'

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieType: this.props.match.params.type, // 电影类型
            movieList: [], // 所有的电影数据
            isLoading: true // 正在加载电影数据
        }
    }

    render() {
        return <div>
            {this.createMovieList()}
        </div>
    }

    // 组件挂载完成之后调用此函数
    /*componentDidMount(){
     var url="http://127.0.0.1:4327";
     var result = fetch(url);

     result.then(function (response) { //通过fetch请求回来的数据，是一个Promise对象，当我们为这个Promise对象指定成功回调函数的时候，第一个then中的参数，是一个Response对象，这个对象身上有一个.json()方法，通过调用.json()方法，又可以得到一个新的Promise对象
     // console.log(response.json());
     var p2 = response.json();
     return p2;
     }).then(function (data) {
     console.log(data);
     });

     // 总结：fetch API 的使用步骤：
     // 1. fetch('数据url地址');
     // 2. fetch('数据url地址').then(functioin(response){
     //      return response.json(); // 通过指定成功的回调函数，在函数内部调用 response.json()得到新的Promise对象
     // });
     // 3. 拿着第一次.then()中返回的Promise对象，再次调用.then()。获取到真正的数据：
     // fetch('数据URL').then(function(response){
     //      return response.json();
     // }).then(function(data){
     //      console.log(data); // 拿到真正的数据！！
     // });

     // console.log(result);
     }*/

    // 由于受到浏览器跨域的限制，不能直接通过fetch API获取到豆瓣的电影数据，需要使用Node服务器做转接
    /*componentDidMount(){
     // https://api.douban.com/v2/movie/in_theaters   【正在热映】
     // https://api.douban.com/v2/movie/coming_soon   【即将上映】
     // https://api.douban.com/v2/movie/top250        【top250】

     // 先来分析请求Node服务器时候，请求的URL地址：
     // http://127.0.0.1:9999/getmovielist?type=in_theaters
     // http://127.0.0.1:9999/getmovielist?type=coming_soon
     // http://127.0.0.1:9999/getmovielist?type=top250

     // 经过上面的分析，我们可以把这三个电影列表的请求过程，合并成一个数据URL地址；所以，我们需要在请求的时候，传递一个电影类型过去，类型用`type`来定义，type的可选参数有3个，分别是【in_theaters】、【coming_soon】、【top250】
     // 这样，在Node服务器中，可以监听`/getmovielist`，当浏览器请求此地址的时候，可以通过参数的形式，获取到传递过来的type值！
     // 在Node服务器端，如何获取到url中传递过来的参数呢？？？   req.query.type


     fetch('https://api.douban.com/v2/movie/in_theaters').then(function (response) {
     return response.json();
     }).then(function (data) {
     console.log(data);
     });
     }*/

    componentDidMount() {
        // 调用封装的电影服务，获取电影列表
        this.getMovieListByType();
    }

    // 将获取电影列表的过程，封装为一个单独的函数，这样的好处方便多次调用
    getMovieListByType = ()=>{
        var result = MovieDataServices.getMovieListByType(this.state.movieType);
        result.then((data) => {
            // data中存放的是获取到的真实的电影列表数据
            // console.log(data);
            this.setState({
                movieList: data.subjects, // 将电影数据存储到state中
                isLoading: false
            });
        });
    }

    // 定义一个创建电影列表的方法：
    createMovieList = () => {
        // 在创建电影列表时候，可以先判断this.state.isLoading,如果为true，则需要展示loading效果，
        // 如果为false，则需要隐藏loading效果，渲染电影列表
        if (this.state.isLoading) {
            return <Spin tip="Loading...">
                <Alert
                    message="正在请求电影列表数据..."
                    description="请稍等...."
                    type="info"
                />
            </Spin>
        } else {
            return <div style={{display:'flex', flexWrap:'wrap', textAlign:'center'}}>
                {this.state.movieList.map(this.createMovieItem)}
            </div>
        }
    }

    // 创建每一个电影信息
    createMovieItem = (item, i) => {
        return <div className="movieItem" key={i} style={{border:'1px solid #eee', margin:'4px', paddingTop:'5px' }} onClick={()=>{this.goMovieDetail(item.id)}}>
            <img src={item.images.medium} alt=""/>
            <p><strong>{item.title}</strong></p>
            <p><strong>电影类型：</strong>{item.genres.join('，')}</p>
            <p><strong>上映年份：</strong>{item.year}年</p>
            <div><strong>评分：</strong><Rate disabled defaultValue={item.rating.average/2} /></div>
        </div>
    }

    // 组件将要接收新props属性
    componentWillReceiveProps(nextProps){
        // 注意：this.props获取的属性有延迟，是上一次的旧props，最新的props是通过参数列表中的nextProps来获取
        console.log(nextProps.match.params.type);
        // 可以通过nextProps.match.params.type拿到最新的电影类型，这时候，我们把最新的电影类型，存储到state中，同时，我们需要重新获取电影列表数据，由于获取数据需要等待的时间，所以也需要把isLoading设置为true；当数据获取成功的时候，再次将isLoading设置为false；
        this.setState({
            movieType:nextProps.match.params.type, // 最新的类型
            isLoading:true
        }, ()=>{
            // 当修改了电影类型和isLoading值的时候，需要重新获取电影数据
            this.getMovieListByType();
        });
    }

    // 点击每一个电影列表项，获取到当前的Id，并通过JS的方式，跳转到详细信息页面
    goMovieDetail = (movieid)=>{
        console.log(movieid);
        // 通过打印this.props，发现在this.props中有一个history属性，上面有一个push方法，能实现JS操作路由的跳转,接收一个path路径
        // console.log(this.props);
        this.props.history.push('/movie/moviedetail/' + movieid);
    }
}
