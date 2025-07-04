import React, { useMemo, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useColorScheme } from "~/lib/useColorScheme";

const daysInWeek = 7;
const weeksInYear = 53;

type ContributionMatrixProps = {
  data?: number[];
};

const getColor = (value: number) => {
  if (value === 0) return "#ebedf0";
  if (value < 3) return "#c6e48b";
  if (value < 6) return "#7bc96f";
  if (value < 9) return "#239a3b";
  return "#196127";
};

const generateRandomData = (): number[] =>
  Array.from({ length: daysInWeek * weeksInYear }, () =>
    Math.floor(Math.random() * 10)
  );

const ContributionMatrix: React.FC<ContributionMatrixProps> = ({ data }) => {
  const { isDarkColorScheme } = useColorScheme();
  const memoizedData = useMemo(() => data || generateRandomData(), [data]);
  const scrollRef = useRef<FlatList>(null);
  const isAtStart = useSharedValue(true);
  const isAtEnd = useSharedValue(false);

  const leftGradientStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtStart.value ? 0 : 1, { duration: 300 }),
  }));

  const rightGradientStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtEnd.value ? 0 : 1, { duration: 300 }),
  }));

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    isAtStart.value = contentOffset.x <= 0;
    isAtEnd.value =
      layoutMeasurement.width + contentOffset.x >= contentSize.width - 1;
  };

  const renderWeek = useCallback(
    ({ index: weekIndex }: { index: number }) => (
      <View className="mr-1 flex-col">
        {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
          const dataIndex = weekIndex * daysInWeek + dayIndex;
          const value = memoizedData[dataIndex] ?? 0;
          return (
            <View
              key={dayIndex}
              style={[styles.cell, { backgroundColor: getColor(value) }]}
            />
          );
        })}
      </View>
    ),
    [memoizedData]
  );

  const gradientColor = isDarkColorScheme ? "#18181b" : "#FFFFFF";

  return (
    <View>
      <FlatList
        ref={scrollRef}
        horizontal
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={Array.from({ length: weeksInYear })}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderWeek}
        initialScrollIndex={weeksInYear - 1}
        getItemLayout={(_, index) => ({
          length: 14, // cell height + margin (12 + 2)
          offset: 14 * index,
          index,
        })}
        removeClippedSubviews
        windowSize={5}
        maxToRenderPerBatch={8}
        initialNumToRender={10}
      />
      <Animated.View
        style={[styles.gradient, styles.leftGradient, leftGradientStyle]}
      >
        <LinearGradient
          colors={[gradientColor, "transparent"]}
          style={styles.gradientInner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
      <Animated.View
        style={[styles.gradient, styles.rightGradient, rightGradientStyle]}
      >
        <LinearGradient
          colors={["transparent", gradientColor]}
          style={styles.gradientInner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 12,
    height: 12,
    marginBottom: 2,
    borderRadius: 2,
  },
  gradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 40,
    pointerEvents: "none",
  },
  leftGradient: {
    left: 0,
  },
  rightGradient: {
    right: 0,
  },
  gradientInner: {
    flex: 1,
  },
});

export default React.memo(ContributionMatrix);
