import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class AppHeader extends React.Component{
  render(){
    return(
      <View style= {styles.textContainer}>
        <Text style={styles.text}>Attendance Sheet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer:{
    backgroundColor: 'cyan',
  },
  text:{
    color: 'black',
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',

  }
});

export default AppHeader;