import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

interface CastCardProps {
  imagePath: string;
  title: string;
  subTitle: string;
  shouldMarginatedAtEnd: boolean;
  cardWidth: number;
  isFirst: boolean;
  isLast: boolean;
}

const CastCard: React.FC<CastCardProps> = ({
  imagePath,
  title,
  subTitle,
  cardWidth,
  isFirst,
  isLast,
  shouldMarginatedAtEnd,
}) => {
  return (
    <View
      style={[
        styles.container,
        shouldMarginatedAtEnd
          ? isFirst
            ? {marginLeft: SPACING.space_24}
            : isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
          {maxWidth: cardWidth}
      ]}>
      <Image source={{uri: imagePath}} style={[styles.cardImage,{width: cardWidth}]} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subTitle} numberOfLines={1}>
        {subTitle}
      </Text>
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 1920/2880,
    borderRadius: BORDERRADIUS.radius_25 * 4,


  },
  title: {
    alignSelf: "stretch",
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White
  },
  subTitle: {
    alignSelf: "stretch",
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White
  },
});
