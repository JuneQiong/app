import React,{Component} from 'react'
import {Button,Text,View,StyleSheet,Image,TouchableOpacity,ScrollView,RefreshControl,ToastAndroid,KeyboardAvoidingView} from 'react-native';
import {vmax,vmin} from '../../util/Viewport'
import { TextInput } from 'react-native-gesture-handler';
import {BlurView, VibrancyView} from 'react-native-blur'

export class Comment extends Component{

    getmyDate() {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
    
      
        return year+'-'+month+'-'+day;
      }
      comment(url,params){
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
                if(responseJson.msg==='成功'){
                    ToastAndroid.showWithGravityAndOffset(
                        "评论成功",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );
                }
             }).catch((error) => {
                console.error(error);
              })
         )
    } 

    good(url,params){
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
            
             }).catch((error) => {
                console.error(error);
              })
         )
    } 

    dianzan(){
        this.setState(previousState => {
            return { like: !previousState.like };
          });
          console.log(this.state.like+'====')
        if(this.state.like===true){
            this.good(this.state.goodAdd,{article_id:23, user_id:23})
            ToastAndroid.showWithGravityAndOffset(
                "点赞成功",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
        if(this.state.like===false){
            this.good(this.state.goodDel,{good_id:1})
            ToastAndroid.showWithGravityAndOffset(
                "取消点赞",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
    }
    state={
        descrip:'为培养实验室APP开发，产品和UI设计人才，同时完成实验室向新同学展示实验室工作内容的需求。特开发此APP',
        content:'设计规范已经更改多次，并不是一次就确定的。最开始，没有进行产品设计，希望还是照着小程序的样子进行开发，但是考虑到两版小程序都没人用，再照着抄依然没有意义。所以就开始进行产品设计。UI老师也是很有经验，给我们提出，我们作为小众产品，应该从自己着手，做出来的东西自己先用。',
        activeSection: false,
        comment:'',
        comAdd:'http://192.168.43.19:8080/comment/add',
        goodAdd:'http://192.168.43.19:8080/good/add',
        goodDel:'http://192.168.43.19:8080/good/delete',
        like:false,
        viewRef: null
    }
    render(){
        return(
            <View>
                {/**header */}
                <View style={{height:vmax(189),justifyContent:"space-around"}}>
                    <View style={styles.header}>
                        <View style={{height:vmax(80),flex:1,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(30),color: "#0068b7"}}>邀请参加</Text>
                        </View>
                        <View style={{height:vmax(80),flex:1,backgroundColor: "#0068b7",justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(30),color: "#ffffff"}}>查看任务</Text>                            
                        </View>
                    </View>
                    <View style={{height:vmax(1),backgroundColor:'#eeeeee'}}></View>
                    <View style={styles.descrip}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#4d4d4d",lineHeight:vmax(36)}}>{this.state.descrip}</Text>
                    </View>
                    <View style={{height:vmax(10),backgroundColor:'#eeeeee'}}></View>
                </View>
                    {/**project */}
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
                    <View style={styles.content}>
                        {/**author */}
                        <View style={{height:vmax(59),marginTop:vmax(16),flexDirection:'row'}}>
                            <View style={{height:(50),width:vmin(50),marginTop:vmax(4),marginBottom:vmax(4),marginRight:vmin(11)}}>
                                <Image style={{height:vmin(50),width:vmin(50),borderRadius:vmax(25)}} source={require('../resource/a.jpg')}></Image>
                            </View>
                            <View style={{width:vmin(100),height:vmax(59),marginTop:vmax(4)}}>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>谢辉</Text>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#cccccc"}}>ui爱好者</Text>
                            </View>
                            <View style={{height:vmax(59),flex:1,flexDirection:'row',paddingTop:vmax(38),alignItems:'flex-start',justifyContent:'flex-end'}}>
                                <View style={{height:vmax(50),width:vmin(100),flexDirection:'row',justifyContent:'center',marginRight:vmin(10)}}>
                                    <Image style={{height:vmax(21),marginRight:vmin(6)}} source={require('../resource/收起时评论.png')}></Image>
                                    <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#333333"}}>评论 3</Text>
                                </View>
                                <View style={{height:vmax(50),width:vmin(120),flexDirection:'row',justifyContent:'center',marginRight:vmin(28)}}>
                                    <Image style={{height:vmax(21),marginRight:vmin(6)}} source={require('../resource/收起时有用.png')}></Image>
                                    <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#333333"}}>有用</Text>
                                    <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#333333"}}></Text>
                                </View>
                            </View>
                            <BlurView
                                style={styles.absolute}
                                viewRef={this.state.viewRef}
                                blurType="light"
                                blurAmount={10}
                                />
                        </View>
                        {/**project-title */}
                        <View style={{height:vmax(30),flex:1,flexDirection:'row',marginTop:vmax(25),justifyContent:'space-between',alignItems:'center'}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontFamily: "SimHei",fontSize: vmax(32),color: "#333333"}}>产品功能确定</Text>
                                    <View style={{height:vmax(30),width:vmin(80),marginLeft:vmin(10),backgroundColor:'#ec6941',borderRadius:vmin(2),alignItems:'center'}}><Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#fcfbfa"}}>需求调研</Text></View>
                            </View>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(16),color: "#333333"}}>{this.getmyDate()}</Text>
                        </View>
                        {/**project-content */}
                        <View style={{height:vmax(180),marginTop:vmax(28),alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#8b8a8a",lineHeight:vmax(36)}}>{this.state.content}</Text>
                            {/* <View style={{flexDirection:"row",alignItems:'center'}}>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#b9e8fc",marginBottom:vmax(24),marginRight:vmin(10)}}>查看更多</Text>
                                <Image style={{height:vmax(6),width:vmin(11),marginBottom:vmax(10)}} source={require("../resource/箭头.png")}></Image>
                            </View> */}
                        </View>
                        {/**peoject-comment */}
                        <View style={{height:vmax(50),flex:1,marginTop:vmax(50),flexDirection:'row'}}>
                            <KeyboardAvoidingView>
                                <TextInput 
                                onChangeText={(text)=>{this.setState({comment:text})}}
                                onEndEditing={()=>{this.comment(this.state.comAdd,{article_id:23,user_id:23,context:this.state.comment,create_time:this.getmyDate()})}}
                                    style={{height:vmax(50),width:vmin(500),borderRadius:vmax(25),borderColor:'#b5b5b5', borderWidth:2,padding:0,paddingLeft:vmin(20)}}><Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#999999"}}>评论俩句给点建议</Text></TextInput>
                            </KeyboardAvoidingView>
                            <View style={{flexDirection:'row',marginLeft:vmin(50),paddingRight:vmin(5)}}>
                                <TouchableOpacity><Image style={{height:vmax(50),width:vmin(50),marginRight:vmin(40)}} source={require('../resource/评论副本.png')}></Image></TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.dianzan()}}><Image style={{height:vmax(50),width:vmin(54)}} source={require('../resource/有用副本.png')}></Image></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    header:{
       height:vmax(80),
       flexDirection:'row',
       flex:1
    },
    descrip:{
        height:vmax(98),
        paddingLeft:vmin(34),
        paddingTop:vmax(16),
        paddingRight:vmin(34),
        paddingBottom:vmax(13)
    },
    content:{
        width:vmin(707),
  //height:vmax(500),
       // justifyContent:'center',
        paddingLeft:vmin(25)
      },
      absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
})