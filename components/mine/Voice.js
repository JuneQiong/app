import React,{Component} from 'react'
import {View,TouchableOpacity,Text,Button ,Image,StyleSheet,NativeModules,DeviceEventEmitter,Slider} from 'react-native'
const { AsrModule , WpModule,TTsModule,} = NativeModules

DeviceEventEmitter.addListener('baidu.asr.event',(res) => {
    if(res.params){
        console.log(JSON.parse(res.params))
    }
  })
  
  DeviceEventEmitter.addListener('baidu.wp.event',(res) => {
     console.log(res)
     TTsModule.speech("我是小度，请讲","0").then(res =>{
      console.log(res)
     }).catch(err => {
      console.log(err)
     })
  })

export class VoiceScreen extends Component{
    render(){
        return(
            <View>
                <View>
                   <Text>语音测试</Text>
                   <Button 
                            title={"开启语音识别"}
                            onPress={() =>{
                                AsrModule.start().then(res =>{
                                    console.log(res)
                                }).catch(err => {
                                    console.log(err)
                                })
                            }}
                        />
                        <Button 
                            title={"停止语音识别"}
                            onPress={() =>{
                                AsrModule.stop().then(res =>{
                                    console.log(res)
                                }).catch(err => {
                                    console.log(err)
                                })
                        }}
                        />
                        <Button 
                            title={"取消语音识别"}
                            onPress={() =>{
                                AsrModule.cancel().then(res =>{
                                    console.log(res)
                                }).catch(err => {
                                    console.log(err)
                                })
                        }}
                        />
                        <Button 
                            title="开启语音唤醒"
                            onPress = {() => {
                                WpModule.start().then(res =>{
                                    console.log(res)
                                }).catch(err => {
                                    console.log(err)
                                })
                            }}
                        />
                </View>
            </View>
        )
    }
}