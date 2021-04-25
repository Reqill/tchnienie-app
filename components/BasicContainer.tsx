import * as React from 'react';
import { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';

export default function BasicContainer(props: { activeTabIdx?: Number, content: any }) {
    return (
        <View style={{ paddingTop: 10, paddingHorizontal: "4%" }}>
            <LinearGradient
                colors={[Colors.blueOne, Colors.blueTwo]}
                style={CustomElementStyles.basicContainer}
                start={{ x: 0.44, y: -.2 }}
                end={{ x: 0.56, y: 1.2 }}
            >
                <View style={CustomElementStyles.borderFix}>
                    {props.content}
                </View>


            </LinearGradient>
        </View>
    );
};