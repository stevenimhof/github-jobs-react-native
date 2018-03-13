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
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
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
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom:20
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom:20
    },
    desc: {
        paddingTop:20,
        fontWeight: 'bold'
    }
  });

