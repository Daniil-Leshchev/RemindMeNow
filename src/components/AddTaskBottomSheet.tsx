import { View, StyleSheet } from 'react-native';
import Text from "@/components/StyledText";
import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// interface Props {
//   title: string;
// }

const colors = {
  background: '#C0CEFF',
}

type Ref = BottomSheet;

const AddTaskBottomSheet = forwardRef<Ref>((_props, ref) => {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={2} disappearsOnIndex={-1} {...props}/>, []
  )

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      // handleIndicatorStyle={{ backgroundColor: 'transparent' }}
      backgroundStyle={styles.container}>
        <View>
          <Text></Text>
        </View>
    </BottomSheet>
  );
})

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: colors.background,
    paddingHorizontal: 25
  }
})

export default AddTaskBottomSheet;