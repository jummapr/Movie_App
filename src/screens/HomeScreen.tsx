import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  nowPayingMovies,
  popularMovie,
  baseImagePath,
} from '../api/apiCalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMovieList = async () => {
  try {
    let response = await fetch(nowPayingMovies);

    let json = response.json();

    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getNowPlayingMovieList functions',
      error,
    );
  }
};

const getUpcomingMovieList = async () => {
  try {
    let response = await fetch(upcomingMovies);

    let json = response.json();

    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getUpcomingMovieList functions',
      error,
    );
  }
};

const getPopularMovieList = async () => {
  try {
    let response = await fetch(popularMovie);

    let json = response.json();

    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getPopularMovieList functions',
      error,
    );
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMovieList, setUpcomingMovieList] = useState<
    UpcomingMoviesTypes[] | undefined | null
  >(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMovieList();
      setNowPlayingMoviesList([{id: 'dummy2'},...tempNowPlaying.results,{id: 'dummy2'}]);

      let tempUpcomingMovie = await getUpcomingMovieList();
      setUpcomingMovieList(tempUpcomingMovie.results);

      let tempPopularMovie = await getPopularMovieList();
      setPopularMoviesList(tempPopularMovie.results);
    })();
  }, []);

  const searchMovies = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMovieList == undefined &&
    upcomingMovieList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMovies} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>

      <StatusBar hidden />

      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMovies} />
      </View>
      <CategoryHeader title="Now Playing" />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        decelerationRate={0}
        snapToInterval={width * 0.7 + SPACING.space_36}
        contentContainerStyle={styles.containerGap36}
        showsHorizontalScrollIndicator={false}

        renderItem={({item, index}) => {

          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }

          return (
          <MovieCard
            shouldMargintedatEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width * 0.7}
            isFirst={index == 0 ? true : false}
            // @ts-ignore
            isLast={index == upcomingMovieList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w780', item.poster_path)}
            genre={item.genre_ids.slice(1, 4)}
            vote_average={item.vote_average}
            vote_count={item.vote_count}
          />
          )
        }}
      />
      <CategoryHeader title="Popular" />
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        showsHorizontalScrollIndicator={false}

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
      <CategoryHeader title="Upcoming" />

      <FlatList
        data={upcomingMovieList}
        keyExtractor={(item: any) => item.id}
        horizontal
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        showsHorizontalScrollIndicator={false}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
