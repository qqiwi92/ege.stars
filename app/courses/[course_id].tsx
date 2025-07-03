import NumberTab from "@/components/pages/courses/NumberTab";
import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/typography";
import useCourse from "@/lib/fetching/useCourse";
import { ArrowRight } from "@/lib/icons/arrow-right";
import { useTabBarStore } from "@/lib/stores/tabBarStore";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Course() {
  const { course_id } = useLocalSearchParams();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("numbers");
  const course = useCourse({
    course_id: typeof course_id === "string" ? course_id : "",
  });
  const { setIsVisible } = useTabBarStore();

  useFocusEffect(
    React.useCallback(() => {
      setIsVisible(false);
      return () => {
        setIsVisible(true);
      };
    }, []),
  );
  if (typeof course_id !== "string" || !course_id) return null;

  return (
    <View className="h-full w-full flex-1 px-3 pt-10">
      <Stack.Screen
        name="Course"
        options={{
          title: course.name,
          //   headerTitleAlign: "center",
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
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        className="mx-auto mb-10 flex-col gap-1.5  h-full"
      >
        <TabsList className="w-full flex-row mb-5">
          <TabsTrigger value="numbers" className="flex-1">
            <P>задания</P>
          </TabsTrigger>
          <TabsTrigger value="sets" className="flex-1">
            <P>варианты</P>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="numbers" className="h-[80%]">
          <NumberTab course={course} />
        </TabsContent>
        <TabsContent value="sets">
          <P>sets</P>
        </TabsContent>
      </Tabs>
    </View>
  );
}
