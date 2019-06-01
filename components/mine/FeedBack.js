import React,{Component} from 'react'
import {View,Text,Button,Image } from 'react-native'

export class FeedBack extends Component{
    render(){
        return(
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={{height:300,width:300,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:150,height:150,marginLeft:5}} source={require("../resource/ch.png")} />
                    <Text  style={{fontSize:24,marginTop:20}}
                        onPress={() => { this.props.navigation.navigate('Collect')}}
                    >暂无反馈，去添加 ^ v ^</Text>
                </View>
                
            </View>
        )
    }
}