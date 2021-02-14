import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CakesSVG from "../components/svgs/Cakes";
import NotificationsSVG from "../components/svgs/Notifications";
import PizzaSVG from "../components/svgs/Pizza";
import SaladSVG from "../components/svgs/Salad";
import SearchSVG from "../components/svgs/Search";
import SushiSVG from "../components/svgs/Sushi";
import Carousel from "react-native-snap-carousel";
import { useRef } from "react";
import { useState } from "react";
import DrinkSVG from "../components/svgs/Drink";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import RightArrowSVG from "../components/svgs/RightArrow";
import { ImageSourcePropType } from "react-native";
import ClockSVG from "../components/svgs/Clock";
import StarSVG from "../components/svgs/Star";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface CategoryItem {
  category: string;
  icon: JSX.Element;
}

interface DishesItem {
  title: string;
  extendedTitle: string;
  backgroundImage: ImageSourcePropType;
  duration: number;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  calories: number;
  details: string;
  ingredients: number[];
}

let categories: CategoryItem[] = [
  {
    category: "Salads",
    icon: <SaladSVG size={22} fill={"#fff"} />,
  },
  {
    category: "Sushi",
    icon: <SushiSVG size={22} fill={"#fff"} />,
  },
  {
    category: "Pizza",
    icon: <PizzaSVG size={30} fill={"#fff"} />,
  },
  {
    category: "Cakes",
    icon: <CakesSVG size={22} fill={"#fff"} />,
  },
  {
    category: "Drinks",
    icon: <DrinkSVG size={22} fill={"#fff"} />,
  },
];

let dishes: DishesItem[] = [
  {
    title: "Pumpkin soup",
    extendedTitle: "Pumpkin soup",
    backgroundImage: require("../assets/photos/pumpkin-soup.jpg"),
    duration: 25,
    description: "Le Bernadin, Enzo, Simple",
    price: 7.2,
    rating: 4.8,
    ratingCount: 18,
    calories: 189,
    details: "Pumpkin soup is a usually 'bound' soup made from a purée of pumpkin. It is made by combining the meat of a blended pumpkin with broth or stock.",
    ingredients: [3, 4],
  },
  {
    title: "Roasted salmon",
    extendedTitle: "Roasted salmon with vegetables",
    backgroundImage: require("../assets/photos/roasted-salmon.jpg"),
    duration: 45,
    description: "O’Charley’s, Kinza",
    price: 23.2,
    rating: 5.0,
    ratingCount: 6,
    calories: 325,
    details:
      "The salmon looks great on the plate because it's a whole steak. And bright vegetables, which you can choose yourself, will delight in color and complement the picture.",
    ingredients: [0, 1, 2, 3, 4],
  },
  {
    title: "Special sushi",
    extendedTitle: "Chef's award-winning special sushi",
    backgroundImage: require("../assets/photos/sushi.jpg"),
    duration: 27,
    description: "Chef's Special",
    price: 50,
    rating: 5.0,
    ratingCount: 72,
    calories: 200,
    details:
      "Sushi is a traditional Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanying a variety of ingredients, such as seafood, often raw, and vegetables.",
    ingredients: [1, 2, 4],
  },
];

export type MainStackParamList = {
  Main: undefined;
  Card: { item: DishesItem };
};

const Main = () => {
  // Navigation Hooks
  const navigation = useNavigation<StackNavigationProp<MainStackParamList, "Main">>();

  // Category Hooks
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeCategoryCarouselIndex, setActiveCategoryCarouselIndex] = useState(0);
  const categoryCarouselRef = useRef(null);

  // Render Category Function
  const renderCategoryItem = ({ item, index }: { item: CategoryItem; index: number }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveCategoryIndex(index)}
        style={{ backgroundColor: index === activeCategoryIndex ? "#B1DB5A" : "#2C2C2C", ...renderCategoryItemStyles.touchableOpacity }}
      >
        <View style={{ borderColor: index === activeCategoryIndex ? "#2C2C2C" : "#fff", ...renderCategoryItemStyles.view }}>{item.icon}</View>
        <Text style={{ fontFamily: "DMSans_500Medium", color: index === activeCategoryIndex ? "#2C2C2C" : "#fff" }}>{item.category}</Text>
      </TouchableOpacity>
    );
  };

  // Popular Dishes Hooks
  const [activeDishesCarouselIndex, setActiveDishesCarouselIndex] = useState(0);
  const dishesCarouselRef = useRef(null);

  // Render Dish Item Function
  const renderDishItem = ({ item, index }: { item: DishesItem; index: number }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.push("Card", { item })} style={renderDishItemStyles.touchableOpacity}>
          <ImageBackground source={item.backgroundImage} style={renderDishItemStyles.imageBackground} />
          <View style={renderDishItemStyles.durationView}>
            <ClockSVG size={12} fill={"#fff"} />
            <Text style={{ fontFamily: "DMSans_500Medium", color: "#fff", marginLeft: 5 }}>{item.duration} min</Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 8 }}>
          <Text style={{ color: "#fff", fontSize: 18, fontFamily: "DMSans_700Bold" }}>{item.title}</Text>
          <Text style={{ color: "#BCBCBC", fontSize: 14, fontFamily: "DMSans_400Regular", marginTop: 5 }}>{item.description}</Text>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <View style={{ backgroundColor: "#B1DB5A", paddingHorizontal: 12, paddingVertical: 3, borderRadius: 15 }}>
              <Text style={{ fontFamily: "DMSans_700Bold", fontSize: 17, color: "#202020" }}>${item.price}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 15 }}>
              <StarSVG size={16} fill={"#F9CA24"} />
              <Text style={{ fontFamily: "DMSans_500Medium", fontSize: 14, color: "#fff", marginLeft: 4 }}>{item.rating}</Text>
              <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 13, color: "#D6D6D6", marginLeft: 4 }}>({item.ratingCount})</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#202020" }}>
      <ScrollView style={{ paddingVertical: 5 }}>
        {/* Header */}
        <View style={headerStyles.view}>
          <TouchableOpacity>
            <SearchSVG size={30} fill={"#fff"} />
          </TouchableOpacity>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity>
              <NotificationsSVG size={30} fill={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/photos/avatar.png")} style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header Text */}
        <View style={{ marginTop: 10, paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 28, color: "#fff", fontFamily: "DMSans_700Bold" }}>Let's Eat</Text>
          <Text style={{ fontSize: 28, color: "#fff", fontFamily: "DMSans_700Bold" }}>Healthy Food</Text>
        </View>

        {/* Category Carousel */}
        <View style={{ width: "100%", flexDirection: "row", marginTop: 15 }}>
          <Carousel
            layout={"default"}
            ref={categoryCarouselRef}
            data={categories}
            sliderWidth={150}
            itemWidth={95}
            renderItem={renderCategoryItem}
            inactiveSlideScale={1}
            onSnapToItem={(idx) => setActiveCategoryCarouselIndex(idx)}
          />
        </View>

        {/* Popular Dishes */}
        <View style={popularDishesStyles.view}>
          <Text style={{ fontSize: 22, fontFamily: "DMSans_700Bold", color: "#fff" }}>Popular Dishes</Text>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 15, color: "#FF8533", fontFamily: "DMSans_500Medium", marginRight: 2 }}>View all</Text>
            <RightArrowSVG size={15} fill={"#FF8533"} />
          </TouchableOpacity>
        </View>

        {/* Popular Dishesh Carousel */}
        <View style={{ width: "100%", flexDirection: "row", marginTop: 15 }}>
          <Carousel
            layout={"default"}
            ref={dishesCarouselRef}
            data={dishes}
            sliderWidth={245}
            itemWidth={186} // margin (16px each)
            renderItem={renderDishItem}
            inactiveSlideScale={1}
            onSnapToItem={(idx) => setActiveDishesCarouselIndex(idx)}
          />
        </View>

        {/* Discover New Places */}
        <Text style={{ fontFamily: "DMSans_700Bold", fontSize: 22, color: "#fff", marginLeft: 30, marginTop: 15 }}>Discover New Places</Text>

        {/* Places */}
        <View style={placesStyles.view}>
          <TouchableOpacity style={placesStyles.touchableOpacity}>
            <ImageBackground source={require("../assets/icons/place-1.png")} style={placesStyles.imageBackground} />
          </TouchableOpacity>
          <TouchableOpacity style={placesStyles.touchableOpacity}>
            <ImageBackground source={require("../assets/icons/place-2.png")} style={placesStyles.imageBackground} />
          </TouchableOpacity>
          <TouchableOpacity style={placesStyles.touchableOpacity}>
            <ImageBackground source={require("../assets/icons/place-3.png")} style={placesStyles.imageBackground} />
          </TouchableOpacity>
          <TouchableOpacity style={placesStyles.touchableOpacity}>
            <ImageBackground source={require("../assets/icons/place-4.png")} style={placesStyles.imageBackground} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderCategoryItemStyles = StyleSheet.create({
  touchableOpacity: {
    borderRadius: 999,
    height: 120,
    width: 75,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  view: {
    backgroundColor: "#2C2C2C",
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const renderDishItemStyles = StyleSheet.create({
  touchableOpacity: { height: 170, width: 170, borderRadius: 10, backgroundColor: "#fff", position: "relative", overflow: "hidden" },
  imageBackground: { position: "absolute", zIndex: -1, width: "100%", height: "100%" },
  durationView: {
    position: "absolute",
    top: 5,
    left: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 6,
    backgroundColor: "#FF8533",
    borderRadius: 15,
  },
});

const headerStyles = StyleSheet.create({
  view: { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 30 },
});

const popularDishesStyles = StyleSheet.create({
  view: { paddingHorizontal: 30, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 },
});

const placesStyles = StyleSheet.create({
  view: { display: "flex", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30, marginTop: 15 },
  touchableOpacity: { width: 70, height: 70, borderRadius: 999, backgroundColor: "#fff" },
  imageBackground: { position: "absolute", width: "100%", height: "100%", zIndex: -1 },
});

export default Main;
