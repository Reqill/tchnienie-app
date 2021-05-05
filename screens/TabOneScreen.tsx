import * as React from 'react';
import { useState, useEffect, createRef, useCallback } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import BasicContainer from '../components/BasicContainer'
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import Emotion from "../constants/EmotionEmoji"
import EmotionName from '../constants/EmotionName';
import EmotionIdx from "../constants/EmotionIdx"
import { Feather } from '@expo/vector-icons';
import { getCurrDate, saveCurrMood } from "../components/SaveMenage"
import CourseList from "../constants/CourseList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicList from "../constants/MusicList";
import Cover1 from "../assets/images/course1cover.jpg";
import Cover2 from "../assets/images/course2cover.jpg";
import Cover3 from "../assets/images/course3cover.jpg";
import Cover4 from "../assets/images/course4cover.jpg";
import MusicCover from '../assets/images/music1cover.jpg'
import AddBtn from '../assets/images/add-btn.png';
import AddButton from '../assets/images/AddButton'

const covers = [
  Cover1,
  Cover2,
  Cover3,
  Cover4,
]

export default function TabOneScreen(props: { tabView: boolean; toggleNavBar: Function; changeTab: Function }) {
  return (
    <View>
      <BasicContainer content={<MoodCart tabView={props.tabView} toggleNavBar={props.toggleNavBar} />} />
      <BasicContainer content={<CourseSummaryCard changeTab={props.changeTab} />} />
      <BasicContainer content={<MusicSummaryCard changeTab={props.changeTab} navBarAction={props.toggleNavBar} />} />
      {/* <BasicContainer content={<StatsCard />} /> */}
      <View style={{ height: 85 }} />
    </View>
  );
}

const MoodCart = (props: { tabView: boolean; toggleNavBar: Function }) => {
  const [expanded, setExpanded] = useState(false);
  const [showWholeLog, setShowWholeLog] = useState(false);
  const [currEmotion, setCurrEmotion] = useState(0);
  const [emotionList, setEmotionList] = useState([]);
  const [used, setUsed] = useState(false);
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

  if (!used) {
    getCourseInfo(`moodWholeData`).then((res) => {
      if (typeof res[0][0] === undefined) {
        props.toggleNavBar("TOGGLE_DAILY_MOOD")
      } else if (res[0][0] !== currEmotion) {
        setCurrEmotion(res[0][0])
        setUsed(true)
      }
    })
  }


  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < EmotionName.length; i++) {
      if (i !== currEmotion) {
        tmp.push(i)
      }
    }
    setEmotionList(tmp);
    return () => {
      setEmotionList([]); // This worked for me
    };
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




const CourseSummaryCard = (props: { changeTab: Function }) => {
  const [visibleCourses, setVisibleCourses] = useState(0);

  const generateShortCourseList = () => {
    return CourseList.map((el, i) => <CourseCard item={el} key={el.id} courseIdx={i} handleChange={props.changeTab} ruleTheWorld={handleRulingTheWorld} targetPage={1} />)
  }

  const handleRulingTheWorld = useCallback((e) => {
    setVisibleCourses(visibleCourses + e)
  }, []);

  //
  //TODO: Add and custom text when you have weatched everuthing
  //

  return (
    <View style={CustomElementStyles.mainHeader}>
      <Text style={CustomElementStyles.mainHeaderText}>Twoje kursy</Text>
      {generateShortCourseList()}
      <View style={{ flex: 1, flexDirection: "row", marginTop: 12 }}>
        <TouchableOpacity onPress={() => props.changeTab(1)} style={{ paddingLeft: 1.5 }}>
          <AddButton />
        </TouchableOpacity>
        <View style={{
          marginLeft: 19, flex: 1, flexDirection: "column",
          justifyContent: "center"
        }}>
          <Text numberOfLines={1}
            style={CustomElementStyles.mainIndicator}
          >
            {(visibleCourses > 0) ? "Chcesz wiedzieć więcej?" : "Trochę tutaj pusto..."}
          </Text>
          <TouchableOpacity onPress={() => props.changeTab(1)}>
            <Text numberOfLines={1}
              style={CustomElementStyles.mainCTA}
            >
              {(visibleCourses > 0) ? "Dodaj kolejny kurs!" : "Rozpocznij pierwszy kurs!"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const getCourseInfo = async (storageKey: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`Course data read error: ${e}`)
  }
}

const CourseCard = (props: { item: any, courseIdx: any, handleChange: Function, ruleTheWorld: Function, targetPage: number }) => {
  const [courseInfo, setCourseInfo] = useState(null);
  const {
    name,
    type,
    description,
    imgPath,
    episode,
    id
  } = props.item;
  const key = `course-${name}-${id}`
  const courseIdx = props.courseIdx;

  if (courseInfo === null) {
    getCourseInfo(key).then((res) => { setCourseInfo(res) })
    return null;
  } if (courseInfo.watchedEpisodes === 0) {
    return null
  } else {
    props.ruleTheWorld(1);
    return (
      <TouchableOpacity activeOpacity={.55} onPress={() => props.handleChange(props.targetPage)} style={{ marginTop: 7, marginBottom: 13 }}>
        <View style={CustomElementStyles.courseContainer} activeOpacity={1} >
          <View style={{ width: 62, height: 62, borderRadius: 10 }}>
            <Image source={covers[courseIdx]} style={{ width: 62, height: 62, borderRadius: 10 }} />
            <View style={{ height: courseInfo.isLiked ? null : 0, overflow: 'hidden', flex: 1, flexDirection: "row", flexWrap: "wrap", zIndex: 99, position: "absolute", right: -7, bottom: -7, width: 28 }}>
              <View style={[CustomElementStyles.infoIcon, { backgroundColor: Colors.pinkAccent }]}>
                <Icon name="heart" size={18} color={Colors.whiteOff} />
              </View>
            </View>
          </View>
          <View style={{ width: "90%", paddingLeft: 13, flex: 1, justifyContent: "center", flexDirection: "column", height: "100%" }}>
            <View style={{ marginBottom: -4 }}>
              <Text numberOfLines={1} style={CustomElementStyles.courseHeader}>{name}</Text>
            </View>
            <View style={{ width: "100%" }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <Text numberOfLines={1} style={CustomElementStyles.courseOther}>
                    {type}
                  </Text>
                </View>
                <View >
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginRight: -10 }}>
                    <Icon name="headphones" size={13} color={Colors.other} style={{ marginTop: 3 }} />
                    <View>
                      <Text numberOfLines={1} style={CustomElementStyles.courseOther}>
                        {" "}{courseInfo.watchedEpisodes}/{episode.length}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View >
      </TouchableOpacity>
    );
  }
}

const MusicCard = (props: { item: any, musicIdx: any, handleChange: Function, ruleTheWorld: Function, targetPage: number }) => {
  const [courseInfo, setCourseInfo] = useState(null);
  const {
    title,
    imgPath,
    id,
    duration,
    author
  } = props.item;
  const key = `music-${title}-${id}`
  const musicIdx = props.musicIdx;

  if (courseInfo === null) {
    getCourseInfo(key).then((res) => { setCourseInfo(res) })
    return null;
  } if (courseInfo.isLiked === false) {
    return null
  } else {
    props.ruleTheWorld(1);
    return (
      <TouchableOpacity activeOpacity={.55} onPress={() => props.handleChange("TOGGLE_COURSE", ["MUSIC", musicIdx])} style={{ marginTop: 7, marginBottom: 13 }}>
        <View style={CustomElementStyles.courseContainer} activeOpacity={1} >
          <View style={{ width: 62, height: 62, borderRadius: 10 }}>
            <Image source={MusicCover} style={{ width: 62, height: 62, borderRadius: 10 }} />
            <View style={{ height: courseInfo.isLiked ? null : 0, overflow: 'hidden', flex: 1, flexDirection: "row", flexWrap: "wrap", zIndex: 99, position: "absolute", right: -7, bottom: -7, width: 28 }}>
              <View style={[CustomElementStyles.infoIcon, { backgroundColor: Colors.pinkAccent }]}>
                <Icon name="heart" size={18} color={Colors.whiteOff} />
              </View>
            </View>
          </View>
          <View style={{ width: "90%", paddingLeft: 13, flex: 1, justifyContent: "center", flexDirection: "column", height: "100%" }}>
            <View style={{ marginBottom: -4 }}>
              <Text numberOfLines={1} style={CustomElementStyles.courseHeader}>{title}</Text>
            </View>
            <View style={{ width: "100%" }}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <Text numberOfLines={1} style={CustomElementStyles.courseOther}>
                    {author}
                  </Text>
                </View>
                <View >
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginRight: -10 }}>
                    <Icon name="clock" size={13} color={Colors.other} style={{ marginTop: 3.5 }} />
                    <View>
                      <Text numberOfLines={1} style={CustomElementStyles.courseOther}>
                        {" "}{duration}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View >
      </TouchableOpacity>
    );
  }
}



const MusicSummaryCard = (props: { changeTab: Function, navBarAction: Function }) => {
  const [visibleCourses, setVisibleCourses] = useState(0);

  const generateShortCourseList = () => {
    return MusicList.map((el, i) =>
      <MusicCard item={el} key={el.id} musicIdx={i} handleChange={props.navBarAction}
        ruleTheWorld={handleRulingTheWorld} targetPage={2}
      />)
  }

  const handleRulingTheWorld = useCallback((e) => {
    setVisibleCourses(visibleCourses + e)
  }, []);

  return (
    <View style={CustomElementStyles.mainHeader}>
      <Text style={CustomElementStyles.mainHeaderText}>Twoja muzyka</Text>
      {generateShortCourseList()}
      <View style={{ flex: 1, flexDirection: "row", marginTop: 12 }}>
        <TouchableOpacity onPress={() => props.changeTab(2)} style={{ paddingLeft: 1.5 }}>
          <AddButton />
        </TouchableOpacity>
        <View style={{
          marginLeft: 19, flex: 1, flexDirection: "column",
          justifyContent: "center"
        }}>
          <Text numberOfLines={1}
            style={CustomElementStyles.mainIndicator}
          >
            {(visibleCourses > 0) ? "Czujesz niedosyt?" : "Trochę tutaj pusto..."}
          </Text>
          <TouchableOpacity onPress={() => props.changeTab(2)}>
            <Text numberOfLines={1}
              style={CustomElementStyles.mainCTA}
            >
              {(visibleCourses > 0) ? "Odkryj kolejny utwór!" : "Odkryj pierwszy utwór!"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string; size: number }) {
  return <Feather style={{ marginTop: .5 }}{...props} />;
}

