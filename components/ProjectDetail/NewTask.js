import React,{Component} from 'react'
import {Button,Text,View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {vmax,vmin} from '../../util/Viewport'
import { TextInput } from 'react-native-gesture-handler';

export class NewTask extends Component{
    
    getmyDate() {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
    
      
        return year+'-'+month+'-'+day;
      }
      

    state={
        descrip:'为培养实验室APP开发，产品和UI设计人才，同时完成实验室向新同学展示实验室工作内容的需求。特开发此APP',
        content:'设计规范已经更改多次，并不是一次就确定的。最开始，没有进行产品设计，希望还是照着小程序的样子进行开发，但是考虑到两版小程序都没人用，再照着抄依然没有意义。所以就开始进行产品设计。UI老师也是很有经验，给我们提出，我们作为小众产品，应该从自己着手，做出来的东西自己先用。',
        activeSection: false,
    }
    render(){
        return(
            <View>
                {/**header */}
                <View style={{height:vmax(189),justifyContent:"space-around"}}>
                    <View style={styles.header}>
                        <TouchableOpacity style={{height:vmax(80),flex:1,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(30),color: "#0068b7"}}>邀请参加</Text>
                        </TouchableOpacity>
                        <View style={{height:vmax(80),flex:1,backgroundColor: "#0068b7",justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize:vmax(30),color: "#ffffff"}}>新建任务</Text>                            
                        </View>
                    </View>
                    <View style={{height:vmax(1),backgroundColor:'#eeeeee'}}></View>
                    <TextInput
                        placeholder='编辑项目说明'
                        multiline={true}
                        numberOfLines={2}
                    style={styles.descrip}>
                        
                    </TextInput>
                    <View style={{height:vmax(10),backgroundColor:'#eeeeee'}}></View>
                </View>
                    {/**project */}
                <View style={styles.content}>
                    <View>
                        <TouchableOpacity style={{height:vmax(50),width:vmin(670),flexDirection:'row'}}>
                            {/**小小方框 */}
                            <View style={{opacity: 0.3,height:vmax(50),width:vmax(50),justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:"white",justifyContent:'center',alignItems:'center',backgroundColor: "#36c4ff"}}>
                                <View style={{height:vmax(30),width:vmax(30),borderWidth:vmax(1)}}></View>
                            </View>
                            <View style={{opacity: 0.3,height:vmax(50),width:vmin(670),alignItems:'flex-start',borderWidth:1,borderColor:"white",justifyContent:'center',paddingLeft:2,backgroundColor: "#36c4ff"}}>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>1. 用户访谈问题撰写</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:vmax(50),width:vmin(670),flexDirection:'row'}}>
                            {/**小小方框 */}
                            <View style={{opacity: 0.6,height:vmax(50),width:vmax(50),justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:"white",justifyContent:'center',alignItems:'center',backgroundColor: "#36c4ff"}}>
                                <View style={{height:vmax(30),width:vmax(30),borderWidth:vmax(1)}}></View>
                            </View>
                            <View style={{opacity: 0.6,height:vmax(50),width:vmin(670),alignItems:'flex-start',borderWidth:1,borderColor:"white",justifyContent:'center',paddingLeft:2,backgroundColor: "#36c4ff"}}>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>2. 用户访谈名单</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:vmax(50),width:vmin(670),flexDirection:'row'}}>
                            {/**小小方框 */}
                            <View style={{opacity: 0.3,height:vmax(50),width:vmax(50),justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:"white",justifyContent:'center',alignItems:'center',backgroundColor: "#36c4ff"}}>
                                <View style={{height:vmax(30),width:vmax(30),borderWidth:vmax(1)}}></View>
                            </View>
                            <View style={{opacity: 0.3,height:vmax(50),width:vmin(670),alignItems:'flex-start',borderWidth:1,borderColor:"white",justifyContent:'center',paddingLeft:2,backgroundColor: "#36c4ff"}}>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>3. 用户访谈</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:vmax(50),width:vmin(670),flexDirection:'row'}}>
                            {/**小小方框 */}
                            <View style={{opacity: 0.6,height:vmax(50),width:vmax(50),justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:"white",justifyContent:'center',alignItems:'center',backgroundColor: "#36c4ff"}}>
                                <View style={{height:vmax(30),width:vmax(30),borderWidth:vmax(1)}}></View>
                            </View>
                            <View style={{opacity: 0.6,height:vmax(50),width:vmin(670),alignItems:'flex-start',borderWidth:1,borderColor:"white",justifyContent:'center',paddingLeft:2,backgroundColor: "#36c4ff"}}>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>添加</Text></View>
                        </TouchableOpacity>
                        
                    </View>
                   
                </View>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('EditTask')
                }} style={{width:'100%',height:vmax(98),backgroundColor: "#eb6100",justifyContent:'center',alignItems:'center',position:'relative',bottom:vmax(-515)}} >
                    <Text style={{fontFamily: "SimHei",fontSize: vmax(42),color: "#ffffff"}}>上传任务</Text>
                </TouchableOpacity>
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
        height:vmax(330),
        paddingLeft:vmin(25),
        paddingTop:vmax(21)

      },
})