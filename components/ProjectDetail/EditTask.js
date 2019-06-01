import React,{Component} from 'react'
import {Button,Text,View,StyleSheet,ToastAndroid,Image,TouchableOpacity} from 'react-native';
import {vmax,vmin} from '../../util/Viewport'
import { TextInput } from 'react-native-gesture-handler';

export default class EditTask extends Component {

    createTask(url,params){
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
                    data:responseJson.msg
                })
            }).catch((error) => {
               console.error(error);
             })
         )
    } 
    create(){
        if(this.state.theme===''){
            ToastAndroid.showWithGravityAndOffset(
                '请填写主题',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }else if(this.state.content===''){
            ToastAndroid.showWithGravityAndOffset(
                "内容不能为空",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }else{
            this.createTask(this.state.url,
                {title:this.state.theme,
                    author:'111',
                    context:this.state.content,
                    type:'1111',
                    participate:'1111'

                }) 
            if(this.state.data==='成功'){
                    console.log('成功')
                    this.props.navigation.push('ProDetails',{
                        title:this.state.theme,
                        context:this.state.content,
                      })
                    ToastAndroid.showWithGravityAndOffset(
                        "创建成功",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      );
                     
                }
        }
        
        
    }

    state={
        theme:'xxv',
        content:'xxc',
        data:'',
        url:'http://192.168.43.19:8080/article/add'
    }
    render() {
      return (
       <View>
           {/**需求调研头部 */}
            <View style={{paddingLeft:vmin(35),paddingRight:vmin(35),paddingTop:vmax(49),height:vmax(128),width:'100%',backgroundColor:'#0068b7',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProDetails')}}>
                    <Image style={{height:vmax(32),height:vmax(32)}} source={require('../resource/取消白色.png')}></Image>
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontFamily: "SimHei",fontSize: vmax(36),color: "#ffffff"}}>需求调研</Text>
                    <View style={{marginBottom:vmax(18)}}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#ffffff"}}>陆向谦推荐APP产品设计<Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#fefefe"}}>在</Text>任务ing  <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#ffffff"}}>中</Text></Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={()=>{
                        this.create()
                    }}
                > 
                    <Image style={{height:vmax(32),height:vmax(32)}} source={require('../resource/发送白色.png')}></Image>
                </TouchableOpacity>
            </View>
            {/**编辑区域 */}
            <View >
                <View style={{height:vmax(120),width:vmin(640),marginLeft:vmin(30),marginTop:vmax(32)}}>
                    <View style={{height:vmax(31),}}>
                        <TextInput placeholder='请输入主题' placeholderTextColor='#bbbbbb' paddingBottom={0}
                            style={{height:vmax(80),fontSize:vmax(30),borderBottomColor:'#0068b7',borderBottomWidth:vmax(1)}}
                            autoFocus={true}
                            onChangeText={(text)=>{ this.setState({theme:text})}}
                            ></TextInput>
                    </View>
                    <View style={{height:vmax(31),marginTop:vmax(100)}}>
                        <TextInput placeholder='请描述过程' placeholderTextColor='#bbbbbb' paddingBottom={0}
                            style={{textAlignVertical: 'top',height:vmax(300),fontSize:vmax(30),borderColor:'#0068b7',borderWidth:vmax(1)}}
                            autoFocus={true}
                            multiline={true}
                            //onBlur={(text)=>{this.setState({content:text}),console.log('content:',this.state.content)}}
                            numberOfLines={30}
                            onChangeText={(text)=>{this.setState({content:text}),console.log('content:',this.state.content)}}
                        
                            ></TextInput>
                    </View>
                </View>
                
            </View>
       </View>
      );
    }
  }

