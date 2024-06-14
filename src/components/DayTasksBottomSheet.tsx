import { StyleSheet } from 'react-native';
import Text from "@/components/StyledText";
import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import TaskItem from '@/components/TaskItem';
import AddTaskButton from '@/components/AddTaskButton';
import AddTaskBottomSheet from '@components/AddTaskBottomSheet';
import moment from 'moment';
import 'moment/locale/ru';
import { useCurrentDay } from '@/providers/CurrentDayProvider';
import { useCurrentDayTasks } from '@/api/select';
import { Tables } from '@/lib/database.types';

const colors = {
  background: '#C0CEFF',
  addTaskButton: '#AEBAE4'
}

export const tasksSorting = (a: Tables<'tasks'>, b: Tables<'tasks'>) => {
  //пары стоят первыми
  if (a.isSchedule && !b.isSchedule)
    return -1;

  if (!a.isSchedule && b.isSchedule)
    return 1;

  //по статусу
  if (a.status === 'active' && b.status === 'completed')
    return -1;

  if (a.status === 'completed' && b.status === 'active')
    return 1;

  //по времени
  if (!a.isAllDay && !b.isAllDay) {
    if (a.startDate < b.startDate)
      return -1;
  
    if (a.startDate >= b.startDate)
      return 1;
  }

  //если это задача со временем, то она идет выше
  if (!a.isAllDay && b.isAllDay)
    return -1;

  if (a.isAllDay && !b.isAllDay)
    return 1;

  //по типу
  if (a.type === 'prior' && b.type === 'standard')
    return -1;

  if (a.type === 'standard' && b.type === 'prior')
    return 1;

  if (a.type === 'prior' && b.type === 'event')
    return -1;

  if (a.type === 'event' && b.type === 'prior')
    return 1;

  if (a.type === 'event' && b.type === 'standard')
    return -1;

  if (a.type === 'standard' && b.type === 'event')
    return 1;

  return 0;
}

const DayTasksBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const { currentDay } = useCurrentDay();
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props}/>, []
  )

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);

  const addTaskBottomSheet = useRef<BottomSheet>(null);
  const handleOpenAddTaskBottomSheet = () => addTaskBottomSheet.current?.expand();
  const handleCloseAddTaskBottomSheet = () => addTaskBottomSheet.current?.close();
  const { data: tasks, refetch, isRefetching } = useCurrentDayTasks();

  useEffect(() => {
    refetch();
  }, [currentDay]);

  if (isRefetching) {
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
            <Text style={[styles.header, styles.refetchingHeader]}>{moment(currentDay).local().format('dddd[,] D MMMM')}</Text>
            <AddTaskButton onPress={handleOpenAddTaskBottomSheet} customStyles={[styles.addTaskButton, styles.refetchingAddTaskButton]}/>
        </BottomSheet>
      </>
    );
  }

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
            data={tasks?.sort(tasksSorting)}
            renderItem={({ item }) => <TaskItem task={item} isTodayView={false}/>}
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
  },

  refetchingHeader: {
    marginLeft: 16,
    marginBottom: 26
  },

  refetchingAddTaskButton: {
    marginLeft: 16
  },

  refetchingIndicator: {
    marginBottom: 26
  }
})

export default DayTasksBottomSheet;