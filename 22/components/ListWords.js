import * as React from 'react';
import {Text,View,StyleSheet,FlatList,ActivityIndicator,UIManager,Platform,LayoutAnimation,} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialIcons';

import styles from '../assets/css/css';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Titles= require('../assets/data/database.json');

         
export default class ListWords extends React.Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    //setting default state
    this.state = { isLoading: true, search: '',show: true};
    this.arrayholder = [];
  }
  componentDidMount() {
    
    this.setState(
      {
        isLoading: false,
        dataSource: Titles,
        show: false,
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
 
  showHide=(index)=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.dataSource];
    array[index]['detail'] = !array[index]['detail'];
    this.setState(() => {
      return {
        dataSource: array,
      };
    });
    if (this.state.show == true) {
      this.setState({ show: false,});
    } else {
      this.setState({ show: true });
    }
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
          renderItem={({ item,index}) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <View>       
            <TouchableOpacity index={item.key} style={styles1.button} onPress={this.showHide.bind(this,index)}>
              
              
              {(this.state.show==true&item.detail==true)?(
                <View>
                  <Text style={[styles.text,{alignSelf:"center"}]}>{item.key}</Text>
                {item.values.map(it=>(
                <View key={it.word} style={styles1.item}>
                  <Text style={styles1.text}>{it.word}</Text>
                  <Text style={[styles1.text,{color:'#237921'}]}>/{it.pronounce}/</Text>
                  <Text style={styles1.text}>{it.description}</Text>
                 </View>))}
                 </View>
              ):(<Text style={styles.text}>{item.key}</Text>)}
            </TouchableOpacity>
          </View> 
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
    minHeight: 60,
    borderWidth: 1,
    borderColor: '#dfeae1',
  },
  text:{
    fontSize:20,
    marginLeft:10,
  },
  item: {
    backgroundColor:"#c9fbcb",
    marginVertical:10,
    marginHorizontal:10,
  }
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