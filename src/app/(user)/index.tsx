import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import Text from "@/components/StyledText";
import { LinearGradient } from 'expo-linear-gradient';
import todayTasks from '@assets/data/todayTasks';
import TaskItem from '@/components/TaskItem';
import { Image } from 'expo-image';
import moment from 'moment';
import Swiper from 'react-native-swiper';
const gradientColors = ['#9FA1E3', '#19287A'];
const colors = {
  background: '#C0CEFF',
  shadow: '#2F366C4D',
  dayPressed: '#7380AD'
}
export default function MainScreen() {
  const swiper = useRef<Swiper>(null);
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const weeks = useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('day');
    return [-1, 0, 1].map(adj => {
      return Array.from({length: 4}).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week])

  return (
      <LinearGradient
        style={styles.gradient}
        colors={gradientColors}>
          <View style={styles.wrapper}>
            <View style={styles.todayTasksContainer}>
              {/* TODO: сделать его pressable со ссылкой на экран задач текущего дня */}
              <FlatList
                ListHeaderComponent={
                  <Text style={styles.todayTasksHeader}>Задачи на сегодня:</Text>
                }
                data={todayTasks}
                renderItem={({item}) => <TaskItem task={item}/>}
                contentContainerStyle={{
                  gap: 22,
                  paddingVertical: 16,
                  paddingHorizontal: 14
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View>
              <View style={styles.calendarBlock}>
                <Text style={styles.calendarHeader}>Календарь</Text>
                <Pressable style={styles.calendarButton}>
                  <View style={styles.monthContainer}>
                    <Text style={styles.month}>{value.toDateString()}</Text>
                  </View>
                  <Image 
                    source={require('@assets/icons/mainScreen/calendar.svg')}
                    style={styles.calendarIcon}
                  />
                </Pressable>
              </View>

              <Swiper
                index={1}
                ref={swiper}
                showsPagination={false}
                loop={false}
                onIndexChanged={ind => {
                  if (ind === 1) {
                    return;
                  }

                  setTimeout(() => {
                    const newIndex = ind - 1;
                    const newWeek = week + newIndex;
                    setWeek(newWeek);
                    setValue(moment(value).add(newIndex, 'week').toDate());
                    //TODO: убрать странную перемотку при клике на дату
                    //TODO: по какой логике проматываются даты дальше?
                    //TODO: какой элемент должен быть выделенным?
                    swiper.current?.scrollTo(1, false);
                  }, 100);
                }}
              >
                {weeks.map((dates, index) => (
                  <View key={index} style={styles.scrollableCalendar}>
                    {dates.map((item, dateIndex) => {
                      const isActive = value.toDateString() === item.date.toDateString();

                      return (
                        //TODO: обернуть тут в Link и поставить aschild
                        <Pressable
                          key={dateIndex}
                          onPress={() => setValue(item.date)}>
                            <View
                              style={[
                                styles.dayItem,
                                isActive && {
                                  backgroundColor: colors.dayPressed
                                }
                              ]}>
                                <Text
                                  style={styles.weekDayLabel}>
                                    {item.weekday}
                                </Text>
                                <Text style={styles.dayItemDate}>
                                  {item.date.getDate()}
                                </Text>
                            </View>
                        </Pressable>
                      )
                    })}
                  </View>
                ))}
              </Swiper>
            </View>
          </View>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  wrapper: {
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 16,
  },

  todayTasksContainer: {
    marginBottom: 20,
    height: 440,
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },

  todayTasksHeader: {
    fontSize: 20,
    alignSelf: 'center',
  },

  calendarBlock: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  calendarHeader: {
    fontSize: 25,
  },

  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 172,
    height: 40,
    paddingLeft: 16,
    paddingRight: 20,
    backgroundColor: colors.background,
    borderRadius: 40,
  },

  monthContainer: {
    flex: 1,
    alignItems: 'center',
  },

  month: {
    // fontSize: 18,
    textTransform: 'uppercase',
  },

  calendarIcon: {
    width: 36,
    height: 36,
  },

  scrollableCalendar: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  dayItem: {
    width: 72,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },

  weekDayLabel: {
    fontSize: 13
  },

  dayItemDate: {
    fontSize: 49,
  }
})