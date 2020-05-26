import * as React from 'react';
import { ScrollView, View,StyleSheet ,UIManager,Platform,LayoutAnimation,Image,Text,TextInput,FlatList,TouchableOpacity,Linking,SafeAreaView,} from 'react-native';
import Constants from 'expo-constants';

import styles from '../assets/css/css';

import Icons from 'react-native-vector-icons/MaterialIcons';
import ArrowRight from 'react-native-vector-icons/AntDesign';
const Lists=require('./database2.json');

class SearchWords extends React.Component{
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '',trans: '' };
    this.arrayholder = [];
  }
  componentDidMount() {
    
    this.setState(
      {
        isLoading: false,
        dataSource: Lists,
      },
      function() {
        this.arrayholder = Lists;
      }
    );
  }

  clear = () => {
    this.setState({
      search:'',
      trans:'',
    })
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.word ? item.word.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
{/*
  const notFound= [{
    "description": " ",
    "isExpanded": false,
    "pronounce": " ",
    "word": "Không tìm thấy kết quả nào!"
}];*/
}
    
  if(text.length<1){
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
      trans: '',
    });
  }
  else{
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
      trans: (newData.length>0)?newData:'',
    });
  }
  }


  BannerTrans=()=>{
    return(
      <View>
        {/*banner main */}
      <View style={styles.banner}>
        <View style={{flexDirection:'row',}}>
            <TouchableOpacity  onPress={this._Done}>
              <Icons name={'arrow-back'} size={30} color='#fff' />
            </TouchableOpacity>
            <Text style={[styles.paragraph,{marginHorizontal:20}] }>
              Tra từ
            </Text>
        </View>
      </View>     
        {/*banner translate*/}
      <View style={{flexDirection:'row',backgroundColor:'#237921'}} >
        <Text style={[styles.text,{flex:2,color:'#ffffff',fontWeight: 'bold',}]}>English</Text>
        <ArrowRight name={'arrowright'} size={25} color='#fff' style={{flex:0.5, alignContent:'center', alignSelf:'center'}} />
        <Text style={[styles.text,{flex:2,color:'#ffffff',fontWeight: 'bold',}]}>Vietnamese</Text>
      </View>

  </View>
    );
  }

  InputSearch=()=>{
    return(
      <View style={{marginTop:20,flexDirection:'row'}} >
      
        <TextInput 
          style={{flex:4,height:60,borderWidth:1,borderColor:'#dfeae1',marginLeft:10,paddingHorizontal:20,fontSize:20,backgroundColor:'#ffffff'}} 
          placeholder="Nhập từ cần tìm vào đây"
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.search}
        />
        <TouchableOpacity
          style={{flex:0.5,height:60,borderWidth:0.5,borderColor:'#dfeae1',paddingTop:12.5,alignContent:'center',alignItems:'center',marginRight:10,backgroundColor:'#ffffff'}}
          onPress={this.clear}>
              <ArrowRight name='close' size={25} color='#000' />
        </TouchableOpacity>
       </View>
      
    );
  }

  InputTrans=()=>{
    if(this.state.trans.length>0){
      return(
     
        <FlatList
          data={this.state.trans}
          
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
              <View style={[{marginHorizontal:10,marginTop:10,width:'95%',backgroundColor:'#235915',minHeight:60}]}>
              <Text style={[styles.text,{color:'#ffffff'}]}>+ {item.word}</Text>
              <Text style={[styles.text,{color:'#ffffff'}]}>-> {item.description}</Text>
            </View>
          )}
         
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
 
    );
    }
    else{
      return(
        <View style={[{marginHorizontal:10,marginTop:10,width:'95%',backgroundColor:'#235915',minHeight:60}]}>
          <Text style={[styles.text,{color:'#ffffff'}]}>Không tìm thấy kết quả nào! </Text>
        </View>
      )
    }
  }

  render(){
    return (
      <SafeAreaView  style={styles.container}>

        <View style={{backgroundColor:'#f8fff9'}}>
          {this.BannerTrans()}   
          {this.InputSearch()}
          <Text style={[styles.text,{color:'#000'}]}>Gợi ý</Text>
          {this.InputTrans()}
        </View>
      </SafeAreaView >
  );
  }
  _Done= async () => {
    this.props.navigation.navigate('Menu');
    }
}

export default SearchWords;