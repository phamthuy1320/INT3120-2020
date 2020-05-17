import * as React from 'react';
import { Button,ScrollView, View,StyleSheet ,UIManager,Platform,LayoutAnimation,Image,Text,TextInput,FlatList,TouchableOpacity,Linking,SafeAreaView,} from 'react-native';
import Constants from 'expo-constants';

import styles from '../assets/css/css';
import { SearchBar } from 'react-native-elements';

const Lists=require('./databaseTick.json');

class Menu2 extends React.Component {
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
  

  Headder=()=>{
    return(
      <View>
      <View style={styles.banner}>
          <Text style={[styles.paragraph,{ textAlign: 'center'}]}>3000 Từ vựng Tiếng Anh</Text>
      </View>
      
     <SearchBar
          round
          searchIcon={{ size: 24 }}
          leftIconContainerStyle={{backgroundColor:'white'}}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Nhập chủ đề cần tìm..."
          inputContainerStyle={{backgroundColor:'white'}}
          containerStyle={{backgroundColor:'#237921'}}
          value={this.state.search}
     />
     
  </View>
    );
  }

  
MenuList=()=>{
    return(
      <View style={styles.container2}>
        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/star.png')}/>
          <Text style={styles.text} onPress={this._Tick}>Từ đã học</Text>
        </View>
        
         <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/list.png')}/>
          <Text style={styles.text} onPress={this._List}>Danh sách từ</Text>
          </View>

         <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/add.png')}/>
          <Text style={styles.text} onPress={this._Add}>Thêm từ</Text>
        </View>
        
        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/book.png')}/>
          <Text style={styles.text} onPress={this._Tutorial}>Hướng dẫn</Text>
        </View>
        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/icon/search.png')}/>
          <Text style={styles.text} onPress={this._Search}>Tìm Kiếm</Text>
          </View>
        {//<View style={[styles.button,{justifyContent: 'center', backgroundColor:'red'}]}>
          //<Text style={[styles.text,{color:'#ffffff'}]} onPress={this._Back} >Trở về</Text>
        //</View>
        }
      </View>
    );
  }

  OtherApps=()=>{
    return(
      <View style={styles.container2}>
        <Text style={{fontSize: 20,color:"#00bcd4",}} >Ứng dụng học Tiếng Anh khác</Text>
        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/img/doulingo.png')}/>
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.duolingo&hl=vi')}>
            <Text style = {styles.text}>Duolingo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/img/tflat.png')}/>
         
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.vn.dic.e.v.ui&hl=vi')}>
            <Text style = {styles.text}>Từ điển TFlat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/img/giao_tiep.png')}/>
         
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.ndm.tienganh&hl=vi')}>
            <Text style = {styles.text}>Tiếng anh giao tiếp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Image style={styles.icon} source={require('../assets/img/ngu_phap.png')}/>
         
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bkit.congthuctienganh&hl=vi')}>
            <Text style = {styles.text}>Công thức Tiếng Anh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  render(){
    return (
  <ScrollView style={{marginTop: Constants.statusBarHeight,backgroundColor:'#f8fff9'}} stickyHeaderIndices={[0]}>
        {this.Headder()}
        
        {this.MenuList()}
        {this.OtherApps()}

    </ScrollView>
  );
  
  }
  _Tick= async () => {
    this.props.navigation.navigate('Tick');
    }
  _Tutorial= async () => {
    this.props.navigation.navigate('Tutorial');
    }
  _List= async () => {
    this.props.navigation.navigate('List');
    }
  _Add= async () => {
    this.props.navigation.navigate('Add');
    }
  _Search= async () => {
    this.props.navigation.navigate('Search');
    }
  _Back= async () =>{
     this.props.navigation.navigate('Welcome');
  }
}

const styles1 = StyleSheet.create({
 

  text1:{
    fontSize: 20,
    color:"#00bcd4",
  },
  text: {
    paddingVertical:10,
    fontSize: 20,
    marginLeft: 15,
  },
});
export default Menu2;