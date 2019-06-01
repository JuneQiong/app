import React,{Component} from 'react'
import {Text,View,StyleSheet,TextInput,Picker,TouchableOpacity,KeyboardAvoidingView,ToastAndroid} from 'react-native';
import {vmax,vmin} from '../../util/Viewport'
import moment from 'moment'; 

export class Create extends Component{

    getMyData(){
        var date = new Date();
        var timeT = date.getTime();
        var time =  moment(timeT).format("YYYY-MM-DD HH:mm:ss");
        return time;
    }

    

    createProject(url,params){
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
        if(this.state.participate===''){
            ToastAndroid.showWithGravityAndOffset(
                "参与人至少有一个",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }else if(this.state.project_name===''){
            ToastAndroid.showWithGravityAndOffset(
                "项目名不能为空",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }else{
            this.createProject(this.state.url,
                {project_name:this.state.project_name,
                creater:this.state.creater,
                participate:this.state.participate,
                sumary:this.state.sumary,
                project_type:this.state.project_type

                })  
            if(this.state.data==='成功'){
                    console.log('成功')
                    this.props.navigation.push('shouye',{project_name:this.state.project_name,
                        creater:this.state.creater,
                        participate:this.state.participate,
                        sumary:this.state.sumary})
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
        department:'项目类型',
        url:'http://192.168.43.19:8080/project/add',
        project_name:'',
        creater:'wuhuiqiong',
        participate:'',
        sumary:'',
        project_type:'',
        data:''
        }
    render(){
        return(
            <View style={{alignItems:'center',backgroundColor: "#eeeeee",flex:1}}> 
                {/**bai'se 框 */}
                <KeyboardAvoidingView style={styles.view}>
                    <View style={{marginTop:vmax(30),marginRight:vmax(43),flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{...styles.text,color:'#333333'}}>提出项目</Text>
                        <View style={{flexDirection:'row',marginRight:vmin(40)}}>
                        </View>
                    </View>
                    <View style={{height:vmax(42),marginTop:vmax(47),borderBottomWidth:1,borderBottomColor:'#0068b7'}}>
                        <TextInput autoFocus={true} onChangeText={(text)=>{
                            this.setState({participate:text})
                        }} placeholder="输入公司或团队" placeholderTextColor='#bbbbbb' style={{padding:0,fontSize: vmax(36),}}></TextInput>
                    </View>
                    <View style={{height:vmax(42),marginTop:vmax(56),borderBottomWidth:1,borderBottomColor:'#0068b7'}}>
                        <TextInput onChangeText={(text)=>{
                            this.setState({project_name:text})
                        }} placeholder="项目名称" placeholderTextColor='#bbbbbb' style={{padding:0,fontSize: vmax(36),}}></TextInput>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Picker
                            prompt='项目类型'
                            selectedValue={this.state.sumary}
                            pickerStyleType 
                            style={{ height: vmax(60), width: vmin(130),marginBottom:vmax(40),marginTop:vmax(40)}}
                            onValueChange={(itemValue) => this.setState({project_type: itemValue})}>
                            <Picker.Item label="产品" value="产品" />
                            <Picker.Item label="营销" value="营销" />
                            <Picker.Item label="运营" value="运营" />
                            <Picker.Item label="技术" value="技术" />
                            <Picker.Item label="UI" value="UI" />
                        </Picker>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("shouye")}} 
                                style={{marginRight:vmin(70)}}><Text style={{fontFamily: "SimHei",fontSize:vmax(22),color: "#333333"}}>取消</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                               this.create()                            
                            }}><Text style={{fontFamily: "SimHei",fontSize:vmax(22),color: "#333333"}}>创建</Text></TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    view:{
        height:vmax(400),
        width:vmin(700),
        marginTop:vmax(264),
        backgroundColor:'#ffffff',
        paddingLeft:vmin(43),
        paddingRight:vmin(40),
        paddingBottom:vmax(40)
    },
    text:{
        fontFamily: "SimHei",
        fontSize: vmax(36),
        color: "#bbbbbb"
    }
})