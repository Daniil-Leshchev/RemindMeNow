import { StyleSheet, View } from 'react-native';
import Text from "@/components/StyledText";
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import tasks from '@assets/data/data';
import TaskItem from '@/components/TaskItem';

import moment from 'moment';
import 'moment/locale/ru';

const colors = {
  background: '#C0CEFF'
}

type DayTasksBottomSheetProps  = {
  day: Date;
}

const DayTasksBottomSheet = forwardRef<BottomSheet, DayTasksBottomSheetProps>(({ day }, ref) => {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props}/>, []
  )

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.container}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ display: 'none' }}>
        <BottomSheetFlatList
          ListHeaderComponent={ <Text style={styles.header}>{moment(day).local().format('dddd[,] D MMMM')}</Text> }
          data={tasks}
          renderItem={({item}) => <TaskItem task={item}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 26,
          }}
        />
    </BottomSheet>
  );
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },

  header: {
    fontSize: 22,
    textTransform: 'capitalize'
  }
})

export default DayTasksBottomSheet;