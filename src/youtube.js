import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';

const Youtube = ({route}) => {
  console.log('WebView');
  const url = route.params.url;
  console.log(url);

  return (
    <WebView
      allowsFullscreenVideo
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction
      source={{uri: url}}
    />
  );
};

export default Youtube;
