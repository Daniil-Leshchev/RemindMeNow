import { View, StyleSheet, TextInput, Keyboard, TouchableHighlight, Pressable } from 'react-native';
import Text from "@/components/StyledText";
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Switch } from 'react-native-switch';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import 'moment/locale/ru';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Image } from 'expo-image';

type AddTaskBottomSheetProps  = {
  handleCloseBottomSheet: () => void;
}

const colors = {
  background: '#C0CEFF',
  group: '#8A9DCDB5',
  divider: '#7580B8B5',
  shadow: '#5B64AE33',
  datePickerAccent: '#363876',
  datePickerContainer: '#7B8BB5E5',
  notesPlaceholder: '#7380ADED',
  addTaskButton: '#AEBAE4',
  addTaskText: '#6C6C6C',
}

const AddTaskBottomSheet = forwardRef<BottomSheet, AddTaskBottomSheetProps>(({handleCloseBottomSheet}, ref) => {
  const [title, setTitle] = useState('');
  const [chooseTypeVisible, setChooseTypeVisible] = useState(false);
  const [type, setType] = useState('');
  const [typeText, setTypeText] = useState('Тип');
  const [isAllDay, setIsAllDay] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const [repeatDropdownOpen, setRepeatDropdownOpen] = useState(false);
  const [repeatValue, setRepeatValue] = useState('never');

  const [reminderDropdownOpen, setReminderDropdownOpen] = useState(false);
  const [reminderValue, setReminderValue] = useState('');

  const [attachment, setAttachment] = useState<string | null>(null);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setAttachment(result.assets[0].uri)
    }
    console.log(result);
  }

  const [notes, setNotes] = useState('');

  const dateFormat = "D MMMM[,] yyyy";
  const timeFormat = "LT";

  const formatDate = (date: Date, format: string) => {
    return moment(date).local().format(format);
  }

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmStart = (date: Date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const handleConfirmEnd = (date: Date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const handleTypeChange = (taskType: string, taskLabel: string) => {
    setType(taskType);
    setTypeText(taskLabel);
    setChooseTypeVisible(false);
  }


  //TODO:
  // const checkDates/validateInput = () => {
  // }

  const resetFields = () => {
    setTitle('');
    setType('');
    setTypeText('');
    setIsAllDay(false)
    setStartDate(new Date());
    setEndDate(new Date());
    setRepeatValue('never');
    setReminderValue('no');
    setAttachment(null);
    setNotes('');
  }

  const addTask = () => {
    handleCloseBottomSheet();
    resetFields();
  }

  const CustomCancelButton = ({ onPress }) => {
    return (
      <TouchableHighlight
        style={styles.cancelButton}
        onPress={onPress}
        activeOpacity={0.6}
        underlayColor="#DDDDDD">
        <Text style={[styles.text, styles.cancelText]}>Отменить</Text>
      </TouchableHighlight>
    )
  }

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props}/>, []
  )

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);
  const hideKeyboardOnFocusChange = () => {
    Keyboard.dismiss();
    return false;
  }

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ marginBottom: 8 }}
      backgroundStyle={styles.container}>
      <View style={styles.wrapper} onStartShouldSetResponder={hideKeyboardOnFocusChange}>
        <View style={styles.group}>
          <TextInput
            style={[styles.text, styles.divider]}
            placeholder='Название'
            placeholderTextColor='#fff'
            onChangeText={setTitle}
            value={title}
          />
          
          <View style={styles.typeItem}>
            {/* TODO: dynamic path change */}
            <Image 
              source={require(`@assets/icons/task/standard.svg`)}
              style={[styles.typeIcon, { display: typeText === 'Тип' ? 'none' : 'flex' }]}/>
            <Text
              style={styles.text}
              onPress={() => setChooseTypeVisible(!chooseTypeVisible)}>
                { typeText }
            </Text>
          </View>
        </View>
        
        <View style={[styles.typeContainer, { display: chooseTypeVisible ? 'flex' : 'none' }]}>
          
          <Pressable style={styles.typeItem} onPress={() => handleTypeChange('standard', 'задача')}>
            <Image 
              source={require(`@assets/icons/task/standard.svg`)}
              style={styles.typeIcon}/>
            <Text style={styles.text}>задача</Text>
          </Pressable>

          <Pressable style={styles.typeItem} onPress={() => handleTypeChange('prior', 'важное')}>
            <Image 
              source={require(`@assets/icons/task/prior.svg`)}
              style={styles.typeIcon}/>
            <Text style={styles.text}>важное</Text>
          </Pressable>

          <Pressable style={styles.typeItem} onPress={() => handleTypeChange('event', 'событие')}>
            <Image 
              source={require(`@assets/icons/task/event.svg`)}
              style={styles.typeIcon}/>
            <Text style={styles.text}>событие</Text>
          </Pressable>
          
        </View>

        <View style={styles.group}>
          <View style={[styles.groupElement, styles.divider]}>
            <Text style={styles.text}>Весь день</Text>
            <Switch
              value={isAllDay}
              onValueChange={() => setIsAllDay(!isAllDay)}
              barHeight={24}
              backgroundActive='#73D877DB'
              backgroundInactive='#43434429'
              circleSize={20}
              switchLeftPx={2}
              switchRightPx={2}
              circleBorderWidth={0}
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
          <View style={[styles.groupElement, styles.divider]}>
            <Text style={styles.text}>Начало</Text>
            <View style={styles.chooseDateAndTime}>
              <Text onPress={showStartDatePicker} style={[styles.text, styles.date]}>{formatDate(startDate, dateFormat)}</Text>
              <Text onPress={showStartDatePicker} style={styles.text}>{formatDate(startDate, timeFormat)}</Text>
            </View>
            <DateTimePickerModal
              locale='ru_RU'
              isVisible={isStartDatePickerVisible}
              mode="datetime"
              display='inline'
              confirmTextIOS='Подтвердить'
              cancelTextIOS='Отменить'
              customCancelButtonIOS={CustomCancelButton}
              onConfirm={handleConfirmStart}
              onCancel={hideStartDatePicker}
              buttonTextColorIOS={'#fff'}
              accentColor={colors.datePickerAccent}
              pickerContainerStyleIOS={styles.datePicker}
              pickerComponentStyleIOS={{marginBottom: 12}}
            />
          </View>
          <View style={styles.groupElement}>
            <Text style={styles.text}>Конец</Text>
            <View style={styles.chooseDateAndTime}>
              <Text onPress={showEndDatePicker} style={[styles.text, styles.date]}>{formatDate(endDate, dateFormat)}</Text>
              <Text onPress={showEndDatePicker} style={styles.text}>{formatDate(endDate, timeFormat)}</Text>
            </View>
            <DateTimePickerModal
              locale='ru_RU'
              isVisible={isEndDatePickerVisible}
              mode="datetime"
              display='inline'
              confirmTextIOS='Подтвердить'
              cancelTextIOS='Отменить'
              customCancelButtonIOS={CustomCancelButton}
              onConfirm={handleConfirmEnd}
              onCancel={hideEndDatePicker}
              buttonTextColorIOS={'#fff'}
              accentColor={colors.datePickerAccent}
              pickerContainerStyleIOS={styles.datePicker}
              pickerComponentStyleIOS={{marginBottom: 12}}
            />
          </View>
        </View>

        <View style={[styles.group, styles.dropdownGroup]}>
          <Text style={styles.text}>Повтор</Text>
          <DropDownPicker
            open={repeatDropdownOpen}
            value={repeatValue}
            setOpen={setRepeatDropdownOpen}
            setValue={setRepeatValue}
            placeholder='Никогда'
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={[styles.text, styles.dropdownText]}
            listItemContainerStyle={styles.dropdownItem}
            showTickIcon={false}
            dropDownContainerStyle={styles.dropdownItemsContainer}
            items={[
              {label: 'Никогда', value: 'never'},
              {label: 'Каждый день', value: 'everyDay'},
              {label: 'Каждую неделю', value: 'everyWeek'},
              {label: 'Каждые две недели', value: 'everyTwoWeeks'},
              {label: 'Каждый месяц', value: 'everyMonth'},
              {label: 'Каждый год', value: 'everyYear'},
            ]}
          />
        </View>

        <View style={[styles.group, styles.dropdownGroup, {zIndex: -1,}]}>
          <Text style={styles.text}>Напоминание</Text>
          <DropDownPicker
            open={reminderDropdownOpen}
            value={reminderValue}
            setOpen={setReminderDropdownOpen}
            setValue={setReminderValue}
            placeholder='Нет'
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={[styles.text, styles.dropdownText]}
            listItemContainerStyle={styles.dropdownItem}
            showTickIcon={false}
            dropDownContainerStyle={styles.dropdownItemsContainer}
            items={[
              {label: 'Нет', value: 'no'},
              {label: 'В момент события', value: 'atTheMoment'},
              {label: 'За 5 минут', value: '5m'},
              {label: 'За 10 минут', value: '10m'},
              {label: 'За 30 минут', value: '30m'},
              {label: 'За 1 час', value: '1h'},
              {label: 'За 2 часа', value: '2h'},
              {label: 'За 1 день', value: '1d'},
              {label: 'За 2 дня', value: '2d'},
              {label: 'За неделю', value: '1w'},
            ]}
          />
        </View>

        <View style={[styles.group, styles.putBelow]}>
          <Text style={styles.text} onPress={pickDocument}>Добавить вложение...</Text>
        </View>

        <View style={[styles.group, styles.putBelow, { height: 100 }]}>
          <TextInput
            style={styles.text}
            placeholder='Заметки'
            placeholderTextColor={colors.notesPlaceholder}
            onChangeText={setNotes}
            value={notes}
          />
        </View>

        <Pressable style={styles.addTask} onPress={addTask}>
          <Text style={styles.addTaskText}>Добавить задачу</Text>
          <Image
            source={require('@assets/icons/addTaskBottomSheet/tick.svg')}
            style={styles.addTaskIcon}
          />
        </Pressable>
      </View>
    </BottomSheet>
  );
})

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: colors.background,
  },

  wrapper: {
    paddingHorizontal: 25,
    flex: 1
  },

  group: {
    backgroundColor: colors.group,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 18,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  text: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter'
  },

  divider: {
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8
  },

  groupElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  datePicker: {
    backgroundColor: colors.datePickerContainer,
    borderRadius: 20,
    marginBottom: 16,
  },

  cancelButton: {
    backgroundColor: colors.datePickerContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 56
  },

  cancelText: {
    fontSize: 20
  },

  chooseDateAndTime: {
    flexDirection: 'row',
  },

  date: {
    marginRight: 12
  },

  dropdownGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdown: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 24
  },

  dropdownContainer: {
    maxWidth: '85%',
    position: 'absolute',
    right: 16,
    bottom: 26
  },

  dropdownItem: {
    backgroundColor: colors.datePickerContainer,
    borderBottomWidth: 1,
    borderBottomColor: '#717794',
  },

  dropdownItemsContainer: {
    alignSelf: 'flex-end',
    borderWidth: 0,
    width: 185,
    borderRadius: 20,
    backgroundColor: colors.datePickerContainer,
  },

  dropdownText: {
    textAlign: 'right',
  },

  putBelow: {
    zIndex: -2
  },

  addTask: {
    position: 'absolute',
    bottom: 26,
    backgroundColor: colors.addTaskButton,
    width: 300,
    height: 60,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 40,
  },

  addTaskText: {
    fontSize: 20,
    color: colors.addTaskText
  },

  addTaskIcon: {
    position: 'relative',
    top: 4,
    width: 33,
    height: 28,
    shadowColor: '#17114140',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  typeContainer: {
    width: 176,
    height: 112,
    justifyContent: 'space-evenly',
    borderRadius: 20,
    backgroundColor: colors.group, 
    marginBottom: 18,
    paddingLeft: 26,
  },

  typeIcon: {
    width: 20,
    height: 20,
    marginRight: 8
  },

  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default AddTaskBottomSheet;