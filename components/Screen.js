import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

export default class Screen extends Component {
    state = {
        layout: false
    };

    componentWillMount() {
        console.log(this)
    }

    render() {
        return (
            <View
                style={styles.screen}
                onLayout={() => {
                    this.setState({
                        layout: !this.state.layout
                    })
                }}
            >
                {React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, { layout: this.state.layout });
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    }
})