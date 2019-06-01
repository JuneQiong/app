import React,{Component} from 'react'
import {View,Text,Button,NativeModules } from 'react-native'
import { createBottomTabNavigator,createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import IndexScreen from './components/home/CompanyScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MineScreen } from './components/home/MineNew';
import { SearchScreen } from './components/chollima/Search';
import { CollectScreen } from './components/mine/CollectScreen';
import { LoginScreen } from './components/mine/Login';
import { ExamSreen } from './components/mine/Exam';
import { VoiceScreen } from './components/mine/Voice';
import { LessonScreen } from './components/mine/Lesson';
import { Company } from './components/mine/Company';
import { Industry } from './components/mine/Industry';
import { Career } from './components/mine/Career';
import { Entre } from './components/mine/Entre';
import { FeedBack } from './components/mine/FeedBack';
import IndexDetial from './components/chollima/CompanyDetaill';
import Shouye from './components/home/Shouye';
import { Create } from './components/ProjectDetail/Create';
import { ProDetails } from './components/ProjectDetail/ProDetails';
import { Comment } from './components/ProjectDetail/Comment';
import { SignScreen } from './components/mine/Sign';
import { NewTask } from './components/ProjectDetail/NewTask';
import EditTask from './components/ProjectDetail/EditTask';
import { CompanyList } from './components/chollima/CompanyList';


const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === '首页') {

    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    // We want to add badges to home tab icon
    //IconComponent = HomeIconWithBadge;
  } else if (routeName === '公司') {
    iconName = `ios-list${focused ? '' : '-box'}`
  } else if (routeName === '我的') {
    iconName = `ios-add-circle${focused ? '' : '-outline'}`;
  } 

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const CompanyStack = createStackNavigator({
  Home: { screen: CompanyList,  
          title:"陆向谦推荐"
  },

  Search: { screen: SearchScreen ,
    navigationOptions: () => ({
      title: `公司搜索`,
      headerBackTitle: "陆向谦推荐"
    }),
  },
  IndexDetail: { screen: IndexDetial }
});

const IndexStack = createStackNavigator({
  shouye: {screen: Shouye},
  Login:{ screen: LoginScreen},
  //Details: { screen: NewsDetails },
});

const MineStack = createStackNavigator({
  Mine: { screen: MineScreen },
  Collect: { screen: CollectScreen },
 // Login:{ screen: LoginScreen},
  Lesson:{ screen: LessonScreen},
  Exam:{screen:ExamSreen},
  Voice:{screen:VoiceScreen},
  Company:{screen:Company},
  Industry:{screen:Industry},
  Career:{screen:Career},
  Entre:{screen:Entre},
  FeedBack:{screen:FeedBack},
  Create : { screen: Create},
  ProDetails: { screen: ProDetails},
  Comment:{screen:Comment},
  Sign:{screen:SignScreen},
  NewTask:{screen:NewTask},
  EditTask:{screen:EditTask}
});


const TabNavigator = createBottomTabNavigator(
    {
      
      "首页":Shouye,
      "公司":CompanyStack,
      "我的":MineStack,
    },
    {
      defaultNavigationOptions:({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => 
          getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
          activeTintColor: '#1E90FF',
          inactiveTintColor: 'gray',
        },
      }
);



const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
  render() {
    return (
       <AppContainer />
    );
  }
} 