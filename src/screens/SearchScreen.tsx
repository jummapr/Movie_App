import { StyleSheet, Text, View, Dimensions, StatusBar, FlatList } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../theme/theme';

const {width,height} = Dimensions.get("screen");

const SearchScreen = () => {
  const [searchList,setSearchList] = useState([])
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <FlatList
        data={searchList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMargintedatEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            // @ts-ignore
            isLast={index == upcomingMovieList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width,
    alignItems: "center",
    backgroundColor: COLORS.Black,

  }
})