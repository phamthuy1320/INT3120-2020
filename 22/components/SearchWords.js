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
    this.state = { isLoading: true, search: '' };
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

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.word ? item.word.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
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
      <View style={{flexDirection:'row',flex:1,backgroundColor:'#237921'}} >
        <Text style={[styles.text,{flex:1,color:'#ffffff',fontWeight: 'bold',}]}>English</Text>
        <TouchableOpacity style={{flex:1, alignContent:'center', alignSelf:'center'}}>
          <ArrowRight name={'arrowright'} size={25} color='#fff' />
        </TouchableOpacity>
        <Text style={[styles.text,{flex:1,color:'#ffffff',fontWeight: 'bold',}]}>Vietnamese</Text>
      </View>

  </View>
    );
  }

  InputSearchAndTrans=()=>{
    return(
      <View style={{marginTop:20}} >
        <TextInput 
          style={{height:200,borderWidth:1,borderColor:'#dfeae1',marginHorizontal:10,paddingHorizontal:20,fontSize:20,backgroundColor:'#ffffff'}} 
          placeholder="Nhập từ cần tìm vào đây"
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          value={this.state.search}
        />
         <View style={[styles.container2]}>
          
         <FlatList
          data={this.state.dataSource}
          
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
	        <TouchableOpacity style={[styles.button,{width:'100%',height:200,backgroundColor:'blue',}]}>
            <Text style={[styles.text,{color:'#ffffff'}]}>{item.description}</Text>
	        </TouchableOpacity>
          )}
         
          style={{ width:'100%' }}
          keyExtractor={(item, index) => index.toString()}
        />
       </View>
      </View>
    );
  }

 /* InputTrans=()=>{
    return(
      <View style={[styles.container2]}>
        <View style={[styles.button,{width:'100%',height:200,backgroundColor:'blue',}]}>
          <Text style={[styles.text,{color:'#ffffff'}]}>{this.state.dataSource.word}</Text>
        </View>
      </View>
    );
  }*/

  render(){
    return (
      <ScrollView style={{marginTop: Constants.statusBarHeight,backgroundColor:'#f8fff9'}} stickyHeaderIndices={[0]}>
            {this.BannerTrans()}
            {this.InputSearchAndTrans()}
            {/*this.InputTrans()*/}
      </ScrollView>
  );
  }
  _Done= async () => {
    this.props.navigation.navigate('Menu');
    }
}

export default SearchWords;