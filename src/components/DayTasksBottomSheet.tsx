import { StyleSheet } from 'react-native';
import Text from "@/components/StyledText";
import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import tasks from '@assets/data/data';
import TaskItem from '@/components/TaskItem';
import AddTaskButton from '@/components/AddTaskButton';
import AddTaskBottomSheet from '@components/AddTaskBottomSheet';

import moment from 'moment';
import 'moment/locale/ru';
import { useCurrentDay } from '@/providers/CurrentDayProvider';

const colors = {
  background: '#C0CEFF',
  addTaskButton: '#AEBAE4'
}

const DayTasksBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const { currentDay } = useCurrentDay();
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props}/>, []
  )

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);

  const addTaskBottomSheet = useRef<BottomSheet>(null);
  const handleOpenAddTaskBottomSheet = () => addTaskBottomSheet.current?.expand();
  const handleCloseAddTaskBottomSheet = () => addTaskBottomSheet.current?.close();
  return (
    <>
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.container}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ display: 'none' }}>
          <BottomSheetFlatList
            ListHeaderComponent={<Text style={styles.header}>{moment(currentDay).local().format('dddd[,] D MMMM')}</Text>}
            data={tasks}
            renderItem={({item}) => <TaskItem task={item}/>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              gap: 26,
            }}
            ListFooterComponent={<AddTaskButton onPress={handleOpenAddTaskBottomSheet} customStyles={styles.addTaskButton}/>}
            ListFooterComponentStyle={styles.footer}
          />
      </BottomSheet>
      <AddTaskBottomSheet hasDay={true} ref={addTaskBottomSheet} handleCloseBottomSheet={handleCloseAddTaskBottomSheet}/>
    </>
  );
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },

  header: {
    fontSize: 22,
    textTransform: 'capitalize'
  },

  footer: {
    marginBottom: 40,
  },

  addTaskButton: {
    backgroundColor: colors.addTaskButton,
    shadowOpacity: 0
  }
})

export default DayTasksBottomSheet;