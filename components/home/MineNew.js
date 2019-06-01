import React,{Component} from 'react'
import {View,TouchableHighlight,Text,Button,TouchableOpacity ,Image,StyleSheet} from 'react-native'
import {vmin,vmax} from '../../util/Viewport'

export class MineScreen extends Component{
   
    state={
        active:true,
    }
    
    render(){
        return(
            <View>
                <View style={{paddingTop:vmax(30),flexDirection:'row'}}>
                    <View style={{height:vmax(150),width:vmax(150),borderColor: "#cccccc",marginLeft:vmin(30),borderRadius:vmax(13),borderWidth:vmax(1)}}>
                        <Image style={{height:vmax(150),width:vmax(150),borderRadius:vmax(13)}} source={require('../resource/LU.png')}>
                        </Image>
                    </View>
                    <View style={{marginLeft:vmin(20)}} onPress={()=>{this.props.navigation.navigate('Login')}}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(36),color: "#333333"}}>谢辉</Text>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333",marginTop:vmax(17)}}>UI爱好者</Text>
                    </View>
                </View>
                <View style={{height:vmax(1),width:'100%',backgroundColor: "#eeeeee",borderWith:vmax(1),marginTop:vmax(30)}}></View>
                <View style={{paddingLeft:vmin(22),height:vmax(90),flexDirection:'row'}}>
                    <TouchableHighlight style={{height:vmax(90),width:vmin(166),borderRadius: vmax(13),justifyContent:'space-around',alignItems:'center',marginRight:vmin(7)}} 
                        underlayColor='#eeeeee' 
                        onPress={() => { this.props.navigation.navigate("Login")}}
                        >
                       <View style={{alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>0</Text>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>参与的项目</Text>
                       </View>
                    </TouchableHighlight>
                    <View style={{width:vmin(1),height:vmax(42),backgroundColor: "#eeeeee",marginTop:vmax(24)}}></View>
                    <TouchableHighlight style={{height:vmax(90),width:vmin(166),borderRadius: vmax(13),justifyContent:'space-around',alignItems:'center',marginRight:vmin(7),marginLeft:vmin(7)}} 
                        underlayColor='#eeeeee' 
                        onPress={() => { this.props.navigation.navigate("Mine")}}
                        >
                       <View style={{alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>0</Text>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>创建的项目</Text>
                       </View>
                    </TouchableHighlight>
                    <View style={{width:vmin(1),height:vmax(42),backgroundColor: "#eeeeee",marginTop:vmax(24)}}></View>
                    <TouchableHighlight style={{height:vmax(90),width:vmin(166),borderRadius: vmax(13),justifyContent:'space-around',alignItems:'center',marginRight:vmin(7),marginLeft:vmin(7)}} 
                        underlayColor='#eeeeee' 
                        onPress={() => { this.props.navigation.navigate("Mine")}}
                        >
                       <View style={{alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>0</Text>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>看好公司</Text>
                       </View>
                    </TouchableHighlight>
                    <View style={{width:vmin(1),height:vmax(42),backgroundColor: "#eeeeee",marginTop:vmax(24)}}></View>
                    <TouchableHighlight style={{height:vmax(90),width:vmin(166),borderRadius: vmax(13),justifyContent:'space-around',alignItems:'center',marginLeft:vmin(7)}} 
                        underlayColor='#eeeeee' 
                        onPress={() => { this.props.navigation.navigate("Mine")}}
                        >
                       <View style={{alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>0</Text>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>最近浏览</Text>
                       </View>
                    </TouchableHighlight>
                </View>
                <View style={{height:vmax(1),width:'100%',backgroundColor: "#eeeeee",borderWith:vmax(1)}}></View>
                <View style={{marginLeft:vmin(20),marginTop:vmax(20)}}>
                    <TouchableOpacity style={{height:vmax(60),width:vmin(700),justifyContent:'center',paddingLeft:vmin(24),borderColor:'#eeeeee',borderWidth:vmax(1)}}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>1、陆向谦推荐APP产品设计</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:vmax(60),width:vmin(700),justifyContent:'center',paddingLeft:vmin(24),borderColor:'#eeeeee',borderWidth:vmax(1),marginTop:vmax(10)}}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>2、在各个互联网自媒体平台运营上架课程</Text>
                    </TouchableOpacity>
                    <View style={{justifyContent:'center',paddingTop:vmax(50),alignItems:'center'}}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#999999"}}>还没创建项目~~~</Text>
                    </View>
                </View>
            </View>
        )
    }
}
