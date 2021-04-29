import * as React from 'react';
import { useState, useEffect, createRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import BasicContainer from '../components/BasicContainer'
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import Emotion from "../constants/EmotionEmoji"
import EmotionName from '../constants/EmotionName';
import EmotionIdx from "../constants/EmotionIdx"
import { Feather } from '@expo/vector-icons';
import { getCurrDate, saveCurrMood } from "../components/SaveMenage"

export default function TabOneScreen(props: { tabView: boolean; toggleNavBar: Function; }) {
  const toggle = (e: string) => {
    props.toggleNavBar(e);
  }
  return (

    <View>
      <BasicContainer content={<MoodCart tabView={props.tabView} toggleNavBar={toggle} />} />
      <BasicContainer content={<CourseSummaryCard />} />
      <BasicContainer content={<VideosSummaryCard />} />
      <BasicContainer content={<StatsCard />} />
      <View style={{ height: 85 }} />
    </View>
  );
}

const MoodCart = (props: { tabView: boolean; toggleNavBar: Function }) => {
  const [expanded, setExpanded] = useState(false);
  const [showWholeLog, setShowWholeLog] = useState(false);
  const [currEmotion, setCurrEmotion] = useState(0);
  const [emotionList, setEmotionList] = useState([])
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }

  const toggleLog = () => {
    setShowWholeLog(true);
    setExpanded(false);
    props.toggleNavBar("TOGGLE_MOOD_LOG");
  }

  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < EmotionName.length; i++) {
      if (i !== currEmotion) {
        tmp.push(i)
      }
    }
    setEmotionList(tmp);
  }, [currEmotion, props.tabView])


  const generateEmotionButtons = () => {
    return emotionList.map((el, i) => (
      <GenerateEmotionButton key={i}
        idx={el}
      />
    ));
  };

  const GenerateEmotionButton = ({ idx }) => {
    return (
      <TouchableOpacity style={CustomElementStyles.button} onPress={(e) => changeEmotion(idx)}>
        <Text style={CustomElementStyles.buttonText}>{EmotionName[idx]}</Text>
      </TouchableOpacity>
    );
  }

  const changeEmotion = (idx: number) => {
    setCurrEmotion(idx);
    saveCurrMood(idx);
    changeLayout();
  }
  return (
    <View>
      <View style={CustomElementStyles.mainHeader}>
        <Text style={CustomElementStyles.mainHeaderText}>Twoje samopoczucie</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
        <View style={{ maxWidth: "100%" }}>
          <Text style={[CustomElementStyles.firstTabDescriptioText, { color: Colors.whiteOff }]}>Dzisiaj czuję się:</Text>
          <TouchableOpacity
            style={{ marginTop: -4, marginBottom: 7, flex: 1, flexDirection: "row" }}
            onPress={(e) => changeLayout()}
          >
            <Text style={[CustomElementStyles.firstTabDescriptioText, { color: Colors.tintColor }]} >{EmotionName[currEmotion]}</Text>
            <Feather name={!expanded ? "chevron-down" : "chevron-up"} size={20} color={Colors.tintColor} style={{ marginTop: 3, marginLeft: 3 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => { toggleLog() }}>
            <Text style={CustomElementStyles.other}>pokaż więcej...</Text>
          </TouchableOpacity>
        </View>
        <Image style={{ width: 70, height: 70 }} source={Emotion[currEmotion]} />
      </View>
      <View style={{ height: expanded ? null : 0, overflow: 'hidden', flex: 1, flexDirection: "row", flexWrap: "wrap", marginLeft: -3, }}>
        {generateEmotionButtons()}
      </View>
    </View>

  );
}
const CourseSummaryCard = () => {
  return (
    <View style={CustomElementStyles.mainHeader}>
      <Text style={CustomElementStyles.mainHeaderText}>Twoje kursy</Text>
    </View>
  );
}
const VideosSummaryCard = () => {
  return (
    <View style={CustomElementStyles.mainHeader}>
      <Text style={CustomElementStyles.mainHeaderText}>Twoja muzyka</Text>
    </View>
  );
}
const StatsCard = () => {
  return (
    <View style={CustomElementStyles.mainHeader}>
      <Text style={CustomElementStyles.mainHeaderText}>Statystyki</Text>
    </View>
  );
}

