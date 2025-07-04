import { Button } from "@/components/ui/button";
import { Bold, H2, P } from "@/components/ui/typography";
import What from "@/components/What";
import toHsla from "@/lib/toHsla";
import { Course } from "@/lib/types/Course";
import { Excercise } from "@/lib/types/Excercise";
import { NumberSet } from "@/lib/types/NumberSet";
import { cn } from "@/lib/utils";
import MasonryList from "@react-native-seoul/masonry-list";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Dropdown, IDropdownRef } from "react-native-element-dropdown";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MasonryItem from "./MansoryItem";

export default function NumberTab({ course }: { course: Course }) {
  const [filteredExcercises, setFilteredExcercises] = useState(
    course.excercises,
  );
  const [selectedSet, setSelectedSet] = useState("Все");
  const dropdownRef = useRef<IDropdownRef>(null);
  const inputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();

  const isAtTop = useSharedValue(true);
  const isAtBottom = useSharedValue(false);

  const topGradientStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtTop.value ? 0 : 1, { duration: 300 }),
  }));

  const bottomGradientStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtBottom.value ? 0 : 1, { duration: 300 }),
  }));

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isFocused]);
  useEffect(() => {
    if (selectedSet === "Все") {
      setFilteredExcercises(course.excercises);
      return;
    }

    const selectedSetData = course.sets.find((set) => set.name === selectedSet);

    if (selectedSetData) {
      const filtered = course.excercises.filter((exercise) =>
        selectedSetData.numbers.includes(Number(exercise.id)),
      );
      setFilteredExcercises(filtered);
    } else {
      setFilteredExcercises([]);
    }
  }, [selectedSet, course.excercises, course.sets]);
  return (
    <View className="flex h-full flex-1">
      <View className="items-between flex  justify-start px-2">
        <View className="flex flex-row items-center justify-between pb-3">
          <H2 className="w-fit">Набор </H2>
          <What>
            <View className="flex flex-col gap-2">
              <P className="">
                На этой странице вы можете сами составить себе вариант из{" "}
                <Bold>открытого</Bold> банка заданий.{" "}
                <P className="text-foreground/80">
                  {" "}
                  Данный вариант не будет проверяться учителем
                </P>
              </P>
              <P className="">
                Вы также можете нажать на нужный номер и получить шпаргалку по
                нему
              </P>
            </View>
          </What>
        </View>
        <View className="relative mb-5 min-h-10 w-full ">
          <Dropdown
            ref={dropdownRef}
            style={{
              backgroundColor: colors.card,
              borderColor: toHsla(colors.text, 0.5),
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
            selectedTextStyle={{
              fontWeight: "500",
              textAlign: "center",
              color: colors.text,
            }}
            containerStyle={{
              backgroundColor: colors.card,
              maxHeight: 300,
              padding: 10,
              borderRadius: 10,
              borderColor: colors.border,
            }}
            activeColor={colors.primary}
            backgroundColor={"hsla(320 20% 0% / 0.8)"}
            data={course.sets}
            labelField="name"
            valueField="name"
            searchField="name"
            placeholder="Выберите набор"
            value={selectedSet}
            search
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            renderInputSearch={(onSearch) => {
              return (
                <TextInput
                  ref={inputRef as any}
                  onChangeText={onSearch}
                  className="mb-3 h-12 rounded-xl border-2 border-primary px-3 py-1"
                  placeholder="Поиск..."
                />
              );
            }}
            renderItem={(item: NumberSet, selected) => {
              return (
                <Animated.View
                  entering={FadeIn.delay(100).duration(200)}
                  exiting={FadeOut.duration(100)}
                  layout={LinearTransition.duration(200)}
                >
                  <P
                    key={item.name}
                    onPress={() => {
                      setSelectedSet(item.name);
                      dropdownRef.current?.close();
                    }}
                    className={cn(
                      "rounded-md p-2",
                      selected && "text-primary-foreground",
                    )}
                  >
                    {item.name}
                  </P>
                </Animated.View>
              );
            }}
            onChange={(item) => {
              setSelectedSet(item.name);
            }}
          />
        </View>
      </View>
      <View className="flex-1">
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 40,
              zIndex: 10,
              pointerEvents: "none",
            },
            topGradientStyle,
          ]}
        >
          <LinearGradient
            colors={[colors.background, "transparent"]}
            style={{ flex: 1, height: 30 }}
          />
        </Animated.View>
        <MasonryList
          refreshing={false}
          refreshControl={false}
          className="flex-1"
          data={filteredExcercises}
          keyExtractor={(item) => item.id + item.title}
          numColumns={3}
          renderItem={({ item }) => (
            <MasonryItem course={course} excercise={item as Excercise} />
          )}
          onScroll={(e) => {
            const { layoutMeasurement, contentOffset, contentSize } =
              e.nativeEvent;
            isAtTop.value = contentOffset.y <= 0;
            isAtBottom.value =
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - 1;
          }}
        />
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 40,
              zIndex: 10,
              pointerEvents: "none",
            },
            bottomGradientStyle,
          ]}
        >
          <LinearGradient
            colors={["transparent", colors.background]}
            style={{ flex: 1, height: 30 }}
          />
        </Animated.View>
      </View>
      <View className="mt-3 flex border-collapse  gap-3 rounded-xl border-foreground/50 bg-card p-3 pt-5">
        <Button variant={"secondary"} className="max-w-fit">
          <P className="font-semibold text-secondary-foreground">
            составить вариант
          </P>
        </Button>
        <P className="text-foreground/80">
          Этот вариант будет состоять из заданий нашего открытого банка OpenStar
          и не будет проверен вашим ментором
        </P>
      </View>
    </View>
  );
}
