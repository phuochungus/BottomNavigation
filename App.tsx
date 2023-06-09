import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/home_screen';
import {NavigationContainer} from '@react-navigation/native';
import SettingsScreen from './src/screens/setting_screen';
import FavouritesScreen from './src/screens/favourite_screen';
import {ProductItemI} from './src/components/product';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet} from 'react-native';

type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Favourites: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export type HomeProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

const productList: ProductItemI[] = [
  {name: 'Item 1', price: 50000, isChecked: false},
  {name: 'Item 2', price: 1000000, isChecked: false},
  {name: 'Item 3', price: 1500000, isChecked: false},
  {name: 'Item 4', price: 11111, isChecked: false},
  {name: 'Item 5', price: 213123, isChecked: false},
  {name: 'Item 6', price: 41324000, isChecked: false},
  {name: 'Item 7', price: 9999999, isChecked: false},
];

export const ProductContext = createContext<{
  products: ProductItemI[];
  setProducts: Dispatch<SetStateAction<ProductItemI[]>>;
}>({
  products: [],
  setProducts: function (value: SetStateAction<ProductItemI[]>): void {
    throw new Error('Function not implemented.');
  },
});

export const ThemeContext = createContext<{
  theme: string;
  changeTheme: () => void;
}>({
  theme: '',
  changeTheme: () => {},
});

function App(): JSX.Element {
  const [products, setProducts] = useState<ProductItemI[]>([]);
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    if (theme == 'light') setTheme('dark');
    else setTheme('light');
  };

  useEffect(() => {
    AsyncStorage.getAllKeys().then((keys: readonly string[]) => {
      if (keys.length == 0) {
        productList.forEach(product => {
          AsyncStorage.setItem(product.name, JSON.stringify(product));
        });
      } else {
        AsyncStorage.multiGet(keys).then(pairs => {
          let temp: ProductItemI[] = [];
          pairs.forEach(pair => {
            temp.push(JSON.parse(pair[1]!));
          });
          setProducts(temp);
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log(products);
    return () => {};
  }, [products]);

  return (
    <ProductContext.Provider value={{products, setProducts}}>
      <ThemeContext.Provider value={{theme, changeTheme}}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerTitleStyle: styles.headerTextStyle,
              headerStyle: styles.headerStyle,
              tabBarStyle: styles.tabBarLight,

              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'black',
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </ProductContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#262A56',
  },

  headerTextStyle: {
    color: 'white',
  },

  tabBarLight: {
    backgroundColor: '#6D67E4',
  },
});

export default App;
