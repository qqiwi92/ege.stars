import { useTabBarStore } from "./stores/tabBarStore";

const useDeclareTabBarPage = ({
  tabBarPage = false,
}: {
  tabBarPage: boolean;
}) => {
  const { isVisible, setIsVisible } = useTabBarStore();
  setIsVisible(tabBarPage);
};
export default useDeclareTabBarPage;
