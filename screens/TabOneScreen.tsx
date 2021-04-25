import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import BasicContainer from '../components/BasicContainer'
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import Emotion from "../constants/EmotionEmoji"
import EmotionIdx from "../constants/EmotionIdx"
import { Feather } from '@expo/vector-icons';
import EmotionName from '../constants/EmotionName';
import { getCurrDate, saveCurrMood } from "../components/SaveMenage"

export default function TabOneScreen() {
  return (
    <View>
      <BasicContainer content={<MoodCart />} />
      <BasicContainer content={<CourseSummaryCard />} />
      <BasicContainer content={<VideosSummaryCard />} />
      <BasicContainer content={<StatsCard />} />
      <View style={{ height: 85 }} />
    </View>
  );
}

const MoodCart = () => {
  const [expanded, setExpanded] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const [currEmotion, setCurrEmotion] = useState(0);
  const [emotionList, setEmotionList] = useState([])
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }

  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < EmotionName.length; i++) {
      if (i !== currEmotion) {
        tmp.push(i)
      }
    }
    setEmotionList(tmp)
  }, [currEmotion])


  const generateEmotionButtons = () => {
    return emotionList.map((el, i) => (
      <GenerateEmotionButton
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
            <Feather name="chevron-down" size={20} color={Colors.tintColor} style={{ marginTop: 3, marginLeft: 3 }} />
          </TouchableOpacity>
          <TouchableOpacity><Text style={CustomElementStyles.other}>pokaż więcej...</Text></TouchableOpacity>
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
      <Text style={CustomElementStyles.mainHeaderText}>Twoje wykłady</Text>
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

