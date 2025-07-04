import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2, P } from "@/components/ui/typography";
import useTeacherSets from "@/lib/fetching/useTeacherSets";
import { SquareArrowOutUpRight } from "@/lib/icons/link";
import { FlatList, Linking, TouchableOpacity, View } from "react-native";

export default function SetsTab() {
  const { data: teacherSets, error, isLoading } = useTeacherSets();
  return (
    <View className="flex h-full flex-1 rounded-xl bg-card/25">
      <View className="flex gap-3 flex-1">
        <P>
          Варианты от учителя — это тщательно подобранные задания, созданные
          экспертами специально для твоей подготовки.
        </P>
        <Button variant={"secondary"} className="mx-auto mb-5 w-72">
          <Text>выполненные варианты</Text>
        </Button>
      </View>

      <H2>Варинты от учителя</H2>
      <FlatList
        data={teacherSets}
        keyExtractor={(item) => item.name}
        renderItem={({ item: teacherSet }) => (
          <View style={{ marginTop: 20, paddingHorizontal: 2 }}>
            <View className="relative flex flex-row items-center justify-start gap-3 rounded-xl border border-border bg-card p-4">
              {teacherSet.videoWalkthroughLink !== "" && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(teacherSet.videoWalkthroughLink)
                  }
                  className="absolute -right-1 -top-3 z-10 flex flex-row items-center justify-center gap-2 rounded-xl bg-accent px-3 py-1"
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
    </View>
  );
}
