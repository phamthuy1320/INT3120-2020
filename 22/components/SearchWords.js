import * as React from 'react';
import { ScrollView, View,StyleSheet ,UIManager,Platform,LayoutAnimation,Image,Text,TextInput,FlatList,TouchableOpacity,Linking,SafeAreaView,} from 'react-native';

import styles from '../assets/css/css';

import Icons from 'react-native-vector-icons/MaterialIcons';
import ArrowRight from 'react-native-vector-icons/AntDesign';
const Lists=require('../assets/data/database2.json');

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
        <Text style={[styles.text,{color:'#ffffff',fontWeight: 'bold',marginLeft:20}]}>English</Text>
        <ArrowRight name={'arrowright'} size={25} color='#fff' style={{ alignContent:'center', alignSelf:'center',marginHorizontal:70}} />
        <Text style={[styles.text,{color:'#ffffff',fontWeight: 'bold',marginRight:20}]}>Vietnamese</Text>
      </View>

  </View>
    );
  }

  InputSearch=()=>{
    return(
      <View style={{marginTop:20,flexDirection:'row',height:60,borderWidth:1,borderColor:'#dfeae1',marginHorizontal:10,backgroundColor:'#ffffff'}} >
      
        <TextInput 
        style={{fontSize:20,width:'90%',marginLeft:10}}
          placeholder="Nhập từ cần tìm vào đây"
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.search}
        />
        <ArrowRight name='close' size={25} color='#000' onPress={this.clear} style={{alignSelf:'center'}}/>
       
       </View>
      
    );
  }

  InputTrans=()=>{
    if(this.state.trans.length>0){
      return(
     <View>
        <FlatList
          data={this.state.trans}
          
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <View style={[styles1.item]}>
              <Text style={[styles1.text,]}>{item.word}</Text>
              <Text style={[styles1.text,{color:'#237921'}]}>/{item.pronounce}/</Text>
              <Text style={[styles1.text,]}>{item.description}</Text>
            </View>
          )}
         
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
     </View>
    );
    }
    else{
      return(
        <View style={[styles1.item]}>
          <Text style={[styles1.text]}>Không tìm thấy kết quả nào! </Text>
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

const styles1=StyleSheet.create({
  text:{
    fontSize:20,
  },
  item:{
    marginHorizontal:10,
    marginTop:10,
    width:'95%',
    backgroundColor:'#c9fbcb',
    minHeight:60,
    padding:10
  }
})