import React from 'react';
import { ScrollView, StyleSheet, View, Picker } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class StoresScreen extends React.Component {
  static navigationOptions = {
    title: 'Stores',
  };
  
  constructor(props) {
    super(props);
    this.state = {language: 'java'};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
          <View>
              <Picker
                selectedValue={this.state.language}
                style={{height: 36, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
