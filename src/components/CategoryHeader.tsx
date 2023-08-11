import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({title}) => {
  return <Text style={styles.text}>{title}</Text>;
};

export default CategoryHeader;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_28,
  },
});
