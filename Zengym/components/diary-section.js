import { useMemo } from 'react';
import { useDiary } from '../contexts/diary';
import DiarySectionItem from './diary-section-item';
import Accordion from './accordion';
import { Plus } from 'phosphor-react-native';

import { theme } from '../theme';

export default function DiarySection({ type, label, editorName, icon, title, onTotal }) {
  const { entries } = useDiary();

  const filteredEntries = useMemo(function() {
    return entries.filter(function({ log_type }) {
      return log_type === type;
    });
  }, [ entries, type ]);

  const items = useMemo(function() {
    return filteredEntries.map(function(entry) {
      return (
        <DiarySectionItem
          title={ entry.name }
          completed={ entry.completed }
          editorName={ editorName }
          key={ entry.uid }
          uid={ entry.uid }
          />
      );
    }).concat(
      <DiarySectionItem
        color={ theme.color2 }
        icon={ Plus }
        title={ `Add ${ label }` }
        key='add-item'
        editorName={ editorName }
        />
    );
  }, [ filteredEntries, label, editorName ]);

  console.log(items);

  const total = useMemo(function() {
    return onTotal({ filteredEntries });
  }, [ filteredEntries, onTotal ])

  return (
    <Accordion items={ items } icon={ icon } title={ title } total={ total } />
  );
};
