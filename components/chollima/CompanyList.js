import React,{Component} from 'react'
import {Button,Text,View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {vmax,vmin} from '../../util/Viewport'
import { TextInput, FlatList } from 'react-native-gesture-handler';


export class CompanyList extends Component{


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
                      console.log('token'+responseJson)
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
                  console.log('方法里',this.state.data)
              }).catch((error) => {
                 console.error(error);
               })
          )
     } 
     getHorseInfo(url,params){
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
                 console.log('info',responseJson.data)
                 this.setState({
                     
                 })
                 console.log('方法里',this.state.data)
             }).catch((error) => {
                console.error(error);
              })
         )
    } 
        
     state={
        key:13,
        data:[],
         index:0,
         url:'https://openapi.itjuzi.com/oauth2.0/get_access_token',
         urlInfo:'https://openapi.itjuzi.com/horse_club/get_horse_club_info',
         params:{
             appid: '123456839',
             appkey: 'da234dsf354sSkwUsd96dHJs243klHK2',
             granttype: 'client_credentials',
         },
         com_id:0,
         com_url:'',
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
        console.log(this.state.data+"state.data")
    }

    render(){
       return(
        <View>
            <View style={{height:vmax(146),paddingLeft:vmin(18),flexDirection:'row',alignItems:'flex-end',width:'100%',borderBottomColor:'#dcdcdc',borderBottomWidth:vmax(1),paddingBottom:vmax(17)}}>
                <View style={{height:vmax(60),width:vmin(100),justifyContent:'flex-end'}}>
                    <Text style={{fontFamily:"SimHei",fontSize: vmax(36),color: "#8a8a8a"}}>趋势</Text></View>
                <View style={{height:vmax(60),width:vmin(200),justifyContent:'flex-end'}}>
                    <Text style={{fontFamily:"SimHei",fontSize: vmax(60),color: "#333333"}}>千里马</Text></View>
            </View>
            <View style={{width:'100%',height:vmax(100),flexDirection:'row',borderBottomColor:'#dcdcdc',borderBottomWidth:vmax(1),alignItems:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center',width:vmin(120),height:vmax(50),marginLeft:vmin(159)}}>
                    <Text style={{fontFamily:"SimHei",fontSize: vmax(36),color: "#333333"}}>行业</Text>
                    <View style={styles.triangle}></View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',width:vmin(120),height:vmax(50),marginLeft:vmax(210)}}>
                    <Text style={{fontFamily:"SimHei",fontSize: vmax(36),color: "#333333"}}>轮次</Text>
                    <View style={styles.triangle}></View>
                </View>
            </View>
            <View style={{height:vmax(1087),width:'100%'}}>
                <FlatList
                            data={this.state.data}
                            //style={{backgroundColor:"yellow"}}
                            onEndReached = {this.getInfoMore.bind(this)}
                            renderItem={({item}) => {
                                   
                               return(
                                <View style={{height:vmax(130),paddingTop:vmax(20),flexDirection:'row',paddingBottom:vmax(20),paddingLeft:vmin(18)}}>
                                    <Image style={{width:vmax(90),height:vmax(90)}} source={{uri:item.com_logo_archive}}></Image>
                                    <View style={{height:vmax(90),width:vmin(155),justifyContent:'space-between',marginLeft:vmin(15)}}>
                                       <Text style={{fontFamily: "SimHei",fontSize: vmax(30),color: "#333333"}}>{item.com_name}</Text>
                                       <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#8a8a8a"}}>{item.cat_name}</Text>
                                    </View>
                                    <View style={{height:vmax(90),width:vmin(120),justifyContent:'space-between',marginLeft:vmin(33)}}>
                                       <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>最新估值</Text>
                                       <Text style={{fontFamily: "SimHei",fontSize: vmax(20),color: "#ec6d13"}}>{item.invse_year}-{item.invse_month}-{item.invse_day}</Text>
                                       <Text style={{fontFamily: "SimHei",fontSize: vmax(30),color: "#f63333"}}>{item.invse_guess_particulars}</Text>
                                    </View>
                                    <View style={{height:vmax(90),width:vmin(150),justifyContent:'space-between',marginLeft:vmin(46)}}>
                                       <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>最新融资</Text>
                                       <Text style={{fontFamily: "SimHei",fontSize: vmax(20),color: "#ec6d13"}}>{item.invse_round_name}</Text>
                                       <Text style={{fontFamily: "SimHei",fontSize: vmax(30),color: "#f63333",justifyContent:'center',alignItems:'center'}}>{item.invse_similar_money_name}</Text>
                                    </View>
                                    <TouchableOpacity style={{height:vmax(90),width:vmin(47),justifyContent:'space-between',marginLeft:vmin(30),justifyContent:'center',alignItems:'center'}}>
                                        <Image style={{width:vmax(32),height:vmax(32)}}  source={require('../resource/看好-未选中.png')}></Image> 
                                        <Text style={{fontFamily: "SimHei",fontSize: vmax(16),color: "#8a8a8a"}}>看好 3</Text>
                                    </TouchableOpacity>
                                </View>
                               )
                            }}
                            refreshing={false}
                />
            </View>
        </View>
       )
    }
}

const styles=StyleSheet.create({
    triangle:{
        marginLeft:5,
        marginTop:1,
       width:0,
        height:0,
        borderStyle:'solid',
        borderWidth:6,
        borderTopColor:'#f76260',//下箭头颜色
        borderLeftColor:'#fff',//右箭头颜色
        borderBottomColor:'#fff',//上箭头颜色
        borderRightColor:'#fff'//左箭头颜色
    }
})