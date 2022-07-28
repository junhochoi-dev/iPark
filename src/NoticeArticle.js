
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    SafeAreaView,
    Pressable,
    Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const NoticeView = ({ route }) => {
    const img = route.params.image
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.params.title}</Text>
            <ScrollView style={styles.text}>
                <Image style={styles.img} source={{ uri: img }} />
                <Text>{'\n'}{route.params.paragraph}{'\n'}</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        margin: 10,
    },
    text: {
        marginVertical: 10,
        padding: 20,
    },
    img: {
        width: '100%',
        height: 300,
        resizeMode: "contain",
    }
})

export default NoticeView;