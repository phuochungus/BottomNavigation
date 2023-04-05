import CheckBox from '@react-native-community/checkbox';
import {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../../App';
export default function SettingScreen() {
  const [isLight, setIsLight] = useState(true);

  const {theme, changeTheme} = useContext(ThemeContext);
  return (
    <View
      style={theme == 'light' ? styles.containerLight : styles.containerDark}>
      <View style={styles.row}>
        <Text style={theme == 'light' ? styles.textLight : styles.textDark}>
          Theme:
        </Text>
        <View>
          <Text style={theme == 'light' ? styles.textLight : styles.textDark}>
            Light
          </Text>
          <CheckBox
            style={styles.checkBoxLight}
            onValueChange={() => {
              changeTheme();
            }}
            value={theme == 'light'}
            tintColors={{true: 'red', false: 'black'}}
          />
        </View>
        <View>
          <Text style={theme == 'light' ? styles.textLight : styles.textDark}>
            Dark
          </Text>
          <CheckBox
            style={styles.checkBoxLight}
            onValueChange={() => {
              changeTheme();
            }}
            value={theme == 'dark'}
            tintColors={{true: 'red', false: 'black'}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textLight: {
    color: 'black',
  },
  checkBoxLight: {},

  textDark: {
    color: 'white',
  },

  containerLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  containerDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A2647',
  },
  row: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
