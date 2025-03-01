import Button from './button';
import { useForm } from '../contexts/form';

export default function FormButton({ children, icon, type }) {
  const { disabled, submit } = useForm();

  return (
    <Button onClick={ submit } icon={ icon } type={ type } disabled={ disabled }>
      { children }
    </Button>
  );
};
