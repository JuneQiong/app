import React,{Component} from 'react'
import {Button,ToastAndroid ,ActivityIndicator,Text,View,StyleSheet,TextInput,FlatList,ScrollView ,TouchableOpacity} from 'react-native'
import Screen from '../Screen'



export default class IndexScreen extends Component {

    getAccessToken(url,params){
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
            fetch(url,init).then(response =>response.json())
                 .then(responseJson => {
                     if(responseJson.code === 1000){
                         this.setState({
                             access_token:responseJson.data.access_token,
                             refresh_token:responseJson.data.refresh_token,
                         })

                         this.getHorseList('https://openapi.itjuzi.com/horse_club/get_horse_club_list',
                            { page:this.state.page,limit:this.state.limit,})  
                     }
                     console.log(responseJson)
                 }).catch((error) => {
                    console.error(error);
                  })
        )
    };   
    getInfoMore(){
       
            this.setState({
                refreshing:false,
                page:this.state.page++
            })
            console.log(this.setState.page)
            this.getHorseList('https://openapi.itjuzi.com/horse_club/get_horse_club_list',
            { page:this.state.page,limit:this.state.limit,}) 
    }
    getHorseList(url,params){
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
             headers: {
               AUTHORIZATION: 'Bearer '.concat(this.state.access_token)
            },
         }
         return (
             fetch(url,init).then(response=>response.json())
             .then(responseJson => {
                 console.log(responseJson.data)
                 this.setState({
                     data:this.state.data.concat(responseJson.data),
                 })
                 console.log(this.state.data)
             }).catch((error) => {
                console.error(error);
              })
         )
    } 
        
   state={
       key:13,
       data:[],
        items:[
            { id:0,name:"全部",active:true},{ id:1,name:"医疗健康",active:true}, { id:2,name:"工具软件",active:false}, { id:3,name:"企业服务",active:false}, { id:4,name:"汽车交通",active:false}, 
            { id:5,name:"硬件",active:false}, { id:6,name:"教育",active:false}, { id:7,name:"文娱传媒",active:false},{ id:8,name:"金融",active:false}, 
            { id:9,name:"体育运动",active:false}, { id:10,name:"物流",active:false}, { id:11,name:"本地生活",active:false},{ id:12,name:"旅游",active:false},    
            { id:13,name:"房产服务",active:false}, { id:14,name:"广告营销",active:false}, { id:15,name:"游戏",active:false},{ id:16,name:"社交网络",active:false}, 
            { id:17,name:"农业",active:false}, { id:18,name:"电子商务",active:false}
        ],
        index:0,
        url:'https://openapi.itjuzi.com/oauth2.0/get_access_token',
        params:{
            appid: '123456839',
            appkey: 'da234dsf354sSkwUsd96dHJs243klHK2',
            granttype: 'client_credentials',
        },
        access_token: '',
        refresh_token: '',
        list: "",
        column_id: '0',
        limit: 20,
        page: 1,
        clickName:"全部"
   }

   componentWillMount(){
       this.getAccessToken(this.state.url,this.state.params)
   }

   componentDidMount(){
    ToastAndroid.showWithGravityAndOffset(
        "刷新成功",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
   }

    render() {
      return (
        <Screen>
           {/**输入框 */}
            <View style={styles.inputaera} onPress={()=>{this.props.navigation.navigate("Details")}}>
                     <View style={styles.textinput} >
                        <Text onPress={()=>{this.props.navigation.navigate("Search")}} style={{color:'grey',fontSize:16,alignItems:'center',marginTop:8,marginLeft:4}}>搜索公司</Text>
                     </View>
            </View>
            <View style={styles.content}>
             {/**类别标签 */}
                <View>
                    <ScrollView showsHorizontalScrollIndicator={true} horizontal={true} style={styles.scrollView}>
                         {
                            this.state.items.map((item,key)=>{
                                return  <View
                                            style={{justifyContent:"center",alignItems:"center",marginRight:10,marginLeft:10,marginTop:20,marginBottom:20}}
                                            >
                                                <Text  onPress={() => {this.setState({index:key,clickName:item.name});}} key={key} style={{fontSize:this.state.index===key ? 20:16,color:this.state.index===key ? '#aedfff':'black'}} >{item.name}</Text>
{/*                                              <View style={{borderBottomWidth:3,borderBottomColor:'#aedfff',width:this.state.length*10}}></View> */} 
                                           </View>       
                            })
                        }
                    </ScrollView>
                    <View style></View>
                </View>           
                <View style={{flexDirection: 'row', justifyContent:'space-around',alignItems:'center',backgroundColor:"#f7f7f7",height:40,paddingBottom:20}}>
                    <Text style={styles.text}>公司</Text>
                    <Text style={styles.text}>最新融资时间</Text>
                    <Text style={styles.text}>最新估值</Text>
                </View>
                {/**内容 */}
                    {/* <ActivityIndicator size="large" color="#adefff"  />  */}
                <FlatList
                    data={this.state.data}
                    style={{backgroundColor:"#ffffff"}}
                    onEndReached = {this.getInfoMore.bind(this)}
                    renderItem={({item}) => {
                        if(this.state.clickName == item.cat_name){
                            console.log(item.com_name)
                            return(
                                <TouchableOpacity style={{flexDirection: 'row',justifyContent:'space-around',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('IndexDetail',{com_name:item.com_name,description:item.com_des,tags:item.tags,creator:item.team[0].per_name,value:item.invse_guess_particulars,round:item.invse_round_name,com_url:item.com_url})}}>
                                            <Text style={styles.text}>{item.com_name}</Text>
                                            <Text style={styles.text}>{item.invse_year}-{item.invse_month}-{item.invse_day}</Text>
                                            <Text style={styles.text}>{item.invse_guess_particulars}</Text>
                                            <View style={{borderBottomColor:"#d9dada",borderBottomWidth:2}}/>
                                 </TouchableOpacity>
                            )
                        }else if(this.state.clickName == "全部"){
                            return(
                                <TouchableOpacity style={{flexDirection: 'row',justifyContent:'space-around',alignItems:'center'}} onPress={() => this.props.navigation.navigate('IndexDetail',{com_name:item.com_name,description:item.com_des,tags:item.tags,creator:item.team[0].per_name,value:item.invse_guess_particulars,round:item.invse_round_name,com_url:item.com_url})}>
                                            <Text style={styles.text}>{item.com_name}</Text>
                                            <Text style={styles.text}>{item.invse_year}-{item.invse_month}-{item.invse_day}</Text>
                                            <Text style={styles.text}>{item.invse_guess_particulars}</Text>
                                            <View style={{borderBottomColor:"#d9dada",borderBottomWidth:2}}/>
                                 </TouchableOpacity>
                            )
                        }
                    }
                        
                    }
                    refreshing={false}
                    onRefresh={() => {}}
                    onKeyPress={() => { return this.state.key}}
                    onPress={ () => { this.props.navigation.navigate("Search")}}
                />
            </View>
        </Screen>
      )
    }
  }
  

const styles = StyleSheet.create({
    inputaera:{
        height:80,
        alignItems:"center",
        backgroundColor:'white'
    },
    textinput:{
        height: 45,
        width: 300, 
        borderColor:'#aedfff',
        borderWidth:2,
       marginTop:20,
       borderRadius:15,
       alignItems:'flex-start',
       justifyContent:'flex-start'
    },
    content:{
        flex:1,
        height:900,
    },
    text:{
        fontSize:16,
        marginTop: 20,
    },
    scrollView:{
        lineHeight:25
    }
   
});

