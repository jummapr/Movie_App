import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {baseImagePath, searchMovies} from '../api/apiCalls';
import SubMovieCard from '../components/SubMovieCard';
import InputHeader from '../components/InputHeader';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList] = useState([]);
  const searchMovieFunctions = async (name: string) => {
    console.log(name);
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.log('Something went wrong in searchMovieFuunction');
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={searchList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMovieFunctions} />
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.centerContainer}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMargintedatEnd={false}
            shouldMargintedAround
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width / 2 - SPACING.space_12 * 2}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_28,
  },
  centerContainer: {
    alignItems: 'center',
  },
});
