import Heading from './heading';
import DiarySectionItem from './diary-section-item';
import { Plus } from 'phosphor-react-native';

import { theme } from '../theme';

export default function({ label, editorName }) {
  return (
    <DiarySectionItem editorName={ editorName }>
      <Heading color={ theme.color2 } icon={ Plus }>Add { label }</Heading>
    </DiarySectionItem>
  );
};
