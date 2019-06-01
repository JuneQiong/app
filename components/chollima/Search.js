import React,{Component} from 'react'
import {View,Text,Button ,TextInput,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import {vmax,vmin,} from '../../util/Viewport'


export class SearchScreen extends Component{

    searchInfo(url,params){
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
                     searchResponse:responseJson
                 })
                 console.log(this.state.searchResponse)
             }).catch((error) => {
                console.error(error);
              })
         )
    } 
   
    state={
        searchContent:'',
        url:'https://wxapp.proflu.cn/profluweb/wxapp/company/queryCompany',
        searchResponse:[]
    }

    render(){
        return(
            <View>
                <View style={{ flexDirection:"row", justifyContent:"space-around" , alignItems :"center",  backgroundColor:"#0068b7", borderTopColor: '#0068b7',paddingBottom:20}}>
                    <TextInput  
                        style={styles.textinput} 
                        keyboardType='default'
                        blurOnSubmit={true} 
                        /* autoFocus={true} */
                        onKeyPress={() => {}} 
                        placeholder="请输入公司名进行搜索"
                        placeholderTextColor="grey" 
                        onChangeText={(response) => {
                            this.setState({
                                searchContent:response
                            })
                        }}
                        onEndEditing={()=>{ this.searchInfo(this.state.url,{company:this.state.searchContent})
                    }}
                        /> 
                       
                </View>
                <ScrollView showsVerticalScrollIndicator={true}  alwaysBounceVertical={true}>
                    <View style={{height:40,borderBottomColor:'#bfbfbf',borderBottomWidth:1,justifyContent:"center"}}>
                        <Text style={{marginLeft:15}}>热门搜索</Text>
                    </View>
                    <View style={{borderBottomColor:'#bfbfbf',borderBottomWidth:5,paddingBottom:15}}>
                        <View style={{flexDirection:'row'}}> 
                                <TouchableOpacity style={{...styles.hotsearch,marginTop:20}}><Text>今日头条</Text></TouchableOpacity>
                                <TouchableOpacity style={{...styles.hotsearch,marginTop:20}}><Text>蚂蚁金服</Text></TouchableOpacity>
                                <TouchableOpacity style={{...styles.hotsearch,marginTop:20}}><Text>阿里云</Text></TouchableOpacity>
                                <TouchableOpacity style={{...styles.hotsearch,marginTop:20}}><Text>百度</Text></TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row'}}> 
                                <TouchableOpacity style={{...styles.hotsearch,marginTop:20}}><Text>陆金所</Text></TouchableOpacity>
                                <TouchableOpacity style={{...styles.hotsearch,marginTop:20}}><Text>腾讯音乐娱乐集团</Text></TouchableOpacity>
                                <TouchableOpacity style={{...styles.hotsearch,marginTop:20}}><Text>大疆无人机</Text></TouchableOpacity>
                                <TouchableOpacity style={{...styles.hotsearch,marginTop:20}}><Text>京东数科</Text></TouchableOpacity>
                            </View>
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:40,borderBottomColor:'#bfbfbf',borderBottomWidth:1,justifyContent:"center"}}>
                            <Text style={{marginLeft:15,marginRight:120}}>已关注</Text>
                            <TouchableOpacity style={styles.hotsearch}><Text>关注</Text></TouchableOpacity>
                    </View>
                    <View style={{borderBottomColor:'#bfbfbf',borderBottomWidth:5,paddingBottom:10,paddingTop:10}}>
                            <Text style={{alignItems:'center',justifyContent:'space-around'}}>无</Text>
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:40,borderBottomColor:'#bfbfbf',borderBottomWidth:1,justifyContent:"center"}}>
                            <Text style={{marginLeft:15,marginRight:120}}>搜索结果</Text>
                    </View>
                    <FlatList
                        data={this.state.searchResponse}
                        renderItem={({item}) => (
                            <View style={{height:vmax(70),flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:vmin(20)}}>
                                <Text>{item.comCompany}</Text>
                                <TouchableOpacity style={{height:vmax(60),width:vmin(120),backgroundColor:'#f7f7f7',alignItems:'center',justifyContent:'center',marginRight:vmin(20)}}><Text>关注</Text></TouchableOpacity>
                            </View>
                        )}
                    ></FlatList>
               </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    textinput:{
        height: 45,
        width: 300, 
        borderColor:'#ffffff',
        backgroundColor:'#ffffff',
        borderWidth:2,
       marginTop:20,
       borderRadius:15,
       alignItems:'flex-start',
       justifyContent:'flex-start',
       padding: 0,
       paddingLeft:vmin(20)
    },
    hotsearch:{
        backgroundColor:'#bfbfbf',
        height:30,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
        borderRadius:10,
    }
})