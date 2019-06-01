import React,{Component} from 'react'
import {View,Text,Button,TextInput,StyleSheet,Alert,TouchableOpacity,Image,ScrollView,ToastAndroid } from 'react-native'
import {vmin,vmax} from '../../util/Viewport'

// const {LoginModule} = NativeModules

// DeviceEventEmitter.addListener('weixin login',(res) => {
//     if(res.params){
//         console.log(JSON.parse(res.params))
//     }
// })


export class LoginScreen extends Component{


    login(url,params){
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
                 if(responseJson.code===0){
                    this.props.navigation.push('Mine',{userId:this.state.userId,username:this.state.name})
                 }else{
                    ToastAndroid.showWithGravityAndOffset(
                                        "用户名或密码错误",
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                        25,
                                        50
                                      );
                 }
             })
         )
    } 

    // login(){
    //     this.getUserByName(this.state.url,{username:this.state.name})
    //     if(this.state.name===this.state.respname){
    //         if(this.state.password===this.state.resppassword){
    //             this.props.navigation.push('Mine',{userId:this.state.userId,username:this.state.name}),
    //             console.log("success login"),
    //             ToastAndroid.showWithGravityAndOffset(
    //                 "登录成功",
    //                 ToastAndroid.LONG,
    //                 ToastAndroid.BOTTOM,
    //                 25,
    //                 50
    //               );
    //         }else{
    //             console.log("fail login"),
    //             ToastAndroid.showWithGravityAndOffset(
    //                 "用户名或密码错误",
    //                 ToastAndroid.LONG,
    //                 ToastAndroid.BOTTOM,
    //                 25,
    //                 50
    //               );
    //         }
    //     }
        
    // }

     state={
           url:'http://192.168.43.19:8080/user/loginUser',
            name: '',
            password: '',
            telephoneNumber:0,
            respname:'',
            resppassword:'',
            resptele:0,
            userId:0
     }

    render(){

  

        return(
                <ScrollView style={{flex:1}}>
                    <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginRight:vmin(40),marginTop:vmax(40)}}>
                        <Image  
                            source={require('../resource/LU.png')}
                            style={{ width: 100, height: 100 ,justifyContent:'center',alignItems:'center'}}>
                        </Image>
                        <Text style={{fontSize:24,fontFamily:"Arial"}}>欢迎来到陆向谦推荐</Text>
                    </View>
             
                     <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center',marginTop:vmax(40),}}>
                        <Text style={styles.text}>帐号：</Text>
                        <TextInput 
                        placeholder="请输入姓名"
                          onChangeText={(text)=> {this.setState({name:text}),console.log('text:'+this.state.name)}}
                          textContentType='telephoneNumber' style={{...styles.textinput,width:250}}></TextInput>
                   </View>

                   <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center',marginTop:vmax(20)}}>
                        <Text style={styles.text}>密码：</Text>
                        <TextInput 
                           onChangeText={(text)=> {this.setState({password:text}),console.log('text:'+this.state.password)}}
                          textContentType='newPassword' autoComplete='password' style={{...styles.textinput,width:250}}></TextInput>
                   </View>
                   <TouchableOpacity 
                   style={{...styles.button,  marginTop:vmax(100), marginLeft:vmin(160),backgroundColor:'#aedfff'}}
                   onPress={()=>{this.login(this.state.url,{username:this.state.name,password:this.state.password})}}><Text>登录</Text></TouchableOpacity>
                   <TouchableOpacity style={{alignItems:'flex-end',marginRight:20,marginTop:10}}
                     onPress={()=>{this.props.navigation.navigate('Sign')}}
                    >
                       <View style={{height:vmax(60),width:vmin(150),borderBottomColor:'#aedfff',borderBottomWidth:1,justifyContent:'center',alignItems:'center'}} >
                            <Text style={{color:'#aedfff'}}>点击注册</Text>
                       </View>
                   </TouchableOpacity>
                    {/***qq\微信登录 */}
                    <View style={{flexDirection:'row',height:60,justifyContent:'space-around',alignItems:'center',marginTop:vmax(50)}}>
                        <TouchableOpacity  style={{height:50,width:50,justifyContent:'center',alignItems:'center'}}
                            onPress={()=>{
                                console.log('press')
                              Alert.alert(
                                '提示：',
                                '是否离开应用前往微信',
                                [
                                  {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: '确定', onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: false }
                              )
                        }}>
                        <Image source={require('../resource/wx1.jpg')}
                            style={{height:40,width:40}}
                        />
                        </TouchableOpacity>
                         <TouchableOpacity  style={{height:50,width:50,justifyContent:'center',alignItems:'center'}}
                            onPress={()=>{
                                console.log('press')
                              Alert.alert(
                                '提示：',
                                '是否离开应用前往QQ',
                                [
                                  {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: '确定', onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: false }
                              )
                        }}>
                            <Image source={require('../resource/qq.jpg')}
                                style={{height:40,width:40}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View  style={{justifyContent:'center',alignItems:'center'}}>
                        <Text onPress={()=>{console.log('xxx')}}>登录代表您已同意《陆向谦推荐--用户协议》</Text>
                    </View>
                </ScrollView>
        )
    }
}
const styles=StyleSheet.create({
    textinput:{
        height: 45,
        borderColor:'#aedfff',
        borderWidth:2,
       marginTop:20,
       borderRadius:15,
       alignItems:'center',
       justifyContent:'center'
    },
    text:{
        fontSize:18,
        justifyContent:'center',
        alignItems:'center',
        marginTop:16
    },
    button: {
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width:200,
        borderRadius:15
      },
})