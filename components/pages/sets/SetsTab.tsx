import { Button } from "@/components/ui/button";
import GradientScrollViewWrapper from "@/components/ui/GradientScrollViewWrapper";
import { Text } from "@/components/ui/text";
import { H2, P } from "@/components/ui/typography";
import useTeacherSets from "@/lib/fetching/useTeacherSets";
import { Archive } from "@/lib/icons/archive";
import { SquareArrowOutUpRight } from "@/lib/icons/link";
import { MotiView } from "moti";
import { FlatList, Linking, TouchableOpacity, View } from "react-native";

export default function SetsTab() {
  const { data: teacherSets, error, isLoading } = useTeacherSets();
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex  h-full flex-1"
    >
      <View className="">
        <P>
          Варианты от учителя — это тщательно подобранные задания, созданные
          экспертами специально для твоей подготовки.
        </P>
        <Button
          variant={"secondary"}
          className="mx-auto my-5 flex w-72 flex-row items-center justify-center gap-3"
        >
          <Archive className="size-5 stroke-secondary-foreground" />
          <Text>выполненные варианты</Text>
        </Button>
      </View>

      <View className="flex-1">
        <H2 className="mb-1">Варинты от учителя</H2>
        <View className="mb-10 flex-1">
          <GradientScrollViewWrapper>
            {(onScroll) => (
              <FlatList
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                data={teacherSets}
                keyExtractor={(item) => item.name}
                renderItem={({ item: teacherSet }) => (
                  <View className="pt-5">
                    <View className="relative mx-2 flex flex-row items-center justify-start gap-3 rounded-xl border border-border bg-card p-4">
                      {teacherSet.videoWalkthroughLink !== "" && (
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(teacherSet.videoWalkthroughLink)
                          }
                          className="absolute -right-2 -top-3 z-10 flex flex-row items-center justify-center gap-2 rounded-xl bg-accent px-3 py-1"
                        >
                          <P className="text-accent-foreground">разбор</P>
                          <SquareArrowOutUpRight className="size-5 stroke-accent-foreground" />
                        </TouchableOpacity>
                      )}
                      <View
                        className={`size-7 rounded-md border  border-foreground ${
                          teacherSet.complexity === "hard"
                            ? "bg-red-500"
                            : teacherSet.complexity === "medium"
                              ? "bg-yellow-300"
                              : "bg-green-500"
                        }`}
                      />
                      <P className="text-xl">{teacherSet.name}</P>
                    </View>
                  </View>
                )}
              />
            )}
          </GradientScrollViewWrapper>
        </View>
      </View>
    </MotiView>
  );
}
