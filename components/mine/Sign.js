import React,{Component} from 'react'
import {View,Text,Button,TextInput,StyleSheet,Alert,TouchableOpacity,Image,ScrollView,ToastAndroid} from 'react-native'
import {vmin,vmax} from '../../util/Viewport'

// const {LoginModule} = NativeModules

// DeviceEventEmitter.addListener('weixin login',(res) => {
//     if(res.params){
//         console.log(JSON.parse(res.params))
//     }
// })

export class SignScreen extends Component{

    signEmpty(){
        console.log(this.state.name)
        this.getUserByName('http://192.168.43.19:8080/user/getUserByName',{username:this.state.name})
        if(this.state.name===this.state.respname){
            ToastAndroid.showWithGravityAndOffset(
                "该姓名已被注册",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }else if(this.state.name!==''&&this.state.password!==''&&this.state.telephoneNumber!==''){
            console.log("bu kong")
            this.sign(this.state.url,{username:this.state.name,password:this.state.password,phone:this.state.telephoneNumber}),
            this.props.navigation.navigate('Login')
        }else if(this.state.name===''){
            console.log("xingming")
            ToastAndroid.showWithGravityAndOffset(
                "姓名不能为空",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }else if(this.state.telephoneNumber===''){
            console.log("shouji")
            ToastAndroid.showWithGravityAndOffset(
                "手机号不能为空",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }else if(this.state.password===''){
            console.log("mami")
            ToastAndroid.showWithGravityAndOffset(
                "密码不能为空",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }
    }

    getUserByName(url,params){
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
                 if(responseJson.data!==null){this.setState({
                    respname:responseJson.data.username,
                })

                 }
               
             })
         )
    } 
    
//     sign(url,params) {
//         return(
//             console.log('ddd'),
//             console.log(this.state.username,this.state.password,this.state.telephoneNumber),
//             fetch(url, {
//                 method: 'POST', // or 'PUT'
//                 body: JSON.stringify(params), // data can be `string` or {object}!
//                 headers: new Headers({
//                   'Content-Type': 'application/json'
//                 })
//               }) .then(responseJson => {
//                 console.log('cccccc',responseJson)
//  }
              
//             ).catch(error=>{console.log(error)})
//         )

//     }

sign(url,params){
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
             }
           )
     )
} 
     state={
            url:'http://192.168.43.19:8080/user/add',
            username: '',
            password:'',
            telephoneNumber:'',
            respname:'',
            body:''
     }

    render(){
        return(
                <ScrollView style={{flex:1}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginRight:vmin(40),marginTop:vmax(40)}}>
                        <Image  
                            source={require('../resource/LU.png')}
                            style={{ width: 100, height: 100 ,justifyContent:'center',alignItems:'center'}}>
                        </Image>
                        <Text style={{fontSize:24,fontFamily:"Arial"}}>欢迎来到陆向谦推荐</Text>
                    </View>
                    <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center',marginTop:vmax(40),}}>
                        <Text style={styles.text}>姓名：</Text>
                        <TextInput 
                        placeholder="请输入姓名"
                          onChangeText={(text)=> {this.setState({username:text}),console.log('text:'+this.state.username)}}
                          textContentType='username' style={{...styles.textinput,width:250}}></TextInput>
                   </View>

                   <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center',marginTop:vmax(40),}}>
                        <Text style={styles.text}>手机：</Text>
                        <TextInput 
                        placeholder="请输入手机号"
                          onChangeText={(text)=> {this.setState({telephoneNumber:text}),console.log('text:'+this.state.telephoneNumber)}}
                          textContentType='telephoneNumber' style={{...styles.textinput,width:250}}></TextInput>
                   </View>

                   <View style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center',marginTop:vmax(40)}}>
                        <Text style={styles.text}>密码：</Text>
                        <TextInput 
                           onChangeText={(text)=> {this.setState({password:text}),console.log('text:'+this.state.password)}}
                          textContentType='password' autoComplete='password' style={{...styles.textinput,width:250}}></TextInput>
                   </View>

                  
                   <TouchableOpacity 
                   style={{...styles.button,  marginTop:vmax(100), marginLeft:vmin(160),backgroundColor:'#aedfff'}}
                   onPress={()=>{this.sign(this.state.url,{username:this.state.username,password:this.state.password,phone:this.state.telephoneNumber})}}><Text>注册</Text></TouchableOpacity>
                    
                    <View  style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
                        <Text onPress={()=>{console.log('xxx')}}>注册代表您已同意《陆向谦推荐--用户协议》</Text>
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
        alignItems:'center'
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