import React,{Component} from 'react'
import {View,TouchableOpacity,Text,Button ,Image,StyleSheet,NativeModules,DeviceEventEmitter,Slider} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {vmin,vmax} from '../../util/Viewport'



export class MineScreen extends Component{
    state={
        num:0,
       IconComponent:Ionicons,
       iconName:String,
       names:[{id:1,name:"hangye",num:0,route:"Industry"},{id:2,name:"zhiye",num:0,route:"Career"},
                {id:3,name:"gongsi",num:0,route:"Company"},{id:4,name:"qiyejia",num:0,route:"Entre"}]
    }
    
    render(){

        const { navigation } = this.props;
        const userId = navigation.getParam('userId');
        const username = navigation.getParam('username')
        return(
            <View>
                <View style={styles.login}>
                    <View style={styles.avator}>
                        <Image
                            style={{height:114,width:114,borderRadius: 57,marginLeft:3,marginTop:3}}
                            source={require('../resource/LU.png')}
                        /> 
                    </View>
                    {/* <Text>username: {JSON.stringify(username)}</Text>
                    <Text>userid: {JSON.stringify(userId)}</Text> */}
                    <View style={styles.user}>
                        <Button  
                            title="Login"
                            onPress={ () => this.props.navigation.navigate('Login')}
                            style={{flex:1,}} />
                        <View><Text style={{fontFamily: "SimHei",fontSize: vmax(36),color: "#333333"}}>欢迎您：{username}！</Text></View>
                    </View>
                    
                </View>
                
                <TouchableOpacity 
                      activeOpacity={0.3} 
                      style={{alignItems:'center',flexDirection:'row',marginTop:30,marginLeft:5,backgroundColor:'#f7f7f7',borderBottomColor:"black"}} 
                      onPress = {() => {
                        this.props.navigation.navigate("Collect")
                    }}
                      >
                    <Image style={{width:35,height:35,marginLeft:5}} source={require("../resource/collect.png")}></Image>
                    <Text style={{marginLeft:15,fontSize:16}}>我的收藏</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                      activeOpacity={0.3} 
                      style={{alignItems:'center',flexDirection:'row',marginTop:5,marginLeft:5,backgroundColor:'#f7f7f7'}} 
                      onPress = {() => {
                        this.props.navigation.navigate("Lesson")
                    }}
                      >
                    <Image style={{width:35,height:35,marginLeft:5}} source={require("../resource/lesson.png")}></Image>
                    <Text style={{marginLeft:15,fontSize:16}}>我的课程</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                      activeOpacity={0.3} 
                      style={{alignItems:'center',flexDirection:'row',marginTop:5,marginLeft:5,backgroundColor:'#f7f7f7'}} 
                      onPress = {() => {
                        this.props.navigation.navigate("Exam")
                    }}
                      >
                    <Image style={{width:35,height:35,marginLeft:5}} source={require("../resource/exam.png")}></Image>
                    <Text style={{marginLeft:15,fontSize:16}}>我的考核</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                      activeOpacity={0.3} 
                      style={{alignItems:'center',flexDirection:'row',marginTop:5,marginLeft:5,backgroundColor:'#f7f7f7'}} 
                      onPress = {() => {
                        this.props.navigation.navigate("FeedBack")
                    }}
                      >
                    <Image style={{width:35,height:35,marginLeft:5}} source={require("../resource/ch.png")}></Image>
                    <Text style={{marginLeft:15,fontSize:16}}>我的反馈</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                      activeOpacity={0.3} 
                      style={{alignItems:'center',flexDirection:'row',marginTop:5,marginLeft:5,backgroundColor:'#f7f7f7'}} 
                      onPress = {() => {
                        this.props.navigation.navigate("Voice")
                    }}
                      >
                    <Image style={{width:35,height:35,marginLeft:5}} source={require("../resource/voice.png")}></Image>
                    <Text style={{marginLeft:15,fontSize:16}}>语音测试</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // 头像加用户名
    login:{
        height:200,
        flexDirection:"row",
        backgroundColor:"#aedfff",  
        paddingBottom:30,
        justifyContent:'space-around'
    },
    //t头像
    avator:{
        height:120,
        width:120,
        marginLeft:40,
        marginTop:40,
        borderRadius:60,
    },
    user:{
        fontSize:40,
        justifyContent:"space-around",
        marginLeft:40,
        marginTop:40,
    },
    interesttext:{
        marginTop: 7,
        marginBottom:7,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    interest:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        zIndex:2,
        backgroundColor:'white',
        position:'absolute',
        top:170,
        borderRadius:20,
        borderWidth:2,
        borderColor:'black',
        marginLeft:20,
        marginRight:20,
      },
})