'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';
import SearchResultsDetails from './SearchResultsDetails';

class ListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.index);
    }
  
    render() {
        const item = this.props.item;

        // we need to force https for ios. normal http is not going to work
        // in addition: uri can't contain an empty string
        const companyLogo = item.company_logo !== null ?
            <Image style={styles.thumb} source={{uri: item.company_logo.replace('http://', 'https://')}} /> :
            <Image style={styles.thumb} />

        return (
            <TouchableHighlight
            onPress={this._onPress}
            underlayColor='#dddddd'>
            <View>
                <View style={styles.rowContainer}>
                {companyLogo}
                <View style={styles.textContainer}>
                    <Text
                        style={styles.title}
                        numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text
                        numberOfLines={1}>
                        Company: {item.company}
                    </Text>
                    <Text
                        numberOfLines={1}>
                        Type: {item.type}
                    </Text>
                </View>
                </View>
                <View style={styles.separator}/>
            </View>
            </TouchableHighlight>
        );
    }
}

export default class SearchResults extends Component {
    _keyExtractor = (item, index) => index.toString();
  
    _renderItem = ({item, index}) => (
        <ListItem
          item={item}
          index={index}
          onPressItem={this._onPressItem}
        />
    );
      
    _onPressItem = (index) => {
        const item = this.props.entries[index];
        this.props.navigator.push({
            title: "Job Details",
            component: SearchResultsDetails,
            passProps: {item: item}
        });
    };
  
    render() {
      return (
        <FlatList
          data={this.props.entries}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
}

const styles = StyleSheet.create({
    thumb: {
      width: 80,
      height: 80,
      marginRight: 10,
      backgroundColor: '#eee',
      resizeMode: 'contain'
    },
    textContainer: {
      flex: 1
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd'
    },
    title: {
      fontSize: 18,
      color: '#656565'
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10
    },
});