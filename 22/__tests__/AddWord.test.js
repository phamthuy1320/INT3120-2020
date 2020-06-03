import React from 'react';
import AddWord from '../components/AddWord';

import renderer from 'react-test-renderer';

test('banner correctly', () => {
    const tree = renderer.create(<View style={{
      paddingTop: Constants.statusBarHeight,
      backgroundColor:'#42b309',
      width:'100%',
      textAlign:'center',
      paddingVertical:20,}}>
      <View style={{flexDirection:'row',}}>
          <TouchableOpacity onPress={this.props.navigation.navigate('Menu')}>
            <Icons name={'arrow-back'} size={30} color='#fff' />
          </TouchableOpacity>
          <Text style={{marginHorizontal:20,color: 'white',
      fontSize: 25,
      fontWeight: 'bold',} }>
            Tra từ
          </Text>
      </View>
    </View>).toJSON();
    expect(tree).toMatchSnapshot();
  });