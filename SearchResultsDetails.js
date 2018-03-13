'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  WebView
} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class SearchResultsDetails extends Component {
    render() {
        const item = this.props.item;
        console.log(this.props.item.title);
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>
                {item.title}
                </Text>
                <Text>
                    Company: {item.company}
                </Text>
                <Text>
                    Type: {item.type}
                </Text>
                <Text>
                    Location: {item.location}
                </Text>
                <Text style={styles.desc}>
                    Description
                </Text>
                <HTMLView
                    value={item.description.split('\n').join('')}
                    stylesheet={styles}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
        paddingTop: 80,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom:20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom:20
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom:20
    },
    desc: {
        paddingTop:40,
        fontWeight: 'bold'
    }
  });

