import React from 'react';
import { Button, View, Text,Image,StyleSheet } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { vmax, vmin } from '../../util/Viewport';



export default class IndexDetial extends React.Component {

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
                  console.log(responseJson)
                  if(responseJson.code === 1000){
                    this.setState({
                        access_token:responseJson.data.access_token,
                        refresh_token:responseJson.data.refresh_token,
                    })
                    //this.getHorseInfo(this.state.url1,{com_id:JSON.parse(itemId)}) 

                }
              }).catch((error) => {
                 console.error(error);
               })
     )
 };   

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
           console.log(responseJson)
           this.setState({
             data:responseJson.data
           })
       }).catch((error) => {
          console.error(error);
        })
   )
} 

componentDidMount(){
  console.log("props mount"+this.props)
  this.getAccessToken(this.state.url,this.state.params)
 // const itemId = this.props.getParam('itemId').com_id;
  // this.getHorseInfo(this.state.url1,{com_id:JSON.parse(itemId)})
  //     console.log("itemid"+itemId)
  //           this.setState({
  //               img:this.state.data.com_logo_archive
  //           }) 
}
componentDidUpdate(){
  console.log("props update "+this.props)
}

state={
  url:'https://openapi.itjuzi.com/oauth2.0/get_access_token',
  params:{
      appid: '123456839',
      appkey: 'da234dsf354sSkwUsd96dHJs243klHK2',
      granttype: 'client_credentials',
  },
  url1:'https://openapi.itjuzi.com/horse_club/get_horse_club_info',
  data:[],
  lable:[{id:1,name:'ktv'},{id:2,name:'alibaba'},{id:3,name:'休闲娱乐'}],
  com_id:3,
  img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557129813883&di=373a9390618ae0b5cbc6e0a7e9a81a94&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F27%2F20170727184802_scXEJ.thumb.700_0.jpeg',
  product:[{id:1,name:'changba-你的手机ktv',type:'app'},
  {id:1,name:'changba-你的手机ktv',type:'app'},
  {id:1,name:'changba-你的手机ktv',type:'app'}]
}
    render() {

      const { navigation } = this.props;
      const userId = navigation.getParam('userId');
      const com_name = navigation.getParam('com_name')
      const description = navigation.getParam('description')
     const tags = navigation.getParam('tags')
     const creator = navigation.getParam('creator')
     const value = navigation.getParam('value')
     const round = navigation.getParam('round')
     const com_url = navigation.getParam('com_url')
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
         <ScrollView>
           <View style={{borderRadius:vmin(10),width:vmin(710),height:vmax(606),marginTop:vmax(10),marginLeft:vmin(10),marginRight:vmin(10),paddingLeft:vmin(10),paddingRight:vmin(10),borderColor:'black',borderWidth:vmax(1)}}>
              <View style={{flexDirection:'row',marginTop:vmax(20),flex:1}}>
                  <Image style={{height:vmax(200),width:vmin(200),borderRadius:vmin(5),marginTop:vmax(10),marginLeft:vmin(5)}} source={require('../resource/LU.png')}></Image>
                  <View style={{marginLeft:vmin(15),justifyContent:'center'}}>
                    <Text style={{fontSize:25}}>{com_name}</Text>
                    <Text style={{fontSize:16}}>{description}</Text>
                  </View>
              </View>
              <View>
                  <Text style={{fontSize:24}}>标签</Text>
                  <View>
                  {/* {
                   tags.map((item)=>{
                        return(
                          <View style={{flexDirection:'row'}}>
                            <Text>{item}</Text>
                          </View>
                        )
                    })
                  } */}
                   <Text>{tags}</Text>
                  </View>
              </View>
              <View>
                  <Text style={{fontSize:24}}>融资信息</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>最新融资时间：2019-1-22</Text>
                    <Text>轮次：{round}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>融资额：0万</Text>
                    <Text>最新估值：{value}</Text>
                  </View>
              </View>
           </View>
           {/**tuanduixinxi */}
           <View style={{borderRadius:vmin(10),width:vmin(710),marginTop:vmax(30),marginLeft:vmin(10),marginRight:vmin(10),paddingTop:vmin(20),paddingLeft:vmin(10),paddingRight:vmin(10),borderColor:'black',borderWidth:vmax(1)}}>
                  <Text style={{fontSize:24}}>团队信息</Text>
                  <View style={{flexDirection:'row',marginTop:vmax(20),marginBottom:vmax(20),flex:1,alignItems:'flex-start'}}>
                      <Image style={{height:vmax(200),width:vmin(200),borderRadius:vmin(5),marginTop:vmax(10),marginLeft:vmin(5)}} source={require('../resource/LU.png')}></Image>
                      <View style={{marginLeft:vmin(15),justifyContent:'center'}}>
                        <Text style={{fontSize:24}}>{creator}--创始人及ceo</Text>
                        <Text style={{fontSize:12}}>陈华--创始人及ceo陈华--创始人及ceo陈华--创始人及ceo陈华--创始人及ceo</Text>
                      </View>
                  </View>
           </View>
           <View style={{borderRadius:vmin(10),width:vmin(710),marginTop:vmax(30),marginLeft:vmin(10),marginRight:vmin(10),paddingLeft:vmin(10),paddingRight:vmin(10),borderColor:'black',borderWidth:vmax(1)}}>
                  <Text style={{fontSize:24}}>相关产品</Text>
                  <View style={{flexDirection:'row',marginTop:vmax(20),marginBottom:vmax(20),flex:1,alignItems:'flex-start'}}>
                      <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
                        <View style={{width:vmin(200),justifyContent:'center',alignItems:'center'}}><Text>序号</Text></View>
                        <View style={{width:vmin(400),justifyContent:'center',alignItems:'center'}}><Text>产品名</Text></View>
                        <View style={{width:vmin(200),justifyContent:'center',alignItems:'center'}}><Text>产品类型</Text></View>
                      </View>
                      {
                    this.state.product.map((item)=>{
                        return(
                          <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
                            <View style={{width:vmin(200),justifyContent:'center',alignItems:'center'}}><Text>{item.id}</Text></View>
                            <View style={{width:vmin(400),justifyContent:'center',alignItems:'center'}}><Text>{item.name}</Text></View>
                            <View style={{width:vmin(200),justifyContent:'center',alignItems:'center'}}><Text>{item.type}</Text></View>
                        </View>
                        )
                    })
                  }
                  </View>
           </View>
         </ScrollView>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({


  })