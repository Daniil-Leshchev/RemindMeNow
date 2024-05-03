import { StyleSheet, View, Text } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import tasks from '@assets/data/data';
import TaskItem from '@/components/TaskItem';

const colors = {
  
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
      handleIndicatorStyle={{ backgroundColor: 'transparent' }}>
        <BottomSheetFlatList
          data={tasks}
          renderItem={({item}) => <TaskItem task={item}/>}
        />
    </BottomSheet>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default DayTasksBottomSheet;