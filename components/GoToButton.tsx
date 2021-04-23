import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

function ButtonIcon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
    return <Feather size={30} style={{ marginBottom: 0 }} {...props} />;
}

export default function GoToButton(props: { screenName: string; iconName: React.ComponentProps<typeof Feather>['name']; color: string }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ padding: 10 }} onPress={() => { navigation.navigate(props.screenName) }
        }>
            <ButtonIcon name={props.iconName} color={props.color} />
        </TouchableOpacity>

    );
}

