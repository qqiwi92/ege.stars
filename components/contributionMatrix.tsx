import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const daysInWeek = 7;
const weeksInYear = 53;
const totalCells = daysInWeek * weeksInYear;

type ContributionMatrixProps = {
  data?: number[]; // optional, generates random if not passed
};

const getColor = (value: number) => {
  if (value === 0) return "#ebedf0";
  if (value < 3) return "#c6e48b";
  if (value < 6) return "#7bc96f";
  if (value < 9) return "#239a3b";
  return "#196127";
};

const generateRandomData = (): number[] => {
  //   return Array.from({ length: totalCells }, () =>
  //     Math.floor(Math.random() * 10),
  //   );
  return [
    2, 1, 5, 4, 5, 6, 0, 3, 9, 0, 9, 3, 7, 9, 0, 6, 2, 9, 3, 3, 5, 3, 5, 1, 8,
    0, 1, 0, 9, 9, 3, 8, 4, 1, 9, 3, 8, 6, 4, 3, 6, 1, 0, 9, 5, 1, 3, 2, 7, 8,
    0, 2, 6, 9, 7, 9, 7, 1, 4, 0, 4, 2, 9, 8, 6, 2, 3, 3, 4, 9, 5, 0, 7, 6, 0,
    3, 4, 8, 4, 1, 5, 7, 0, 4, 0, 4, 6, 2, 5, 7, 3, 7, 0, 6, 9, 5, 9, 9, 8, 5,
    7, 9, 6, 7, 7, 4, 2, 0, 9, 0, 6, 2, 1, 1, 1, 3, 8, 3, 3, 3, 9, 6, 2, 6, 0,
    0, 1, 5, 2, 7, 4, 4, 7, 1, 1, 7, 7, 1, 1, 9, 4, 8, 5, 3, 1, 2, 3, 4, 5, 1,
    4, 4, 5, 0, 9, 9, 4, 4, 7, 5, 2, 1, 9, 6, 3, 2, 4, 4, 9, 4, 5, 9, 0, 5, 2,
    7, 1, 2, 8, 7, 8, 9, 8, 4, 6, 4, 2, 8, 5, 0, 2, 5, 1, 9, 7, 6, 8, 4, 1, 2,
    8, 7, 5, 7, 8, 6, 1, 0, 3, 7, 2, 5, 6, 0, 4, 3, 5, 7, 7, 5, 7, 3, 8, 0, 7,
    6, 2, 4, 2, 1, 6, 7, 9, 2, 2, 5, 7, 6, 1, 9, 6, 3, 2, 8, 1, 7, 5, 6, 0, 1,
    5, 4, 4, 8, 5, 3, 7, 7, 6, 0, 3, 9, 6, 4, 5, 0, 6, 2, 5, 7, 2, 9, 8, 9, 9,
    9, 7, 3, 3, 3, 5, 2, 0, 6, 0, 2, 0, 7, 1, 2, 2, 1, 5, 5, 0, 8, 7, 1, 8, 1,
    7, 8, 1, 5, 3, 8, 3, 3, 6, 6, 9, 0, 3, 3, 3, 3, 2, 0, 0, 9, 8, 2, 2, 8, 0,
    3, 7, 8, 7, 0, 8, 5, 0, 1, 3, 8, 7, 2, 7, 7, 6, 4, 6, 6, 0, 1, 0, 7, 7, 5,
    0, 2, 8, 7, 8, 5, 8, 2, 4, 1, 3, 7, 2, 6, 0, 4, 6, 3, 9, 2, 6,
  ];
};

export const ContributionMatrix: React.FC<ContributionMatrixProps> = ({
  data = generateRandomData(),
}) => {
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, []);
  return (
    <ScrollView ref={scrollRef} horizontal contentContainerStyle="" >
      {Array.from({ length: weeksInYear }).map((_, weekIndex) => (
        <View key={weekIndex} className="mr-1 flex-col">
          {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
            const dataIndex = weekIndex * daysInWeek + dayIndex;
            const value = data[dataIndex] ?? 0;
            return (
              <View
                key={dayIndex}
                style={[styles.cell, { backgroundColor: getColor(value) }]}
              />
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 12,
    height: 12,
    marginBottom: 2,
    borderRadius: 2,
  },
});
