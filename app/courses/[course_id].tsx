import { H1, P } from "@/components/ui/typography";
import { View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import useCourse from "@/lib/fetching/useCourse";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/lib/icons/arrow-right";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useState } from "react";

export default function Course() {
  const { course_id } = useLocalSearchParams();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('numbers')
    const course = useCourse({
    course_id: typeof course_id === "string" ? course_id : "",
  });
  if (typeof course_id !== "string" || !course_id) return null;
  return (
    <View className="h-full w-full flex-1 pt-10 px-3">
     
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
        className='mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full'>
          <TabsTrigger value='account' className='flex-1'>
            <P>номера</P>
          </TabsTrigger>
          <TabsTrigger value='password' className='flex-1'>
            <P>варианты</P>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
         
        </TabsContent>
        <TabsContent value='password'>WF
         <P>Two</P>
        </TabsContent>
      </Tabs>
    </View>
  );
}

