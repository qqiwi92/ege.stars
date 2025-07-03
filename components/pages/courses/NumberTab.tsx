import { Input } from "@/components/ui/input";
import { H2, P } from "@/components/ui/typography";
import { ChevronsUpDown } from "@/lib/icons/up-down";
import { Course } from "@/lib/types/Course";
import { Excercise } from "@/lib/types/Excercise";
import { NumberSet } from "@/lib/types/NumberSet";
import MasonryList from "@react-native-seoul/masonry-list";
import { useTheme } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { TextInput, View, Keyboard } from "react-native";
import { Dropdown, IDropdownRef } from "react-native-element-dropdown";
import MasonryItem from "./MansoryItem";
import { cn } from "@/lib/utils";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

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
    <View className="flex-1 flex bg-card/25 rounded-xl h-full">
      <View className="items-between flex  justify-start px-2">
        <H2 className="w-fit">Набор </H2>
        <View className="relative mb-5 min-h-10 w-full ">
          <Dropdown
            ref={dropdownRef}
            style={{
              backgroundColor: colors.card,
              borderColor: colors.text,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 16,
              paddingVertical: 6,
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
                  className="mb-3 border-2 border-primary rounded-xl px-3 py-1 h-12"
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
                      "p-2 rounded-md",
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
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={{ flex: 1 }}
          />
        </Animated.View>
        <MasonryList
          className="flex-1"
          data={filteredExcercises}
          keyExtractor={(item) => item.id + item.title}
          numColumns={3}
          onEndReached={() => {}}
          renderItem={({ item }) => <MasonryItem data={item as Excercise} />}
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
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>
    </View>
  );
}

