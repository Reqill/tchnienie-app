import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BasicContainer from '../components/BasicContainer'
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import GoodEmotion from "../assets/images/emocje-dobrze.png"
import ExcitationEmotion from "../assets/images/emocje-ekstytacja.png"
import NeutralEmotion from "../assets/images/emocje-neutralnie.png"
import NotgoodEmotion from "../assets/images/emocje-niedobrze.png"
import NotconfidentEmotion from "../assets/images/emocje-niepewnosc.png"
import ConfidentEmotion from "../assets/images/emocje-pewnosc.png"
import SeriousEmotion from "../assets/images/emocje-powaga.png"
import SadEmotion from "../assets/images/emocje-smutek.png"
import HappyEmotion from "../assets/images/emocje-szczescie.png"
import ExhaustedEmotion from "../assets/images/emocje-wycieczenie.png"
import AngryEmotion from "../assets/images/emocje-zlosc.png"
import TiredEmotion from '../assets/images/emocje-zmeczenie.png'

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
  return (
    <View>
      <View style={CustomElementStyles.mainHeader}>
        <Text style={CustomElementStyles.mainHeaderText}>Twoje samopoczucie</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
        <View>
          <Text style={[CustomElementStyles.firstTabDescriptioText, { color: Colors.whiteOff }]}>Dzisiaj czuję się:</Text>
          <View style={{ marginTop: -4, marginBottom: 7 }}>
            <Text style={[CustomElementStyles.firstTabDescriptioText, { color: Colors.tintColor }]} >Zmęczony</Text>
          </View>
          <TouchableOpacity><Text style={CustomElementStyles.other}>pokaż więcej...</Text></TouchableOpacity>
        </View>
        <Image style={{ width: 70, height: 70 }} source={TiredEmotion} />
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


