import Input from './input';
import { useForm } from '../contexts/form';
import { PersonSimpleTaiChi } from 'phosphor-react-native';

export default function() {
  const { register } = useForm();

  return (
    <Input placeholder='Name' icon={ PersonSimpleTaiChi } { ...register('name') } />
  );
};
