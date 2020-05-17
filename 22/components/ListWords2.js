import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialIcons';

import styles from '../assets/css/css';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Titles= require('./database.json');

export default class ListWords extends React.Component {
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
        dataSource: Titles,
      },
      function() {
        this.arrayholder = Titles;
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
      const itemData = item.key ? item.key.toUpperCase() : ''.toUpperCase();
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



  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.container}>
       <View>
        <View style={styles.banner}>
          <View style={{flexDirection:'row',}}>
          <TouchableOpacity  onPress={this._Done}>
            <Icons name={'arrow-back'} size={30} color='#fff' />
          </TouchableOpacity>
          <Text style={[styles.paragraph,{marginHorizontal:20}] }>
            Danh sách từ vựng
          </Text>
          </View>
          
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
        <FlatList
          data={this.state.dataSource}
          
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
	        <TouchableOpacity style={styles1.button}>
            <Text style={styles.text}>{item.key}</Text>
	        </TouchableOpacity>
          )}
         
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
 _Done = async () => {
    this.props.navigation.navigate('Menu');
  };
}
const styles1 = StyleSheet.create({
  button: {
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical:5,
    backgroundColor: '#ffffff',
    height: 60,
    borderWidth: 1,
    borderColor: '#dfeae1',
  },
});
const styles2 = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
  textStyle: {
    padding: 10,
  },
});