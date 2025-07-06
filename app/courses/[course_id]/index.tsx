import NumberTab from "@/components/pages/courses/NumberTab";
import SetsTab from "@/components/pages/sets/SetsTab";
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
import useCourse from "@/lib/fetching/useCourse";
import { ArrowRight } from "@/lib/icons/arrow-right";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Course() {
  const { course_id } = useLocalSearchParams();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("numbers"); // numbers/sets
  const { data: course } = useCourse({
    course_id: typeof course_id === "string" ? course_id : "",
  });

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useFocusEffect(
    React.useCallback(() => {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });

      return () => {
        opacity.value = 0;
        translateY.value = -20;
      };
    }, []),
  );

  if (typeof course_id !== "string" || !course_id) return null;
  if (course === undefined) return null;
  return (
    <MotiView
      className="h-full w-full flex-1 px-3"
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Stack.Screen
        options={{
          title: course?.name,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Button
              variant="ghost"
              onPress={() => router.back()}
              className="ml-2"
            >
              <ArrowRight className="size-6  rotate-180 stroke-foreground text-foreground opacity-100 " />
            </Button>
          ),
        }}
      />
      <Animated.View style={animatedStyle} className="flex-1 pt-6">
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="mx-auto mb-10 h-full flex-col  gap-1.5 "
        >
          <TabsList className="mb-5 min-h-10 w-full flex-row bg-primary">
            <TabsTrigger value="numbers" className="flex-1">
              <P
                className={`${currentTab === "numbers" ? "text-foreground" : "text-primary-foreground"}`}
              >
                задания
              </P>
            </TabsTrigger>
            <TabsTrigger value="sets" className="flex-1">
              <P
                className={`${currentTab === "sets" ? "text-foreground" : "text-primary-foreground"}`}
              >
                варианты
              </P>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="numbers" className="min-h-[80%] flex-1 pb-5">
            <NumberTab course={course} />
          </TabsContent>
          <TabsContent value="sets" className="min-h-[80%] flex-1 pb-5">
            <SetsTab />
          </TabsContent>
        </Tabs>
      </Animated.View>
    </MotiView>
  );
}
