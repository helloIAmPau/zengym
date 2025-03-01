import { useMemo, useCallback } from 'react';
import DiaryActivityEditorForm from './diary-activity-editor-form'
import Page from './page';
import { Form } from '../contexts/form';
import FormButton from './form-button';
import { UploadSimple } from 'phosphor-react-native';
import { useNavigation } from  '@react-navigation/native';
import useLog from '../hooks/use-log';

import { useDiary } from '../contexts/diary';
import useDay from '../hooks/use-day';

export default function DiaryActivityEditor() {
  const { day } = useDiary();
  const { format } = useDay(day);

  const { reset } = useNavigation();

  const [ log ] = useLog();

  const defaults = useMemo(function() {
    return {
      log_type: 'ACTIVITY',
      day: format(),
      completed: false
    };
  }, [ format ]);

  const onSubmit = useCallback(function(values) {
    return log(values).then(function() {
      reset({
        index: 0,
        routes: [{
          name: 'DiaryDayView'
        }]
      });
    }).catch(function(error) {
      console.log(error);
    });
  }, [ log, reset ]);

  const onValidate = useCallback(function({ values, onError }) {
    if(typeof(values.name) == null || values.name === '') {
      onError('name', 'Name field cannot be empty');
    }
  }, []);

  return (
    <Page>
      <Form onValidate={ onValidate } defaults={ defaults } onSubmit={ onSubmit }>
        <DiaryActivityEditorForm />
        <FormButton icon={ UploadSimple }>
          Save
        </FormButton>
      </Form>
    </Page>
  );
};
