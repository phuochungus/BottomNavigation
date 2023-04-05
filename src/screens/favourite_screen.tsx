import {FlatList, StyleSheet, View} from 'react-native';
import ProductItem from '../components/product';
import {ProductContext, ThemeContext} from '../../App';
import {useContext} from 'react';

export default function FavouriteScreen(): JSX.Element {
  const {products} = useContext(ProductContext);
  const {theme} = useContext(ThemeContext);

  return (
    <View
      style={theme == 'light' ? styles.containterLight : styles.containerDark}>
      <FlatList
        renderItem={({item}) => {
          if (item.isChecked)
            return (
              <ProductItem
                name={item.name}
                price={item.price}
                isChecked={item.isChecked}
              />
            );
          else return <></>;
        }}
        data={products}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containterLight: {
    backgroundColor: 'white',
    flex: 1,
  },

  containerDark: {
    backgroundColor: '#0A2647',
    flex: 1,
  },
});
