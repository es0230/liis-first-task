import {
  TouchableOpacity, Text, Image, StyleSheet
} from 'react-native';

import { SortOrders, SortTypes } from '../../constants/sort';
import { useAppSelector } from '../../hooks';
import { SortParams } from '../../models/sort-params';
import { selectSortOrder, selectSortType } from '../../redux/app-data/selectors';

type SortOptionProps = {
  text: string,
  sortType: SortTypes,
  onSortOptionPress: (sortType: SortTypes, sortOrder: SortOrders) => void
};

const getSortIcon = (currentSortOrder: SortOrders, currentSortType: SortTypes, sortType: SortTypes) => {
  if (currentSortType !== sortType) {
    return <Image source={require('../../images/inactive-sort.png')} />;
  }
  if (currentSortOrder === SortOrders.Asc) {
    return <Image source={require('../../images/active-sort-asc.png')} />;
  }
  return <Image source={require('../../images/active-sort-desc.png')} />;
};

const getNewSortParams = (currentSortOrder: SortOrders, currentSortType: SortTypes, sortType: SortTypes) => {
  if (currentSortType === sortType) {
    const newOrder = currentSortOrder === SortOrders.Asc ? SortOrders.Desc : SortOrders.Asc;
    return { sortType, sortOrder: newOrder };
  }
  const newType = currentSortType === SortTypes.Price ? SortTypes.Rating : SortTypes.Price;
  return { sortType: newType, sortOrder: SortOrders.Asc };
};

const SortOption = ({
  text, sortType, onSortOptionPress
}: SortOptionProps) => {
  const currentSortType = useAppSelector(selectSortType);
  const currentSortOrder = useAppSelector(selectSortOrder);

  const handleSortOptionPress = (options: SortParams) => {
    onSortOptionPress(options.sortType, options.sortOrder);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.favoriteSort, currentSortType === sortType && styles.activeOptionView]}
      onPress={() => handleSortOptionPress(getNewSortParams(currentSortOrder, currentSortType, sortType))}
    >
      <Text style={currentSortType === sortType && styles.activeOptionText}>{text}</Text>

      {getSortIcon(currentSortOrder, currentSortType, sortType)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteSort: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4
  },
  activeOptionView: {
    backgroundColor: '#5AC8FA',
  },
  activeOptionText: {
    color: 'white'
  }
});

export default SortOption;
