import React,{Component} from 'react'
import {View,Text,Button,Image } from 'react-native'

export class LessonScreen extends Component{
    render(){
        return(
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={{height:300,width:300,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:150,height:150,marginLeft:5}} source={require("../resource/lesson.png")} />
                    <Text  style={{fontSize:24,marginTop:20}}>暂无课程</Text>
                </View>
                
            </View>
        )
    }
}