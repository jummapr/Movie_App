import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';


const SubMovieCard = ({
  imagePath,
  title,
  cardFunction,
  cardWidth,
  isFirst,
  isLast,
  shouldMargintedatEnd,
  shouldMargintedAround
}: any) => {
  return (
    <TouchableOpacity onPress={() => cardFunction()}>
      <View
        style={[
          styles.container,
          shouldMargintedatEnd
            ? isFirst
              ? {marginLeft: SPACING.space_36}
              : isLast
              ? {marginRight: SPACING.space_36}
              : {}
            : {},
          shouldMargintedAround ? {margin: SPACING.space_12} : {},
          {maxWidth: cardWidth},
        ]}>
        <Image
          style={[styles.cardImage, {width: cardWidth}]}
          source={{uri: imagePath}}
        />
        <Text numberOfLines={1} style={styles.textTitle}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: "center",
    paddingVertical: SPACING.space_10
  },
});

export default SubMovieCard;
