import React,{Component} from 'react'
import {Button,Text,View,StyleSheet,Image,TouchableOpacity,FlatList} from 'react-native';
import {vmax,vmin} from '../../util/Viewport'
import { TextInput } from 'react-native-gesture-handler';

export class ProDetails extends Component{
    
    getmyDate() {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth()+1).toString();
        var day = date.getDate().toString();
    
      
        return year+'-'+month+'-'+day;
      }
      
    _setSection(section) {
        this.setState({ activeSection: section });
    }

    _renderHeader(section,isActive) {
        return (
            <View style={styles.active}>
                <Text>{section.title}</Text>
                <Icon name={isActive ? 'ios-arrow-down':'ios-arrow-down'} size={22} color={'#e9e9ef'} style={{paddingHorizontal:p(20)}}/>
            </View>
        );
    }

    _renderContent(section) {
        return (
            <View style={styles.inactive}>
                <Text style={{margin: p(20)}}>{section.content}</Text>
            </View>
        );
    }

    state={
        descrip:'为培养实验室APP开发，产品和UI设计人才，同时完成实验室向新同学展示实验室工作内容的需求。特开发此APP',
        content:'设计规范已经更改多次，并不是一次就确定的。最开始，没有进行产品设计，希望还是照着小程序的样子进行开发，但是考虑到两版小程序都没人用，再照着抄依然没有意义。所以就开始进行产品设计。UI老师也是很有经验，给我们提出，我们作为小众产品，应该从自己着手，做出来的东西自己先用。',
        activeSection: false,
    }
    render(){
        const { navigation } = this.props;
        const title = navigation.getParam('title')
        const context = navigation.getParam('context')
        const set = ()=>{
            this.setState({
                
            })
        }
        return(
            <View>
                {/**header */}
                <View style={{height:vmax(189),justifyContent:"space-around"}}>
                    <View style={styles.header}>
                        <View style={{height:vmax(80),flex:1,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(30),color: "#0068b7"}}>邀请参加</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate('NewTask')
                        }} style={{height:vmax(80),flex:1,backgroundColor: "#0068b7",justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize:vmax(30),color: "#ffffff"}}>查看任务</Text>                            
                        </TouchableOpacity>
                    </View>
                    <View style={{height:vmax(1),backgroundColor:'#eeeeee'}}></View>
                    <TextInput style={styles.descrip}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#4d4d4d",lineHeight:vmax(36)}}>{this.state.descrip}</Text>
                    </TextInput>
                    <View style={{height:vmax(10),backgroundColor:'#eeeeee'}}></View>
                </View>
                    {/**project */}
                <View style={styles.content}>
                     {/**author */}
                    <View style={{height:vmax(59),marginTop:vmax(16),flexDirection:'row'}}>
                        <View style={{height:(50),width:vmin(50),marginTop:vmax(4),marginBottom:vmax(4),marginRight:vmin(11)}}>
                            <Image style={{height:vmin(50),width:vmin(50),borderRadius:vmax(25)}} source={require('../resource/a.jpg')}></Image>
                        </View>
                        <View style={{width:vmin(100),height:vmax(59),marginTop:vmax(4)}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#333333"}}>谢辉</Text>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#cccccc"}}>ui爱好者</Text>
                        </View>
                        <View style={{height:vmax(59),flex:1,flexDirection:'row',paddingTop:vmax(38),alignItems:'flex-start',justifyContent:'flex-end'}}>
                            <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Comment')}} style={{height:vmax(50),width:vmin(100),flexDirection:'row',justifyContent:'center',marginRight:vmin(10)}}>
                                <Image style={{height:vmax(21),marginRight:vmin(6)}} source={require('../resource/收起时评论.png')}></Image>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#333333"}}>评论 3</Text>
                            </TouchableOpacity>
                            <View style={{height:vmax(50),width:vmin(100),flexDirection:'row',justifyContent:'center',marginRight:vmin(28)}}>
                                <Image style={{height:vmax(21),marginRight:vmin(6)}} source={require('../resource/收起时有用.png')}></Image>
                                <Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#333333"}}>有用 3</Text>
                            </View>
                        </View>
                    </View>
                    {/**project-title */}
                    <View style={{height:vmax(16),flex:1,flexDirection:'row',marginTop:vmax(25),justifyContent:'space-between',alignItems:'center'}}>
                       <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize:vmax(32),color: "#333333"}}>产品功能确定</Text>
                            <View style={{height:vmax(30),width:vmin(80),marginLeft:vmin(10),backgroundColor:'#ec6941',borderRadius:vmin(2),alignItems:'center'}}><Text style={{fontFamily: "SimHei",fontSize: vmax(18),color: "#fcfbfa"}}>需求调研</Text></View>
                       </View>
                       <Text style={{fontFamily: "SimHei",fontSize: vmax(16),color: "#333333"}}>{this.getmyDate()}</Text>
                    </View>
                    {/**project-content */}
                    <View style={{height:vmax(180),marginTop:vmax(28),alignItems:'center'}}>
                        <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#8b8a8a",lineHeight:vmax(36)}}>{this.state.content}</Text>
                        <View style={{flexDirection:"row",alignItems:'center'}}>
                            <Text style={{fontFamily: "SimHei",fontSize: vmax(24),color: "#b9e8fc",marginBottom:vmax(24),marginRight:vmin(10)}}>查看更多</Text>
                            <Image style={{height:vmax(6),width:vmin(11),marginBottom:vmax(10)}} source={require("../resource/箭头.png")}></Image>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    style={{backgroundColor:"#ffffff"}}
                   // onEndReached = {this.getInfoMore.bind(this)}
                    renderItem={({item}) => {
                        if(this.state.clickName == item.cat_name){
                            console.log(item.com_name)
                            return(
                                <TouchableOpacity style={{flexDirection: 'row',justifyContent:'space-around',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('IndexDetail',{com_name:item.com_name,description:item.com_des,tags:item.tags,creator:item.team[0].per_name,value:item.invse_guess_particulars,round:item.invse_round_name,com_url:item.com_url})}}>
                                            <Text style={styles.text}>{item.com_name}</Text>
                                            <Text style={styles.text}>{item.invse_year}-{item.invse_month}-{item.invse_day}</Text>
                                            <Text style={styles.text}>{item.invse_guess_particulars}</Text>
                                            <View style={{borderBottomColor:"#d9dada",borderBottomWidth:2}}/>
                                 </TouchableOpacity>
                            )
                        }else if(this.state.clickName == "全部"){
                            return(
                                <TouchableOpacity style={{flexDirection: 'row',justifyContent:'space-around',alignItems:'center'}} onPress={() => this.props.navigation.navigate('IndexDetail',{com_name:item.com_name,description:item.com_des,tags:item.tags,creator:item.team[0].per_name,value:item.invse_guess_particulars,round:item.invse_round_name,com_url:item.com_url})}>
                                            <Text style={styles.text}>{item.com_name}</Text>
                                            <Text style={styles.text}>{item.invse_year}-{item.invse_month}-{item.invse_day}</Text>
                                            <Text style={styles.text}>{item.invse_guess_particulars}</Text>
                                            <View style={{borderBottomColor:"#d9dada",borderBottomWidth:2}}/>
                                 </TouchableOpacity>
                            )
                        }
                    }
                        
                    }
                    refreshing={false}
                    onRefresh={() => {}}
                    onKeyPress={() => { return this.state.key}}
                    onPress={ () => { this.props.navigation.navigate("Search")}}
                />
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
        justifyContent:'center',
        paddingLeft:vmin(25)
      },
})