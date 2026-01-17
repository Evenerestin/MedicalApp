import React from "react";
import { Animated, ScrollView, TouchableOpacity, View } from "react-native";
import { DayCard } from "../../../atoms/data/date/card/DayCard";
import { Scrollbar } from "../../../atoms/data/Scrollbar";
import { miniCalendarStyles } from "./MiniCalendar.styles";

interface MiniCalendarProps {
  days: Array<{ date: Date; selected?: boolean; disabled?: boolean }>;
  onDayPress?: (date: Date) => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
  days,
  onDayPress,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
}) => {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, []);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = React.useState(1);
  const [containerWidth, setContainerWidth] = React.useState(1);

  return (
    <View>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={miniCalendarStyles.row}
        style={{ marginBottom: 8 }}
        scrollEventThrottle={16}
        onContentSizeChange={(w) => setContentWidth(w)}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {days.map((day, idx) => {
          const dayTime = new Date(day.date);
          dayTime.setHours(0, 0, 0, 0);
          const isToday = dayTime.getTime() === today;
          const isSelected = !!day.selected;
          return (
            <TouchableOpacity
              key={day.date.toISOString()}
              onPress={() => onDayPress?.(day.date)}
              disabled={day.disabled}
            >
              <DayCard
                date={day.date}
                isSelected={isSelected}
                isToday={isToday}
              />
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
      <Scrollbar
        scrollX={scrollX}
        contentWidth={contentWidth}
        containerWidth={containerWidth}
      />
    </View>
  );
};

export default MiniCalendar;
