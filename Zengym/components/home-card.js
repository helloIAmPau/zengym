import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import Card from './card';
import CardHeading from './card-heading';
import HomeCardContent from './home-card-content';
import HomeCardCompleted from './home-card-completed';
import HomeCardNoPlans from './home-card-no-plans';

import theme from '../theme';

const styles = StyleSheet.create({
  homeCard: {
    width: theme.baseUnit * 11
  }
});

export default function HomeCard({ icon, title, completed, total, unit }) {
  const content = useMemo(function() {
    if(total === 0) {
      return (
        <HomeCardNoPlans />
      )
    }

    if(completed === total) {
      return (
        <HomeCardCompleted />
      )
    }

    return (
      <HomeCardContent completed={ completed } total={ total } unit={ unit } />
    );
  }, [ completed, total, unit ]);

  return (
    <Card style={ styles.homeCard }>
      <CardHeading icon={ icon }>{ title }</CardHeading>
      { content }
    </Card>
  );
};
