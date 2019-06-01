import React from 'react';
import { TouchableOpacity , Button,View, FlatList,Text,StyleSheet,Image,ScrollView,RefreshControl,TextInput,AlertIOS } from 'react-native';
import {vmax,vmin,} from '../../util/Viewport'
import Swiper from 'react-native-swiper';
export default class Shouye extends React.Component {

  searchInfo(url,params){
    if(params){
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' +params[key]))
        if (url.search(/\?/) === -1){
            url += '?' + paramsArray.join('&')
        }else{
            url += '&' + paramsArray.join('&')
        }
    }
     const init = {
         method:'GET',
     }
     return (
         fetch(url,init).then(response=>response.json())
         .then(responseJson => {
             console.log(responseJson)
             this.setState({
                 searchResponse:responseJson.data
             })
             console.log(this.state.searchResponse)
         }).catch((error) => {
            console.error(error);
          })
     )
} 

show(url,params){
  if(params){
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' +params[key]))
      if (url.search(/\?/) === -1){
          url += '?' + paramsArray.join('&')
      }else{
          url += '&' + paramsArray.join('&')
      }
  }
   const init = {
       method:'GET',
   }
   return (
       fetch(url,init).then(response=>response.json())
       .then(responseJson => {
           console.log(responseJson)
          this.setState({peoject:responseJson.data})
          console.log('ptoject',this.state.peoject)
       }).catch((error) => {
          console.error(error);
        })
   )
} 

componentDidMount(){
  this.show('http://192.168.43.19:8080/project/findProject',{id:1})
}

getmyDate() {
  var date = new Date();

  var year = date.getFullYear().toString();
  var month = (date.getMonth()+1).toString();
  var day = date.getDate().toString();
  var hour =  date.getHours().toString();
  var minute = date.getMinutes().toString();

  return year+'-'+month+'-'+day+' '+' '+hour+':'+minute;
}
_onRefresh = () => {
  this.setState({refreshing: true});
  fetchData().then(() => {
    this.setState({refreshing: false});
  });
}
  state={
    intro:'为培养实验室APP开发，产品和UI设计人才，同时完成实验室向新同学展示实验室工作内容的需求。特开发此APP...',
    project:[],
    refreshing:false,
    seachContent:'',
    searchResponse:'',
    data:[]
  }
 
    render() {
      const { navigation } = this.props;
      const project_name = navigation.getParam('project_name')
      const creater = navigation.getParam('creater')
      const participate = navigation.getParam('participate')
      const sumary = navigation.getParam('sumary')
      return (
        <View style={{alignItems:'center',justifyContent:'space-between',backgroundColor:'#ffffff'}}>
              <View style={styles.header}>
                  <View style={{height:vmax(60),width:vmin(20),backgroundColor:"#eeeeee"}}></View>
              {/**搜索框 */}
                  <TextInput onChangeText={(text)=>{this.setState({seachContent:text})}}
                    onEndEditing={()=>{this.searchInfo('http://192.168.43.19:8080/article/search',{mkey:this.state.seachContent})}}
                  style={{...styles.input,color:'#333333'}}> </TextInput>
                  <View style={styles.textBG} >
                        <View style={{height:vmax(30),width:1,backgroundColor:'#434343',marginRight:vmin(23)}}></View>
                      <Text style={{fontFamily:"SimHei",fontSize: vmax(36),color: "#737373",alignContent:'center',flex:1,}}  onPress={()=>{
                          this.props.navigation.navigate('Create')
                          }}>提项</Text>
                  </View>
                  
              </View >
              <ScrollView 
                    keyboardDismissMode='on-drag'
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                       // onRefresh={this._onRefresh}
                        title='没更多加载内容'
                      />
                    }
                    alwaysBounceVertical={true}
                    >
                {/**轮播图 */}
                <View style={{height:vmax(400),flex:1,marginTop:vmax(52),flexDirection:'row',justifyContent:'space-around'}}> 
                    <Swiper
                            centeredSlides={true}
                            style={styles.swiper}
                            slidesOffsetBefore={50}
                            slidesOffsetAfter ={50}
                            slidesPerView={3}
                            height={vmax(400)}             //组件高度
                            loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                            autoplay={true}                //自动轮播
                            autoplayTimeout={4}                //每隔4秒切换
                            horizontal={true}              //水平方向，为false可设置为竖直方向
                            paginationStyle={{bottom: 10}}    //小圆点的位置：距离底部10px
                            showsButtons={false}           //为false时不显示控制按钮
                    >
                            <Image source={require('../resource/LU.png')} style={styles.img}/>
                            <Image source={require('../resource/LU.png')} style={styles.img}/>
                            <Image source={require('../resource/LU.png')} style={styles.img}/>
                    </Swiper>
                </View>
                {/**内容 */}
                <TouchableOpacity  style={styles.content} onPress={()=> {this.props.navigation.navigate('ProDetails',{}),console.log('dianjichenggong')}}>
                    <View style={styles.avatar}>
                      <Text style={{fontFamily: "NotoSansCJK-Bold",fontSize: vmax(48),color: "#333333"}}>产品</Text>
                    </View>
                    <View style={{height:vmax(160),width:vmin(500),paddingLeft:vmin(5),paddingRight:vmin(10)}}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(36),color: "#333333"}}>陆向谦推荐APP产品设计</Text>
                        <Text style={{fontFamily:'SimHei',fontSize:vmax(18),color:'#8b8a8a',marginTop:vmax(20),lineHeight:vmax(36)}}>{this.state.intro}</Text>
                        <View style={{width:vmin(500),height:vmax(25),flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:vmax(10),paddingRight:vmin(10)}}>
                            <Text style={{fontFamily:'SimHei',fontSize:vmax(18),color:'#cccccc'}}>{this.getmyDate()}</Text>
                            <View style={{fontFamily:'SimHei',fontSize:vmax(18),color:'#8b8a8a',flexDirection:'row',alignItems:'center'}}>
                              <Image source={require('../resource/参与人.png')} style={{height:vmax(25),width:vmin(29)}}></Image>
                              <Text style={{fontFamily:'SimHei',fontSize:vmax(18),color:'#8b8a8a',marginLeft:vmin(10),marginRight:vmin(10)}}>参与人3</Text>
                            </View>
                        </View>
                    </View>
                   
                </TouchableOpacity >
                <FlatList
                    data={this.state.project}
                    style={{backgroundColor:"#ffffff"}}
                    renderItem={({item}) => {
                      console.log('this is flatlist')
                            return(
                              <TouchableOpacity  style={styles.content} onPress={()=> {this.props.navigation.navigate('ProDetails'),console.log('dianjichenggong')}}>
                                <View style={styles.avatar}>
                                  <Text style={{fontFamily: "NotoSansCJK-Bold",fontSize: vmax(48),color: "#333333"}}>产品</Text>
                                </View>
                                <View style={{height:vmax(160),width:vmin(500),paddingLeft:vmin(5),paddingRight:vmin(10)}}>
                                    <Text style={{fontFamily: "SimHei",fontSize: vmax(36),color: "#333333"}}>{item.project_name}</Text>
                                    <Text style={{fontFamily:'SimHei',fontSize:vmax(18),color:'#8b8a8a',marginTop:vmax(20),lineHeight:vmax(36)}}>{item.creater}</Text>
                                    <View style={{width:vmin(500),height:vmax(25),flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:vmax(10),paddingRight:vmin(10)}}>
                                        <Text style={{fontFamily:'SimHei',fontSize:vmax(18),color:'#cccccc'}}>{this.create_time}</Text>
                                        <View style={{fontFamily:'SimHei',fontSize:vmax(18),color:'#8b8a8a',flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require('../resource/参与人.png')} style={{height:vmax(25),width:vmin(29)}}></Image>
                                          <Text style={{fontFamily:'SimHei',fontSize:vmax(18),color:'#8b8a8a',marginLeft:vmin(10),marginRight:vmin(10)}}>参与人3</Text>
                                        </View>
                                    </View>
                                </View>
                          </TouchableOpacity >
                            )
                    }
                        
                    }
                />
                </ScrollView>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({ 
    header:{
        height:vmax(60),
        width:vmin(700),
        backgroundColor:"#eeeeee",
        borderRadius:3,
        opacity: 0.5,
        marginTop: vmax(54),
        alignItems:'flex-end',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    input:{
      height:vmax(60),
      width:vmin(559),
      backgroundColor:"#eeeeee",
      borderRadius:3,
      opacity: 0.5,
      marginTop: vmax(54),
      padding:0
    },
    textBG:{
        width:vmin(120),
        height:vmax(60),
        opacity:0.3,
        alignItems:'center',
        flexDirection:'row'
    },
    img:{
        height:vmax(400),
        width:vmin(700),
        marginLeft: vmin(25),
        borderRadius:vmax(5),
    },
    content:{
      marginTop:vmax(43),
      width:vmin(707),
      height:vmax(176),
      flexDirection:'row',
      justifyContent:'center'
    },
    avatar:{
      width:vmin(160),
      height:vmin(160),
      borderRadius:80,
      backgroundColor: "#eeeeee",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#eeeeee",
      justifyContent:'center',
      alignItems:'center',    
     //s marginBottom:vmax(13),
      marginRight:vmin(13)
    },
    swiper:{
      width:'90%'
    }
  })
  