'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  TouchableHighlight,
  Image,
} from 'react-native';
import SearchResults from './SearchResults';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: 'developer',
            location: 'san francisco',
            isLoading: false,
            message: '',
        };
    }

    _onSearchJobChanged = (event) => {
        this.setState({ job: event.nativeEvent.text });
    };

    _onSearchLocationChanged = (event) => {
        this.setState({ location: event.nativeEvent.text });
    };

    _executeQuery = (query) => {
        this.setState({ isLoading: true });

        fetch(query, {
                headers: {
                    'Origin': 'http://domain.com', // hack for crossorigin.me
                }
            })
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error =>
                this.setState({
                isLoading: false,
                message: 'Something bad happened ' + error
            }));
    };

    _handleResponse = (response) => {
        this.setState({ isLoading: false , message: '' });
        if (response.length) {
            this.props.navigator.push({
                title: 'Results',
                component: SearchResults,
                passProps: {entries: response}
            });
        } else {
            this.setState({ message: 'No data found.'});
        }
    };
    
    _onSearchPressed = () => {
        const query = `https://crossorigin.me/https://jobs.github.com/positions.json?description=${this.state.job}&location=${this.state.location}`;
        this._executeQuery(query);
    };

    _onResetPressed = () => {
        this.setState({ job: '', location: ''});
    }

    render() {
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large'/> : null;
        return (
        <View style={styles.container}>
            <Text style={styles.description}>
                Search for jobs
            </Text>
            <View style={styles.flowBottom}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.job}
                    onChange={this._onSearchJobChanged}
                    placeholder='Job name'/>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.location}
                    onChange={this._onSearchLocationChanged}
                    placeholder='Location'/>
            </View>
            <View style={styles.flowBottom}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this._onSearchPressed}
                >
                    <Text>Search</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this._onResetPressed}
                >
                    <Text>Reset</Text>
                </TouchableHighlight>
            </View>
            {spinner}
            <Text style={styles.description}>{this.state.message}</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565'
    },
    container: {
      padding: 30,
      marginTop: 65,
      alignItems: 'center'
    },
    flowBottom: {
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        marginBottom:10,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        color: 'black',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop: 10
    },
    image: {
        width: 217,
        height: 138,
    },
});